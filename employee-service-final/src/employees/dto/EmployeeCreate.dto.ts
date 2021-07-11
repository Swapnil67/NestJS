import { ValidatorOptions } from "@nestjs/common/interfaces/external/validator-options.interface";
import { IsNotEmpty, NotEquals } from "class-validator";
import { EmployeeStatus, EmployeeTier } from "../Employees.enums";

export class EmployeeCreateDto {
    id: string
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @NotEquals('CEO')
    designation: string
    nearestPlanet: string
    tier: EmployeeTier
    status: EmployeeStatus
}
// 