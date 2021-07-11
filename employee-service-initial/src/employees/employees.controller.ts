import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
// import { EmployeeStatus, EmployeeTier } from './employee.model';
import { EmployeesService } from './employees.service';
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto';
import { EmployeeTierValidationPipe } from 'src/employee-tier-validation.pipe';

@Controller('employees')
export class EmployeesController {
    constructor(private employeeService: EmployeesService) {}

    @Get()
    @UsePipes(ValidationPipe)
    async getAllEmployees(@Query() param: EmployeeSearchDto) {
        console.log(ValidationPipe);
        
       if(Object.keys(param).length) {
           console.log('with Paran');
           return this.employeeService.employeeSearch(param)
        }else{
           console.log('with no Paran');
           return this.employeeService.getAllEmployees();
       }
    }

    @Get('/:id')
    async getEmployeeId(@Param('id') id: string) {
        return this.employeeService.getEmployeeById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UsePipes(new EmployeeTierValidationPipe())
    async createEmployee(@Body() emplolyeeCreateDto: EmployeeCreateDto) {
        return this.employeeService.createEmployee(emplolyeeCreateDto)
    }

    @Put('/update/:id')
    updateEmployeeId(@Body() body: EmployeeUpdateDto, @Param('id') id:string){
        return this.employeeService.updateEmployeeById(id, body);
    }

    @Delete('/delete/:id')
    deleteEmployeeById(@Param('id') id: string){
        return this.employeeService.deleteEmployeeById(id);
    }
}

