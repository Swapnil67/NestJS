import { Injectable, NotFoundException } from '@nestjs/common';
import { Employee, EmployeeStatus, EmployeeTier } from './employee.model';
import {v1 as uuid} from 'uuid'
import { EmployeeSearchDto } from './dto/EmployeeSearch.dto';
import { EmployeeUpdateDto } from './dto/EmployeeUpdate.dto';
import { EmployeeCreateDto } from './dto/EmployeeCreate.dto';
@Injectable()
export class EmployeesService {
    private employees: Employee[] = [];
    // Get All Employees
    getAllEmployees() {
        return this.employees;
    }

    // Get Employee By Id
    getEmployeeById(id: string): Employee {
        const employees = this.getAllEmployees();
        let employee = employees.find(employee => employee.id === id)
        // You can even validate some things in service like we did in here.
        //  Ex if we update an non existing employee it will give error.
        if(!employee){
            throw new NotFoundException(`${id} is not exists`);
        }
        return employee;
    }

    // Create New Employee
    createEmployee(employeeCreateDto: EmployeeCreateDto) {
        const employee = {
            id: uuid(),
            firstName: employeeCreateDto.firstName,
            lastName: employeeCreateDto.lastName,
            destination: employeeCreateDto.designation,
            nearestCity: employeeCreateDto.nearestCity, 
            tier: employeeCreateDto.tier,
            status: EmployeeStatus.ACTIVE,
        }

        this.employees.push(employee)
        return this.employees;
    }

    // Find Employee By Name or Status.
    employeeSearch(employeeSearchDto: EmployeeSearchDto){
        const {status, name} = employeeSearchDto;
        console.log(employeeSearchDto);
        
        let employees = this.getAllEmployees();
        if(status){
            employees = employees.filter(employee => employee.status === status);
        }
        if(name){
            employees=employees.filter(employee => employee.firstName.includes(name) || employee.lastName.includes(name))
        }
        return employees;
    }

    // Update an Employees
    updateEmployeeById(id: string, employeeUpdateDto: EmployeeUpdateDto): Employee {        
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
        employee.firstName =  employeeUpdateDto.firstName === undefined ? employee.firstName : employeeUpdateDto.firstName;
        employee.lastName =  employeeUpdateDto.lastName === undefined ? employee.lastName : employeeUpdateDto.lastName;
        employee.nearestCity =  employeeUpdateDto.nearestCity === undefined ? employee.nearestCity : employeeUpdateDto.nearestCity;
        employee.destination =  employeeUpdateDto.destination === undefined ? employee.destination : employeeUpdateDto.destination;
        employee.tier =  employeeUpdateDto.tier === undefined ? employee.tier : employeeUpdateDto.tier;
        employee.status =  employeeUpdateDto.status === undefined ? employee.status : employeeUpdateDto.status;
        return employee;
    }

    // Delete the employee by ID
    deleteEmployeeById(id: string): Employee[] {
        const employees = this.getAllEmployees();
        const employeeIndex = employees.findIndex(employee => employee.id === id);
        return employees.splice(employeeIndex, 1);
    }
}
