import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { EmployeeStatus, EmployeeTier } from "../Employees.enums";

// export const EmployeeSchema=({
//     id: String,
//     firstName: String,
//     lastName: String,
//     designation: String,
//     nearestCity: String,
//     tier: EmployeeTier,
//     status: EmployeeStatus,
// })

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
    @Prop({required: true})
    firstName: string
    @Prop({required: true})
    lastName: string
    @Prop()
    designation: string
    @Prop()
    nearestPlanet: string
    @Prop()
    tier: EmployeeTier
    @Prop({default: EmployeeStatus.ACTIVE})
    status: EmployeeStatus
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);