import { Field, ObjectType } from 'type-graphql';
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
export class Board extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  title!: string;

  @Field()
  @Column()
  creatorId!: string;

  @Field()
  @Column()
  rules!: string;

  @Field()
  @Column()
  grade: number;

  // @Field(() => Int, { nullable: true })
  // sendStatus: number | null;

  // @Field()
  // @ManyToOne(() => User, (user) => user.problems)
  // creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
