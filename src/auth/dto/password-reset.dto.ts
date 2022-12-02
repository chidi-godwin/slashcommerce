import { IsJWT, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IsEqualTo } from '../validators/isEqualTo.validator';

export class PasswordResetDto {
  @IsNotEmpty()
  @IsJWT()
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsEqualTo('password')
  confirmPassword: string;
}
