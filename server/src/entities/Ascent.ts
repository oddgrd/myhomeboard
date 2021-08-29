import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Problem } from './Problem';
import { User } from './User';

@ObjectType()
@Entity()
export class Ascent extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid') //todo: remove?
  id!: string;

  @Field()
  @Column({ type: 'uuid' }) //todo: primarykey?
  userId!: string;

  @Field()
  @Column({ type: 'uuid' }) //todo: primarykey?
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

  // @Field()
  // @OneToOne(() => Board)
  // @JoinColumn()
  // board: Board;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
