import { ROLE } from './role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

export const StoreGuard = (role: ROLE): Type<CanActivate> => {
  class StoreGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user;
      const storeId = +request.params.id || +request.params.storeId;

      return (
        user.role === role && user.stores.some((store) => store.id === storeId)
      );
    }
  }

  return mixin(StoreGuardMixin);
};
