import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { StoreRepository } from '../store.dao';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsStoreAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly storeRepository: StoreRepository) {}

  async validate(name: string) {
    const store = await this.storeRepository.findOneByName(name);
    if (store) return false;
    return true;
  }

  defaultMessage() {
    return 'User with this email already exists';
  }
}

export function IsStoreAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsStoreAlreadyExistConstraint,
    });
  };
}
