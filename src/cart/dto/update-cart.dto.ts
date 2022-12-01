import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateCartItemDto } from './create-cart.dto';

export class UpdateCartItemDto extends PartialType(
  OmitType(CreateCartItemDto, ['productId']),
) {}
