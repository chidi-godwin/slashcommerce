import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.dao';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addItemToCart(createCartItemDto: CreateCartItemDto, cartId: number) {
    const { productId, ...data } = createCartItemDto;
    return this.cartRepository.create(data, productId, cartId);
  }

  async findAll() {
    return this.cartRepository.findAll();
  }

  async getCart(id: number) {
    return this.cartRepository.findOne(id);
  }

  async updateCartItem(id: number, updateCartDto: UpdateCartItemDto) {
    return this.cartRepository.updateCartItem(id, updateCartDto);
  }

  async removeCartItem(id: number) {
    return this.cartRepository.removeCartItem(id);
  }

  async clearCart(id: number) {
    return this.cartRepository.removeManyCartItems(id);
  }
}
