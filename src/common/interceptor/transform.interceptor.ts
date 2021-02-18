import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import systemConfig from '../config/system';
import { classToPlain } from 'class-transformer';

const transformValue = (data: any, code = 0, message = '请求成功') => {
  const { returnFormat } = systemConfig;
  return {
    [returnFormat.result]: classToPlain(data),
    [returnFormat.code]: code,
    [returnFormat.message]: message,
  };
};

// 处理统一返回请求
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const host = context.switchToHttp();
    const request = host.getRequest();

    // 不需要格式化的接口
    if (['api/status'].includes(request?.url)) {
      return next.handle();
    }
    return next.handle().pipe(map(transformValue));
  }
}
