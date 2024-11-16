import { Controller, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CustomerService } from '@/customer/customer.service';
import { FilesService } from '@/common/service/file.service';


@Controller('upload')
export class UploadController {
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
}
