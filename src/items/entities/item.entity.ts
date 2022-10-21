import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'items' })
@ObjectType()
export class Item {
  @Field(() => ID, { description: 'Item ID' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'Item name' })
  @Column({ type: 'varchar' })
  name: string;

  @Field(() => Int, { description: 'Item quantity' })
  @Column({ type: 'int' })
  quantity: number;

  @Field(() => String, { description: 'Item description' })
  @Column({ type: 'varchar' })
  description: string;

  @Field(() => String, { nullable: true, description: 'Item quantity units' })
  @Column({ type: 'varchar', nullable: true })
  quantityUnits?: string;

  @Field(() => Boolean, { defaultValue: true, description: 'Item active' })
  @Column({ type: 'boolean', default: true })
  active: boolean;

  // Stores
  // User
}
