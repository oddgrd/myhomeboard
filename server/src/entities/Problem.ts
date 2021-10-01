import { Coordinates } from '../types/problem';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Ascent } from './Ascent';
import { Board } from './Board';
import { Layout } from './Layout';

@ObjectType()
@Entity()
@Unique(['title', 'boardId'])
export class Problem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ type: 'uuid' })
  creatorId!: string;

  @Field()
  @Column({ name: 'title' })
  title!: string;

  @Field()
  @Column()
  rules!: string;

  @Field(() => Int)
  @Column()
  angle!: number;

  @Field(() => [Coordinates])
  @Column({ type: 'jsonb', array: true })
  coordinates!: [Coordinates];

  @Field(() => Int)
  @Column({ type: 'int' })
  grade!: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  rating: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.problems)
  creator: User;

  @Field()
  @Column({ type: 'uuid', name: 'boardId' })
  boardId!: string;

  @Field(() => Board)
  @ManyToOne(() => Board, (board) => board.problems)
  board: Board;

  @Field(() => [Ascent])
  @OneToMany(() => Ascent, (ascent) => ascent.problem, { onDelete: 'CASCADE' })
  ascents: Ascent[];

  @Field()
  @Column()
  layoutUrl!: string;

  @Field(() => Layout)
  @OneToOne(() => Layout)
  @JoinColumn()
  layout: Layout;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
