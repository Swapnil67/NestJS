import { IsIn } from "class-validator";
import { EmployeeStatus } from "../Employees.enums";

export class EmployeeSearchDto {
    @IsIn(Object.values(EmployeeStatus))
    status: EmployeeStatus
    name: string
}
export class AllEmployeeSearchDto {
    status: EmployeeStatus
    name: string
}