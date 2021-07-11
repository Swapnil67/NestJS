import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { EmployeeTier } from './employees/Employees.enums';

@Injectable()
export class EmployeeTierValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if(!(value.tier in EmployeeTier)) {
      throw new BadRequestException(`${value.tier} is not a valid tier`)
    }
    console.log(value);
    return value;
  }
}

