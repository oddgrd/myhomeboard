import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm';
import { Board } from './Board';
import { Problem } from './Problem';
import { User } from './User';

@ObjectType()
@Entity()
export class Ascent extends BaseEntity {
  @Field()
  @PrimaryColumn({ type: 'uuid' })
  userId!: string;

  @Field()
  @PrimaryColumn({ type: 'uuid' })
  problemId!: string;

  @Field(() => Int)
  @Column()
  attempts!: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  grade!: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  rating!: number;

  @Field(() => String)
  @Column()
  comment!: string;

  @Field(() => Problem)
  @ManyToOne(() => Problem, (problem) => problem.ascents)
  problem: Problem;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.ascents)
  user: User;

  @Field()
  @Column({ type: 'uuid' })
  boardId!: string;

  @Field(() => Board)
  @ManyToOne(() => Board, (board) => board.ascents)
  board: Board;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
