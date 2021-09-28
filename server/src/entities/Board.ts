import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Ascent } from './Ascent';
import { Layout } from './Layout';
import { Problem } from './Problem';
import { User } from './User';

@ObjectType()
@Entity()
export class Board extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column({ type: 'uuid' })
  creatorId!: string;

  @Field()
  @Column()
  description!: string;

  @Field()
  @Column()
  adjustable!: boolean;

  @Field(() => [Int])
  @Column({ type: 'smallint', array: true })
  angles!: number[];

  // @Field(() => [String])
  // @Column({ type: 'uuid', array: true })
  // members: string[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  location: string;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.problems)
  creator: User;

  @Field(() => [Layout], { nullable: true })
  @OneToMany(() => Layout, (layout) => layout.board)
  layouts: Layout[];

  @Field(() => [Problem], { nullable: true })
  @OneToMany(() => Problem, (problem) => problem.board)
  problems: Problem[];

  @Field(() => [Ascent], { nullable: true })
  @OneToMany(() => Ascent, (ascent) => ascent.board)
  ascents: Ascent[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
