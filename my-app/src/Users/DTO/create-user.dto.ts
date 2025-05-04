import {
IsEmail,
IsString,
MinLength,
Matches,
IsInt,
Min,
Max,
Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
@ApiProperty({ example: 'user@example.com' })
@IsEmail()
email: string;

@ApiProperty({ minLength: 8 })
@IsString()
@MinLength(8)
@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, {
    message: 'Password must be alphanumeric',
})
password: string;

@ApiProperty({ example: 'John Doe' })
@IsString()
fullName: string;

@ApiProperty({ minimum: 16, maximum: 60 })
@IsInt()
@Min(16)
@Max(60)
age: number;

@ApiProperty({ example: '01012345678' })
@IsString()
@Length(11, 11)
@Matches(/^01\d{9}$/, {
    message: 'mobileNumber must start with 01 and be 11 digits',
})
mobileNumber: string;
}
