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
  @ApiProperty({
    example: 'Bentoo Blender',
  })
  title: string;

  @IsUrl()
  @ApiProperty({
    example:
      'https://res.cloudinary.com/chidi-godwin/image/upload/v1669812637/slashcommerce/ckcdhyj6ytdbbygds01h.png',
  })
  image: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'A blender for your kitchen',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    example: 30.0,
  })
  price: number;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    example: 1,
  })
  storeId: number;
}
