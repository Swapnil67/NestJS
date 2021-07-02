import { CanActivate, ExecutionContext } from "@nestjs/common";
export declare class AuthenticatedGuardSession implements CanActivate {
    canActivate(context: ExecutionContext): Promise<any>;
}
