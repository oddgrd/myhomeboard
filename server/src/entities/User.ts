import { Field, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Ascent } from './Ascent';
import { Problem } from './Problem';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field()
  @Column()
  googleId!: string;

  @Field(() => [Problem], { nullable: true })
  @OneToMany(() => Problem, (problem) => problem.creator)
  problems: Problem[];

  @Field(() => [Ascent], { nullable: true })
  @OneToMany(() => Ascent, (ascent) => ascent.user)
  ascents: Ascent[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
