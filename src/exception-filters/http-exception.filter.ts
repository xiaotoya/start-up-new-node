import { ResponseDTO } from '@/response.dto';
import { HTTP_MSG } from '@/respponse.enum';
import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    response
      .status(status)
      .json(new ResponseDTO(status, HTTP_MSG.FAILURE, exception.message));
  }
}
