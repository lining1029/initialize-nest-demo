import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './schemas/cats.schema';
import { CreateCatDto } from './dto/create-cat.dto';
import { Model } from 'mongoose';
import { CatDto } from './dto/cat.dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private catModel: Model<CatDocument>) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const createdCat = new this.catModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Cat[] | null> {
    return this.catModel.find().exec();
  }

  findOne(id: string): Promise<Cat> {
    return this.catModel.findById(id);
  }

  async update(obj: CatDto): Promise<Cat> {
    return this.catModel.updateOne(
      { _id: obj.id },
      { $set: { name: obj.name } },
    );
  }

  async remove(id: string): Promise<string> {
    return this.catModel.remove({ _id: id });
  }
}
