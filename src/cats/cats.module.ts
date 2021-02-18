import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatsSchema } from './schemas/cats.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from '../common/filter/http-exception.filter';
import { ExcludeNullInterceptor } from '../common/interceptor/exclude.null.interceptor';
import { TransformInterceptor } from '../common/interceptor/transform.interceptor';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Cat.name,
        useFactory: () => {
          const schema = CatsSchema;
          schema.pre('save', () => console.log('Hello from pre save'));
          return schema;
        },
        collection: 'myclo', // 数据库名称
      },
    ]),
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludeNullInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
