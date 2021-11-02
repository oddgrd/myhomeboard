import {MigrationInterface, QueryRunner} from "typeorm";

export class createDb1635875324004 implements MigrationInterface {
    name = 'createDb1635875324004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "problem" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "creatorId" uuid NOT NULL, "title" citext NOT NULL, "rules" character varying NOT NULL, "angle" integer NOT NULL, "coordinates" jsonb array NOT NULL, "grade" integer NOT NULL, "rating" integer, "boardId" uuid NOT NULL, "layoutUrl" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "layoutId" uuid, CONSTRAINT "UQ_1d1b8a9588bf85d1f9058007a8c" UNIQUE ("title", "boardId"), CONSTRAINT "REL_5f1a67c1ec436bff1608eefe36" UNIQUE ("layoutId"), CONSTRAINT "PK_119b5ca6f3371465bf1f0f90219" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "avatar" character varying, "googleId" character varying NOT NULL, "boardWhitelist" uuid array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "layout" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "description" character varying NOT NULL, "url" character varying NOT NULL, "creatorId" uuid NOT NULL, "boardId" uuid NOT NULL, "publicId" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e288ce489327c1ec1274d24942" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" citext NOT NULL, "creatorId" uuid NOT NULL, "description" character varying NOT NULL, "adjustable" boolean NOT NULL, "angles" smallint array NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_24d1b2169cb24fb2d3ff812a4e0" UNIQUE ("title"), CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ascent" ("userId" uuid NOT NULL, "problemId" uuid NOT NULL, "attempts" integer NOT NULL, "grade" integer NOT NULL, "rating" integer NOT NULL, "comment" character varying NOT NULL, "boardId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d5d826de12a166e8210dcc3e159" PRIMARY KEY ("userId", "problemId"))`);
        await queryRunner.query(`ALTER TABLE "problem" ADD CONSTRAINT "FK_b7da7b484695bd7fd02a62c21bf" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem" ADD CONSTRAINT "FK_55d7542020ecd4a1b1911615c56" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "layout" ADD CONSTRAINT "FK_68b2d4891c17a3a403c4dea79ac" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "layout" ADD CONSTRAINT "FK_2eee24c303c78eed1938d3f3f04" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "board" ADD CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ascent" ADD CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ascent" ADD CONSTRAINT "FK_6b3b6a7a3fd7ee9a8386299ed18" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ascent" ADD CONSTRAINT "FK_64592940c5c1ee59433d148d977" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ascent" DROP CONSTRAINT "FK_64592940c5c1ee59433d148d977"`);
        await queryRunner.query(`ALTER TABLE "ascent" DROP CONSTRAINT "FK_6b3b6a7a3fd7ee9a8386299ed18"`);
        await queryRunner.query(`ALTER TABLE "ascent" DROP CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c"`);
        await queryRunner.query(`ALTER TABLE "board" DROP CONSTRAINT "FK_edd0f21e2c0183c2908e3075f72"`);
        await queryRunner.query(`ALTER TABLE "layout" DROP CONSTRAINT "FK_2eee24c303c78eed1938d3f3f04"`);
        await queryRunner.query(`ALTER TABLE "layout" DROP CONSTRAINT "FK_68b2d4891c17a3a403c4dea79ac"`);
        await queryRunner.query(`ALTER TABLE "problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`);
        await queryRunner.query(`ALTER TABLE "problem" DROP CONSTRAINT "FK_55d7542020ecd4a1b1911615c56"`);
        await queryRunner.query(`ALTER TABLE "problem" DROP CONSTRAINT "FK_b7da7b484695bd7fd02a62c21bf"`);
        await queryRunner.query(`DROP TABLE "ascent"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "layout"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "problem"`);
    }

}
