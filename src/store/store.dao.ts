import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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

  async update(id: number, data: any) {
    try {
      return await this.prismaService.store.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: [`Store with id ${id} does not exist`],
            error: error.meta.cause,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
