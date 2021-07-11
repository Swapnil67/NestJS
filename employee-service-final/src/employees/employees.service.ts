import { Injectable, NotFoundException } from '@nestjs/common';
import {  EmployeeStatus, EmployeeTier } from './Employees.enums';
import { Employee } from './schema/Employee.Schema';
// import {v1 as uuid} from 'uuid'
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto';
import { EmployeeRepository } from './dto/Empoloyee.Repository';

@Injectable()
export class EmployeesService {
    constructor(private employeeRepository: EmployeeRepository) {}
    // Get All Employees
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.findAll()
    }

    // Get Employee By Id
    async getEmployeeById(id: string): Promise<Employee> {
        // const employees = this.getAllEmployees();
        // let employee = employees.find(employee => employee.id === id)
        // // You can even validate some things in service like we did in here.
        // //  Ex if we update an non existing employee it will give error.
        // if(!employee){
        //     throw new NotFoundException(`${id} is not exists`);
        // }
        // return employee;
        return await this.employeeRepository.findById(id)
    }

    // Create New Employee
    createEmployee(employeeCreateDto: EmployeeCreateDto): Promise<Employee> {
        return this.employeeRepository.create(employeeCreateDto)
    }

    // Find Employee By Name or Status.
    employeeSearch(employeeSearchDto: EmployeeSearchDto){
        return this.employeeRepository.FindByNameOrStatus(employeeSearchDto)
        // let employees = this.getAllEmployees();
        // if(status){
        //     employees = employees.filter(employee => employee.status === status);
        // }
        // if(name){
        //     employees=employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name))
        // }
        // return employees;
    }

    // Update an Employees
    async updateEmployeeById(id: string, employeeUpdateDto: EmployeeUpdateDto): Promise<Employee> {        
        const employee = this.getEmployeeById(id);
        // To Create a new object
        // const updatedEmployee = {
        //     id: employee.id,
        //     firstName: employeeUpdateDto.firstName === undefined ? employee.firstName : employeeUpdateDto.firstName,
        //     lastName: employeeUpdateDto.lastName === undefined ? employee.lastName : employeeUpdateDto.lastName,
        //     nearestCity: employeeUpdateDto.nearestCity === undefined ? employee.nearestCity : employeeUpdateDto.nearestCity,
        //     destination: employeeUpdateDto.destination === undefined ? employee.destination : employeeUpdateDto.destination,
        //     tier: employeeUpdateDto.tier === undefined ? employee.tier : employeeUpdateDto.tier,
        //     status: employeeUpdateDto.status === undefined ? employee.status : employeeUpdateDto.status,
        // }
        // employee.firstName =  employeeUpdateDto.firstName === undefined ? employee.firstName : employeeUpdateDto.firstName;
        // employee.lastName =  employeeUpdateDto.lastName === undefined ? employee.lastName : employeeUpdateDto.lastName;
        // employee.nearestCity =  employeeUpdateDto.nearestCity === undefined ? employee.nearestCity : employeeUpdateDto.nearestCity;
        // employee.destination =  employeeUpdateDto.destination === undefined ? employee.destination : employeeUpdateDto.destination;
        // employee.tier =  employeeUpdateDto.tier === undefined ? employee.tier : employeeUpdateDto.tier;
        // employee.status =  employeeUpdateDto.status === undefined ? employee.status : employeeUpdateDto.status;
        // return employee;
        return await this.employeeRepository.UpdateById(id, employeeUpdateDto);
    }

    // Delete the employee by ID
    async deleteEmployeeById(id: string): Promise<Employee> {
        return await this.employeeRepository.DeleteOne(id);
    }
}
