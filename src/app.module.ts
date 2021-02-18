import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { logger } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { ValidatePipe } from './common/pipe/validate.pipe';
import { RolesGuard } from './common/guard/roles.guard';
import { LoggingInterceptor } from './common/interceptor/logging.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { ExcludeNullInterceptor } from './common/interceptor/exclude.null.interceptor';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
@Module({
  imports: [
    CatsModule,
    // mongodb://175.24.127.224:27017/test
    MongooseModule.forRoot('mongodb://localhost:27017/test', {
      useNewUrlParser: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_FILTER,
    //   useClass: ValidatePipe,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: RolesGuard,
    // },
    // {
    //   provide: APP_FILTER,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): any {
//     consumer
//       // .apply(cors(), helmet(), logger)
//       .apply(logger)
//       // .exclude(
//       //   { path: 'cats', method: RequestMethod.GET },
//       //   { path: 'cats', method: RequestMethod.POST },
//       //   'cats/(.*)',
//       // )
//       .forRoutes(CatsController);
//     // .forRoutes({ path: 'cats', method: RequestMethod.GET });
//   }
// }
export class AppModule {}
