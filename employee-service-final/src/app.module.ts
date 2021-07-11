import { Module } from '@nestjs/common';
import { EmployeesModule } from './employees/employees.module';
import { DB_CONN_URL, DB_PASSWORD } from './employees/employee.properties';
import { MongooseModule } from '@nestjs/mongoose';

const MONGO_URL = DB_CONN_URL.replace('<password>', DB_PASSWORD);



@Module({
  
  imports: [EmployeesModule, MongooseModule.forRoot(MONGO_URL)],

})
export class AppModule {}
