import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpInput } from 'src/auth/dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(signUpInput: SignUpInput): Promise<User> {
    const hashedPassword = bcrypt.hashSync(signUpInput.password, 10);

    try {
      const user = this.userRepository.create({
        ...signUpInput,
        password: hashedPassword,
      });
      return await this.userRepository.save(user);
    } catch (error) {
      this.handleDbErrors(error);
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ email });
    } catch (error) {
      this.handleDbErrors({
        code: 'error-001',
        detail: `${email} not found`,
      });
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.userRepository.findOneByOrFail({ id });
    } catch (error) {
      this.handleDbErrors({
        code: 'error-001',
        detail: `${id} not found`,
      });
    }
  }

  private handleDbErrors(error: any): never {
    if (error.code === '23505' || error.code === 'error-001') {
      throw new BadRequestException(error.detail.replace('Key ', ''));
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Check server logs');
  }
}
