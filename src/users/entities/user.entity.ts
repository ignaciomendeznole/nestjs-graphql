import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Role } from 'src/auth/enums/valid-roles.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'user' })
export class User {
  @Field(() => ID, { description: 'User Unique ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'User full name' })
  @Column({ type: 'text' })
  fullName: string;

  @Field(() => String, { description: 'User email' })
  @Column({ type: 'text', unique: true })
  email: string;

  @Field(() => String, { description: 'User password' })
  @Column({ type: 'text' })
  password: string;

  @Field(() => [String], { description: 'User roles' })
  @Column({
    type: 'enum',
    array: true,
    enum: Role,
    default: [Role.USER],
  })
  roles: Role[];

  @Field(() => Boolean, { description: 'User active or inactive' })
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // TODO: Relations with other entities
}
