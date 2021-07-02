import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";

@Injectable()
export class SessionSerializer extends PassportSerializer {
    // Before it goes into session we need to serialize it 
    serializeUser(user: any, done: (err: Error, user: any) => void): any {
        done(null, user);
    }

    // Before it moves out of session we need to de-serialize it
    deserializeUser(payload: any, done: (err: Error, payload: string) => void): any {
        done(null, payload);
    }
}