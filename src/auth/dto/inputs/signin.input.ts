import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String, { description: 'Email' })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'Password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
