import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {
  private readonly _include: any;
  constructor(private readonly prismaService: PrismaService) {
    this._include = {
      id: true,
      email: true,
      firstname: true,
      lastname: true,
      role: true,
      createdAt: true,
      updatedAt: true,
      Cart: {
        select: {
          id: true,
        },
      },
      stores: {
        select: {
          id: true,
          name: true,
        },
      },
    };
  }

  async createStoreOwner(user: any, store: any) {
    return await this.prismaService.user.create({
      data: {
        ...user,
        role: 'OWNER',
        Cart: {
          create: {},
        },
        stores: {
          create: [store],
        },
      },
      select: {
        ...this._include,
        stores: true,
      },
    });
  }

  async createCustomer(user: any) {
    // users should be created with an empty cart by default
    // store owners can create their store on signup by setting the isStoreOwner flag to true

    return await this.prismaService.user.create({
      data: {
        ...user,
        Cart: {
          create: {},
        },
      },
      select: {
        ...this._include,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
      // uses a diffrent select cause password needs to be included for the purpose of authentication
      select: {
        ...this._include,
        password: true,
      },
    });
  }

  async findOneById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      select: {
        ...this._include,
      },
    });
  }

  async update(id: number, data: any) {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data,
      select: this._include,
    });
  }

  async updatePassword(id: number, password: string) {
    password = await UserRepository.generateHash(password);
    return await this.prismaService.user.update({
      where: { id },
      data: { password },
      select: this._include,
    });
  }

  async delete(id: number) {
    return await this.prismaService.user.delete({
      where: {
        id,
      },
      select: {
        ...this._include,
      },
    });
  }

  static async generateHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  static async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
