import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cats.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat> {
    return this.catModel.find().exec();
  }
}
