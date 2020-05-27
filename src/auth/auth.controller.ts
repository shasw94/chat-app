import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    // @Get('/:id')
    // getUserById(@Param('id', ParseIntPipe) id: number) : Promise<User> {
    //     return this.authService.getUserById(id);
    // }

    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto
    ): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialDto);
    }

    // @Post('')

    @Post('/getLoggedInUser')
    @UseGuards(AuthGuard())
    test(@GetUser() req) {
        return req;
    }

    @Post('/getMyFriendList')
    @UseGuards(AuthGuard())
    getMyFriendList(@GetUser() user : User) : Promise<User[]>{
        return this.authService.getAllUsers(user);
    }

}
