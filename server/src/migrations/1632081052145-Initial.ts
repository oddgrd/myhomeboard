import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1632081052145 implements MigrationInterface {
  name = 'Initial1632081052145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "problem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creatorId" uuid NOT NULL, "title" character varying NOT NULL, "rules" character varying NOT NULL, "coordinates" jsonb NOT NULL, "grade" integer NOT NULL, "rating" integer, "boardSlug" character varying NOT NULL, "layoutUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "layoutId" uuid, CONSTRAINT "REL_5f1a67c1ec436bff1608eefe36" UNIQUE ("layoutId"), CONSTRAINT "PK_119b5ca6f3371465bf1f0f90219" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar" character varying, "googleId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "layout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "creatorId" uuid NOT NULL, "boardSlug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e288ce489327c1ec1274d24942" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "board" ("slug" character varying NOT NULL, "title" character varying NOT NULL, "creatorId" uuid NOT NULL, "description" character varying NOT NULL, "adjustable" boolean NOT NULL, "angles" smallint array NOT NULL, "location" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_24d1b2169cb24fb2d3ff812a4e0" UNIQUE ("title"), CONSTRAINT "PK_ae7bfe48cb8fca88f4f99f13125" PRIMARY KEY ("slug"))`
    );
    await queryRunner.query(
      `CREATE TABLE "ascent" ("userId" uuid NOT NULL, "problemId" uuid NOT NULL, "attempts" integer NOT NULL, "grade" integer NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "boardSlug" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d5d826de12a166e8210dcc3e159" PRIMARY KEY ("userId", "problemId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" ADD CONSTRAINT "FK_b7da7b484695bd7fd02a62c21bf" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" ADD CONSTRAINT "FK_ac86a7f16bfd5c83c876e5111d1" FOREIGN KEY ("boardSlug") REFERENCES "board"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "layout" ADD CONSTRAINT "FK_68b2d4891c17a3a403c4dea79ac" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "layout" ADD CONSTRAINT "FK_841bf9725e5ada0d76538d17844" FOREIGN KEY ("boardSlug") REFERENCES "board"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ascent" ADD CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ascent" ADD CONSTRAINT "FK_6b3b6a7a3fd7ee9a8386299ed18" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "ascent" ADD CONSTRAINT "FK_61823d6f4483c36b770608414d1" FOREIGN KEY ("boardSlug") REFERENCES "board"("slug") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ascent" DROP CONSTRAINT "FK_61823d6f4483c36b770608414d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "ascent" DROP CONSTRAINT "FK_6b3b6a7a3fd7ee9a8386299ed18"`
    );
    await queryRunner.query(
      `ALTER TABLE "ascent" DROP CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c"`
    );
    await queryRunner.query(
      `ALTER TABLE "board" DROP CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72"`
    );
    await queryRunner.query(
      `ALTER TABLE "layout" DROP CONSTRAINT "FK_841bf9725e5ada0d76538d17844"`
    );
    await queryRunner.query(
      `ALTER TABLE "layout" DROP CONSTRAINT "FK_68b2d4891c17a3a403c4dea79ac"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" DROP CONSTRAINT "FK_ac86a7f16bfd5c83c876e5111d1"`
    );
    await queryRunner.query(
      `ALTER TABLE "problem" DROP CONSTRAINT "FK_b7da7b484695bd7fd02a62c21bf"`
    );
    await queryRunner.query(`DROP TABLE "ascent"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "layout"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "problem"`);
  }
}
