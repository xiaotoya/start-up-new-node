import { ResponseDTO } from '@/response.dto';
import { HTTP_MSG } from '@/respponse.enum';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseHandelerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        map((data) => {
          const req = context.switchToHttp().getRequest();
            return new ResponseDTO(context.switchToHttp().getResponse().statusCode, HTTP_MSG.SUCCESS, data, req.url)
        })
      );
  }
}