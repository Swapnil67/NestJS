import { EmployeeStatus, EmployeeTier } from "../employee.model";

export interface EmployeeUpdateDto {
    firstName?: string,
    lastName?: string,
    destination?: string,
    nearestCity?: string,
    tier?: EmployeeTier,
    status?: EmployeeStatus,
}