import { InputType, Field } from '@nestjs/graphql';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from 'src/auth/enums/valid-roles.enum';

@InputType()
export class SignUpInput {
  @Field(() => String, { description: 'User full name' })
  @IsString()
  @MaxLength(30)
  @MinLength(3)
  @IsNotEmpty()
  fullName: string;

  @Field(() => String, { description: 'User email' })
  @IsString()
  @MaxLength(30)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { description: 'User password' })
  @IsString()
  @MaxLength(30)
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @Field(() => [String], { description: 'User roles', nullable: true })
  @IsEnum(Role, { each: true })
  @IsArray()
  @IsOptional()
  role?: Role[];
}
