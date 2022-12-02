import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRespository } from './product.dao';

@Injectable()
export class ProductService {
  constructor(readonly productRepository: ProductRespository) {}

  create(createProductDto: CreateProductDto, storeId: number) {
    return this.productRepository.create(createProductDto, storeId);
  }

  async getStoreProducts(storeId: number) {
    return this.productRepository.findProductsByStoreId(storeId);
  }

  findAll() {
    return this.productRepository.findAll();
  }

  findOne(id: number) {
    return this.productRepository.findOneById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: number) {
    return this.productRepository.remove(id);
  }
}
