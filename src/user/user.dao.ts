import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
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
    };
  }

  async create(data: CreateUserDto) {
    // users should be created with an empty cart by default
    // store owners can create their store on signup by setting the isStoreOwner flag to true

    const { isStoreOwner, store, ...userDetails } = data;
    userDetails.password = await UserRepository.generateHash(data.password); // hash the password before storing it in the database

    if (isStoreOwner && store) {
      return await this.prismaService.user.create({
        data: {
          ...userDetails,
          Cart: {},
          stores: {
            create: [store],
          },
        },
        select: {
          ...this._include,
          stores: true,
        },
      });
    } else {
      return await this.prismaService.user.create({
        data: {
          ...userDetails,
          Cart: {},
        },
        select: {
          ...this._include,
          Cart: true,
        },
      });
    }
  }

  async findOneByEmail(email: string) {
    return await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findOneById(id: number) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
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
