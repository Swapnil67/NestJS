import { Injectable } from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: "Son Goku",
            username: "Son",
            password: "riceandchickenbowl"
        },
        {
            id: 2,
            name: "Prince Vegeta",
            username: "vegeta",
            password: "prince"
        }
    ];

    // FInd the user with the provided username
    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
