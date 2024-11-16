import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
 
@Injectable()
export class FilesService {
  private readonly unlink = util.promisify(fs.unlink);
 
  async deleteFile(filePath: string): Promise<void> {
    try {
      const stats = await util.promisify(fs.stat)(filePath);
      if (stats.isFile) {
        await this.unlink(filePath);
        console.log(`File deleted successfully: ${filePath}`);
      } else {
        console.log(`There is no file: ${filePath}`);
      }
    } catch (error) {
      console.error(`Error deleting file: ${filePath}`, error);
      throw new NotFoundException(error);
    }
  }
}