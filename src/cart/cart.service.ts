import { Injectable } from '@nestjs/common';
import { CartRepository } from './cart.dao';
import { CreateCartItemDto } from './dto/create-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async addItemToCart(createCartItemDto: CreateCartItemDto, cartId: number) {
    const { productId, ...data } = createCartItemDto;
    const cartItem = await this.cartRepository.findCartItem(cartId, productId);
    if (cartItem) {
      const quantity = cartItem.quantity + data.quantity;
      return this.cartRepository.updateCartItem(cartItem.id, { quantity });
    }
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

  async calculateCartTotal(id: number) {
    const cart: any = await this.getCart(id);
    const cartItems = cart.cartItems;

    const total = cartItems.reduce((acc, item) => {
      const price =
        item.product.discount && item.quantity >= 3
          ? item.product.price -
            (item.product.price * item.product.discount) / 100
          : item.product.price;

      return acc + price * item.quantity;
    }, 0);

    return { cartId: id, total, count: cart._count.cartItems };
  }
}
