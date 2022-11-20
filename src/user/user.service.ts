import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.dao';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { isStoreOwner, store, ...userDetails } = createUserDto;

    userDetails.password = await UserRepository.generateHash(
      createUserDto.password,
    ); // hash the password before storing it in the database

    if (isStoreOwner && store) {
      return await this.userRepository.createStoreOwner(userDetails, store);
    }

    return this.userRepository.createCustomer(userDetails);
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return this.userRepository.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
