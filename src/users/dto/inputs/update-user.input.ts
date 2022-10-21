import { SignUpInput } from '../../../auth/dto/inputs/signup.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(SignUpInput) {
  @Field(() => Int)
  id: number;
}
