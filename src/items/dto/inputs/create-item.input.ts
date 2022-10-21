import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateItemInput {
  @Field(() => String, { description: 'Item name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(100)
  name: string;

  @Field(() => Int, { description: 'Item quantity' })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @Min(1)
  quantity: number;

  @Field(() => String, { description: 'Item description' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;

  @Field(() => String, { nullable: true, description: 'Item quantity units' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(10)
  quantityUnits?: string;
}
