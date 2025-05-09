import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
@Prop({ required: true, unique: true })
email: string;

@Prop({ required: true })
password: string;

@Prop({ required: true })
fullName: string;

@Prop({ required: true, min: 16, max: 60 })
age: number;

@Prop({ required: true })
mobileNumber: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.path('mobileNumber').validate(
(val: string) => /^01\d{9}$/.test(val),
'Invalid mobile number',
);
