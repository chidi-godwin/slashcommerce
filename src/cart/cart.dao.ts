import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CartRepository {
  private readonly _include: any;
  constructor(private readonly prismaService: PrismaService) {
    this._include = {
      product: {
        select: {
          id: true,
        },
      },
    };
  }
  create(data: any, productId: number, cartId: number) {
    return this.prismaService.cartItem.create({
      data: {
        ...data,
        cart: { connect: { id: cartId } },
        product: { connect: { id: productId } },
      },
      include: this._include,
    });
  }

  findAll() {
    return `This action returns all cart`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: any) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
