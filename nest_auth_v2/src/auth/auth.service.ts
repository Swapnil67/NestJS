import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {}
    async validateUser(username: string, password: string): Promise<any> {
        console.log("Third - Validating the user auth_services.ts");
        const user = await this.userService.findOne(username);
        if (user && user.password === password) {
            const {password, username, ...rest} = user;
            return rest;
        }else{
            return null;
        }
    }
}

