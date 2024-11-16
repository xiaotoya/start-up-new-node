import { Module } from '@nestjs/common';
import { FilesService } from './service/file.service';

@Module({
    providers: [FilesService],
    exports: [FilesService]
})
export class CommonModule {}
