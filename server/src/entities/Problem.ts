import { Coordinates } from '../types/problem';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Ascent } from './Ascent';

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

  @Field(() => [Coordinates])
  @Column({ type: 'jsonb' })
  coordinates!: [Coordinates];

  @Field(() => Int)
  @Column({ type: 'int' })
  grade!: number;

  @Field(() => Int, { nullable: true })
  @Column({ type: 'int', nullable: true })
  rating: number;

  @Field()
  @ManyToOne(() => User, (user) => user.problems)
  creator: User;

  @Field(() => [Ascent])
  @OneToMany(() => Ascent, (ascent) => ascent.problem)
  ascents: Ascent[];

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
