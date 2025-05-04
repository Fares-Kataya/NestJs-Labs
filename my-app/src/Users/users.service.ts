import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './Schemas/user.schema';
import { CreateUserDto } from './DTO/create-user.dto';
import { LoginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
constructor(
@InjectModel(User.name) private userModel: Model<User>,
private jwtService: JwtService,
) {}

async create(createDto: CreateUserDto) {
const hash = await bcrypt.hash(createDto.password, 10);
const user = await new this.userModel({
    ...createDto,
    password: hash,
}).save();
return user;
}

async validateUser(email: string, pass: string) {
const user = await this.userModel.findOne({ email }).exec();
if (user && (await bcrypt.compare(pass, user.password))) {
    return user;
}
return null;
}

async login(loginDto: LoginDto) {
const user = await this.validateUser(loginDto.email, loginDto.password);
if (!user) throw new UnauthorizedException('Invalid credentials');
const payload = { sub: user._id, email: user.email };
return { access_token: this.jwtService.sign(payload) };
}

async findAll(excludeId: string) {
return this.userModel
    .find({ _id: { $ne: excludeId } })
    .select('-password')
    .exec();
}

async findOne(id: string) {
return this.userModel.findById(id).select('-password').exec();
}
}
