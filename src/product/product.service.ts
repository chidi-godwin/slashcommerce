import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRespository } from './product.dao';

@Injectable()
export class ProductService {
  constructor(readonly productRepository: ProductRespository) {}
  create(createProductDto: CreateProductDto) {
    const { storeId, ...data } = createProductDto;
    return this.productRepository.create(data, storeId);
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
