import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
import { ResponseDTO } from '@/response.dto';
import { HTTP_MSG } from '@/respponse.enum';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
      response.status(status).json(new ResponseDTO(status, HTTP_MSG.FAILURE, 'INTERNAL ERROR'));
    }
  }
  