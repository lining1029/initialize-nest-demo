import { IsString, IsInt } from 'class-validator';

export class CatDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
