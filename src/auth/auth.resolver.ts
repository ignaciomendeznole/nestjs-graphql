import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { SignInInput, SignUpInput } from './dto';
import { Role } from './enums/valid-roles.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthResponse } from './types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signUp' })
  async signUp(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<AuthResponse> {
    return await this.authService.signUp(signUpInput);
  }

  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Args('signInInput', { type: () => SignInInput }) signInInput: SignInInput,
  ): Promise<AuthResponse> {
    return await this.authService.signIn(signInInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  async revalidateToken(@CurrentUser() user: User): Promise<AuthResponse> {
    return this.authService.revalidateToken(user);
  }
}
