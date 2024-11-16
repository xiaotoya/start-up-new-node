import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { CommonModule } from '@/common/common.module';
import { CustomerModule } from '@/customer/customer.module';
import { CustomerService } from '@/customer/customer.service';

@Module({
  imports: [
    CommonModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../static/images'),
        filename:(_, file ,callback) => {
          const fileName = `${new Date().getTime() + extname(file.originalname)}`;
          return callback(null, fileName)
        }
      })
    }),
    CustomerModule,
  ],
  controllers: [UploadController],
  providers: [
    UploadService,
  ],
})
export class UploadModule {}
