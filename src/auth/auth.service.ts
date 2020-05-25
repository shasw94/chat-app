import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayLoad } from 'src/auth/jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.signUp(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPassword(authCredentialsDto);

        if (!username) {
            throw new UnauthorizedException('Incorrect username/password');
        }

        const payload: JwtPayLoad = { username };
        const accessToken = await this.jwtService.sign(payload);

        return { accessToken };
    }

    async getUserById(id: number) : Promise<User>{
        const found = await this.userRepository.findOne(id);

        if (!found) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }

        return found;
    }

    async getAllUsers() :Promise<User[]>{
        const users = await this.userRepository.find();

        if (!users) {
            throw new NotFoundException(`No users available`);
        }
        return users;
    }

}
