import { Injectable } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  Validate,
  ValidateNested,
} from 'class-validator';
import { ValueRequiresOtherFieldValidation } from 'src/common/validators/valueRequiresOtherField.validator';

import { CreateStoreDto } from 'src/store/dto/create-store.dto';
import { IsUserAlreadyExist } from '../validations/IsUserAlreadyExist.validator';

@Injectable()
export class CreateUserDto {
  @IsEmail()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another email.',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsOptional()
  middlename?: string;

  @IsString()
  @MinLength(8)
  password: string;

  // check to create a shop owner, default is false
  @IsBoolean()
  @IsOptional()
  @Validate(ValueRequiresOtherFieldValidation, [true, 'store'])
  isStoreOwner? = false;

  @IsOptional()
  @ValidateNested()
  @Type(() => CreateStoreDto)
  store?: CreateStoreDto;
}
