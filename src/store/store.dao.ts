import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '../prisma/prisma.service';

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

  async create(data: any, userId: number) {
    const [user, store] = await this.prismaService.$transaction([
      this.prismaService.user.update({
        where: {
          id: userId,
        },
        data: {
          role: 'OWNER',
        },
      }),
      this.prismaService.store.create({
        data,
        include: this._include,
      }),
    ]);

    return { role: user.role, store };
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

  async delete(id: number) {
    try {
      return await this.prismaService.store.delete({
        where: {
          id,
        },
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
