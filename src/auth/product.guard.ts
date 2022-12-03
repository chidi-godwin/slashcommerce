import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
  Type,
} from '@nestjs/common';
import { ProductRespository } from '../product/product.dao';

export const ProductGuard = (): Type<CanActivate> => {
  @Injectable()
  class ProductGuardMixin implements CanActivate {
    constructor(private readonly productRepository: ProductRespository) {}

    async canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      const productId = +request.params.id;
      const product: any = await this.productRepository.findOneById(productId);
      const storeId = product.storeId;

      return user.stores.some((store) => store.id === storeId);
    }
  }

  return mixin(ProductGuardMixin);
};
