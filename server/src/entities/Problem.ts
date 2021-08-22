import { Coordinates } from '../types/problemTypes';
import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Problem extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  creatorId!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  rules!: string;

  @Field(() => Coordinates)
  @Column({ type: 'jsonb' })
  coordinates!: Coordinates;

  @Field(() => [Int])
  @Column({ type: 'int', array: true })
  grade!: number[];

  @Field(() => [Int], { nullable: true })
  @Column({ type: 'int', array: true, nullable: true })
  rating: number[];

  // @Field(() => Int, { nullable: true })
  // sendStatus: number | null;

  // @Field()
  // @ManyToOne(() => User, (user) => user.problems)
  // creator: User;

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
