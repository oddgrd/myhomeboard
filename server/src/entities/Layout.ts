import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Board } from './Board';
import { Problem } from './Problem';
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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.problems)
  creator: User;

  @Field()
  @Column({ type: 'uuid' })
  boardId!: string;

  @Field()
  @Column()
  publicId!: string;

  @Field(() => [Problem], { nullable: true })
  @OneToMany(() => Problem, (problem) => problem.layout)
  problems: Problem[];

  @ManyToOne(() => Board, (board) => board.layouts)
  board: Board;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
