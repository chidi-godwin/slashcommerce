import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StoreRepository {
  private readonly _include: any;
  constructor(private readonly prismaService: PrismaService) {
    this._include = {
      user: {
        select: {
          id: true,
          email: true,
        },
      },
    };
  }

  async create(data: any) {
    return await this.prismaService.store.create({
      data,
      include: this._include,
    });
  }

  async findAll() {
    return await this.prismaService.store.findMany({
      include: this._include,
    });
  }

  async findOneById(id: number) {
    return await this.prismaService.store.findUnique({
      where: { id },
      include: this._include,
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
