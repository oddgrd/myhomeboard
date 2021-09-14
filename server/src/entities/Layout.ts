import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Board } from './Board';
import { User } from './User';

@ObjectType()
@Entity()
export class Layout extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  url!: string;

  @Field()
  @Column()
  creatorId!: string;

  @Field()
  @Column()
  boardId!: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.problems)
  creator: User;

  @ManyToOne(() => Board, (board) => board.layouts)
  board: Board;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
