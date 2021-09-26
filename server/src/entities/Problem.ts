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
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Ascent } from './Ascent';
import { Board } from './Board';
import { Layout } from './Layout';

@ObjectType()
@Entity()
export class Problem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ type: 'uuid' })
  creatorId!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  rules!: string;

  @Field(() => Int)
  @Column()
  angle!: number;

  @Field(() => [Coordinates])
  @Column({ type: 'jsonb' })
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
  @Column()
  boardSlug!: string;

  @Field(() => Board)
  @ManyToOne(() => Board, (board) => board.problems)
  board: Board;

  @Field(() => [Ascent])
  @OneToMany(() => Ascent, (ascent) => ascent.problem)
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
