import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsUrl()
  @ApiProperty({
    example:
      'https://res.cloudinary.com/chidi-godwin/image/upload/v1669812637/slashcommerce/ckcdhyj6ytdbbygds01h.png',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsInt()
  @IsPositive()
  storeId: number;
}
