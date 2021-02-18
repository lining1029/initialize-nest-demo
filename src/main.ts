import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
// import { RolesGuard } from "./common/guard/roles.guard";
// import { ValidatePipe } from './common/pipe/validate.pipe';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { ExcludeNullInterceptor } from './common/interceptor/exclude.null.interceptor';
// import { logger } from './common/middleware/logger.middleware';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(logger); // 全局中间件
  // app.useGlobalFilters(new HttpExceptionFilter()); // 全局过滤器
  // app.useGlobalPipes(new ValidatePipe()); // 全局管道
  // app.useGlobalGuards(new RolesGuard()); // 全局守卫
  // app.useGlobalInterceptors(new LoggingInterceptor()); // 全局拦截器
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalInterceptors(new ExcludeNullInterceptor());
  app.setGlobalPrefix('v1'); //全局路由前缀
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
