import { LoginUserInput } from './dto/login-user.input';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserInput } from 'src/users/dto/create-user.input';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService) {}
    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        const matched = await bcrypt.compare(password, user.password); //bcrypt pass
       
        if(user && matched) { //bcrypt match
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(loginUserInput: LoginUserInput) {
        const user = await this.usersService.findOne(loginUserInput.username);

        const payload = { username: user.username, sub: user.id };
        return {
        access_token: this.jwtService.sign(payload),
        user
    };
    }

    async register(createUserInput: CreateUserInput) {
        // using loginUserInput because registration is not complex and require same fields
        const user = await this.usersService.create(createUserInput);
        const payload = { username: user.username, sub: user.id };
        const {password, ...result} = user;
        return {
            access_token: this.jwtService.sign(payload),
            user
        };

    }
}
