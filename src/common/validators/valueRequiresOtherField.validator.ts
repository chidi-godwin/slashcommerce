import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint()
export class ValueRequiresOtherFieldValidation
  implements ValidatorConstraintInterface
{
  validate(fieldValue: any, validationArguments: ValidationArguments) {
    const valuesCausingValidation: any = validationArguments.constraints[0];
    const fieldThenRequired: string = validationArguments.constraints[1];

    if (fieldValue === valuesCausingValidation) {
      return validationArguments.object[fieldThenRequired];
    } else {
      return true;
    }
  }

  defaultMessage() {
    return '$constraint2 is required because $property is set to "$value"';
  }
}
