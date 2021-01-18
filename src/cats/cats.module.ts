import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatsSchema } from './schemas/cats.schema';

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
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {
  constructor(private readonly catsService: CatsService) {}
}
