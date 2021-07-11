import { EmployeeStatus, EmployeeTier } from "../Employees.enums";

export interface EmployeeUpdateDto {
    firstName?: string,
    lastName?: string,
    designation?: string,
    nearestPlanet?: string,
    tier?: EmployeeTier,
    status?: EmployeeStatus,
}