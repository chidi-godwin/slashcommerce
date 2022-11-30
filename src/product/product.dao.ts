import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductRespository {
  private readonly _include: any;
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: any, storeId: number) {
    const product = {
      ...data,
      store: {
        connect: {
          id: storeId,
        },
      },
    };

    console.log(product);
    return await this.prismaService.product.create({
      data: product,
    });
  }

  async findAll() {
    return this.prismaService.product.findMany();
  }

  async findOneById(id: number) {
    return this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: any) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}
