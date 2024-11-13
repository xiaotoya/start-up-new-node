import { ResponseDTO } from '@/response.dto';
import { HTTP_MSG } from '@/respponse.enum';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseHandelerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const code = context.switchToHttp().getResponse().statusCode;
    return next
      .handle()
      .pipe(
        map((data) => {
            return new ResponseDTO(code, HTTP_MSG.SUCCESS, data)
        })
      );
  }
}