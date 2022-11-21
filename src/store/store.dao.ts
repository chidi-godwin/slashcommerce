import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: any) {
    return await this.prismaService.store.create({
      data,
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
  }

  async findOneByName(name: string) {
    return await this.prismaService.store.findUnique({
      where: {
        name,
      },
    });
  }
}
