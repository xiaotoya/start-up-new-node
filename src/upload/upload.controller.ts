import { Controller, Get, Logger, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomerService } from '@/customer/customer.service';
import { FilesService } from '@/common/service/file.service';
import { Response } from 'express';
import { Log } from '@/common/decorators/logger.decorator';
import * as fs from 'fs';


@Controller('upload')
export class UploadController {
  @Log()
  private logger: Logger;
  constructor(
    private readonly uploadService: UploadService,
    private readonly customerSvc: CustomerService,
    private readonly filesService: FilesService,
  ) {}

  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(@UploadedFile() file, @Param('id') userId: number) {
    // 查询用户信息
    const customerInfo = await this.customerSvc.findOne(userId);
    // 保存原来file地址
    const originFilepath = customerInfo.file || '';
    customerInfo.file = file.path;
    // update new filepath
    await this.customerSvc.update(userId, customerInfo);
    // delte origin file
    await this.filesService.deleteFile(originFilepath);
    return `${file.filename } has been archieved!` 
  }
  @Get('photo/:id')
  async download(@Param('id') userId: number, @Res({ passthrough: true }) res: Response) {
    // 查询用户信息
    try {
      const customerInfo = await this.customerSvc.findOne(userId);
      if (customerInfo.file && fs.existsSync(customerInfo.file)) {
        res.download(customerInfo.file);
      } else {
        this.logger.warn('There is no file: ', customerInfo.file);
        return 'There is no photo in your account!';
      }
    } catch(error) {
      this.logger.error('There is no file: ', error);
    }
    
  }
}
