import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Employee, EmployeeDocument } from "../schema/Employee.Schema";
import { EmployeeCreateDto } from "./EmployeeCreate.dto";
import { EmployeeSearchDto } from "./EmployeeSearch.dto";
import { EmployeeUpdateDto } from "./EmployeeUpdate.dto";

@Injectable()
export class EmployeeRepository {
    constructor(@InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>){}

    async create(createEmployeeDTO: EmployeeCreateDto):Promise<Employee>{
        let newEmployee = new this.employeeModel(createEmployeeDTO)
        return await newEmployee.save()
    }

    async findAll():Promise<Employee[]> {
        return await this.employeeModel.find();
    }

    async FindByNameOrStatus(employeeSearchDto: EmployeeSearchDto): Promise<Employee[]> {
        const {status, name} = employeeSearchDto;
        const allEmployees = await this.employeeModel.aggregate([
            {
                "$match": {
                    $or: [
                        { status: status },
                        { firstName: name },
                        { lastName: name }
                    ]
                }
            }
        ]);
        return allEmployees;
    }

    async findById(id: string): Promise<Employee> {
        const employee = await this.employeeModel.findOne({_id: id})
        return employee;
    }


    async UpdateById(id: string, employeeUpdateDto: EmployeeUpdateDto): Promise<Employee>{
        var conditions = {
            _id : id 
        }
        const employee = await this.employeeModel.findOne({_id: id})
        var updatedEmployee = {
            firstName: employeeUpdateDto.firstName === undefined ? employee.firstName : employeeUpdateDto.firstName,
            lastName: employeeUpdateDto.lastName === undefined ? employee.lastName : employeeUpdateDto.lastName,
            nearestPlanet: employeeUpdateDto.nearestPlanet === undefined ? employee.nearestPlanet : employeeUpdateDto.nearestPlanet,
            designation: employeeUpdateDto.designation === undefined ? employee.designation : employeeUpdateDto.designation,
            tier: employeeUpdateDto.tier === undefined ? employee.tier : employeeUpdateDto.tier,
            status: employeeUpdateDto.status === undefined ? employee.status : employeeUpdateDto.status,
        }
        await this.employeeModel.findOneAndUpdate(conditions, updatedEmployee)
        return updatedEmployee;
    }

    async DeleteOne(id: string): Promise<Employee> {
        return await this.employeeModel.findOneAndDelete({_id: id});
    }
}