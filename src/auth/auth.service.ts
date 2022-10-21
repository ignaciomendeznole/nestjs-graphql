import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { SignInInput, SignUpInput } from './dto';
import { AuthResponse, JwtPayload } from './types';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  getJwtToken(user: User): string {
    const payload = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
    };

    return this.jwtService.sign(payload);
  }

  async signUp(signUpInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.userService.create(signUpInput);
    const token = 'token';

    return { user, token };
  }

  async signIn(signInInput: SignInInput): Promise<AuthResponse> {
    const { email, password } = signInInput;

    const user = await this.userService.findByEmail(email);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.getJwtToken(user);

    return { user, token };
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user);

    return { user, token };
  }

  async validateUser(id: JwtPayload['id']): Promise<User> {
    const user = await this.userService.findById(id);

    if (!user.isActive) {
      throw new BadRequestException('User is not active');
    }

    delete user.password;

    return user;
  }
}
