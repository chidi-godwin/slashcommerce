import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartRepository {
  private readonly _cartItemIncludes: any;
  private readonly _cartIncludes: any;
  constructor(private readonly prismaService: PrismaService) {
    this._cartItemIncludes = {
      product: {
        select: {
          id: true,
        },
      },
    };

    this._cartIncludes = {
      cartItems: true,
    };
  }
  create(data: any, productId: number, cartId: number) {
    return this.prismaService.cartItem.create({
      data: {
        ...data,
        cart: { connect: { id: cartId } },
        product: { connect: { id: productId } },
      },
      include: this._cartItemIncludes,
    });
  }

  findAll() {
    return this.prismaService.cart.findMany();
  }

  findOne(id: number) {
    return this.prismaService.cart.findUnique({
      where: {
        id,
      },
      include: this._cartIncludes,
    });
  }

  async updateCartItem(id: number, updateCartItemDto: any) {
    return this.prismaService.cartItem.update({
      where: {
        id,
      },
      data: updateCartItemDto,
      include: this._cartItemIncludes,
    });
  }

  async removeCartItem(id: number) {
    return this.prismaService.cartItem.delete({
      where: {
        id,
      },
      include: this._cartItemIncludes,
    });
  }

  update(id: number, updateCartDto: any) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
