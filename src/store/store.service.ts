import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoreRepository } from './store.dao';

@Injectable()
export class StoreService {
  constructor(private readonly storeRepository: StoreRepository) {}
  create(userId: number, createStoreDto: CreateStoreDto) {
    const owner = { connect: { id: userId } };
    const data = { ...createStoreDto, user: owner };
    return this.storeRepository.create(data, userId);
  }

  findAll() {
    return this.storeRepository.findAll();
  }

  findOne(id: number) {
    return this.storeRepository.findOneById(id);
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return this.storeRepository.update(id, updateStoreDto);
  }

  remove(id: number) {
    return this.storeRepository.delete(id);
  }
}
