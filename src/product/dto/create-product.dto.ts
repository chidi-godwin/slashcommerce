import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
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

  @IsOptional()
  @IsNumber()
  @IsPositive()
  @ApiProperty({
    description: 'Enter discount value in percentage (e.g 10)',
    example: 10,
  })
  discount?: number;
}
