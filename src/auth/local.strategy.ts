import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy  extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super(); //Config
    }

    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        console.log("Second - local-strategy.ts");
        
        // If user does not exists
        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}