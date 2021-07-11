import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeRepository } from './dto/Empoloyee.Repository';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { Employee, EmployeeSchema } from './schema/Employee.Schema';

@Module({
  // Below import is important
  imports: [MongooseModule.forFeature([{ name: Employee.name, schema: EmployeeSchema }])],
  controllers: [EmployeesController],
  providers: [EmployeesService, EmployeeRepository],
})
export class EmployeesModule {}
