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

  findOne(id: number) {
    return this.userRepository.findOneById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
