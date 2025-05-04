import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { LoginDto } from './DTO/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
constructor(private usersService: UsersService) {}

@Post('sign-up')
@ApiResponse({ status: 201, description: 'User created' })
signUp(@Body() dto: CreateUserDto) {
return this.usersService.create(dto);
}

@Post('sign-in')
@ApiResponse({ status: 200, description: 'User signed in' })
signIn(@Body() dto: LoginDto) {
return this.usersService.login(dto);
}

@UseGuards(AuthGuard('jwt'))
@Get('my-profile')
@ApiBearerAuth()
getProfile(@Req() req) {
return this.usersService.findOne(req.user.userId);
}

@UseGuards(AuthGuard('jwt'))
@Get('all')
@ApiBearerAuth()
getAll(@Req() req) {
return this.usersService.findAll(req.user.userId);
}
}
