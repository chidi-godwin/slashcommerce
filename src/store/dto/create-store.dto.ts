import { IsString, MaxLength, MinLength } from 'class-validator';
import { IsStoreAlreadyExist } from '../validators/isStoreAlreadyExists.validator';

export class CreateStoreDto {
  @IsString()
  @MinLength(1)
  @IsStoreAlreadyExist({
    message: 'Store already exists. Choose another name.',
  })
  name: string;

  @IsString()
  @MaxLength(250)
  description: string;

  @IsString()
  @MaxLength(250)
  address: string;
}
