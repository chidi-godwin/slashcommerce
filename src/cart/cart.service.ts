import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.dao';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  create(createCartItemDto: CreateCartItemDto, cartId: number) {
    const { productId, ...data } = createCartItemDto;
    return this.cartRepository.create(data, productId, cartId);
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartItemDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
