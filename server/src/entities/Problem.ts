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
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  creatorId!: number;

  @Field()
  @Column()
  rules!: string;

  @Field(() => [Int])
  @Column({ type: 'int', array: true })
  grade: number[];

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
