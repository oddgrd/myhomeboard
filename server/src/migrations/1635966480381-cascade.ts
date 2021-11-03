import {MigrationInterface, QueryRunner} from "typeorm";

export class cascade1635966480381 implements MigrationInterface {
    name = 'cascade1635966480381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ascent" DROP CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c"`);
        await queryRunner.query(`ALTER TABLE "public"."ascent" ADD CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."ascent" DROP CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c"`);
        await queryRunner.query(`ALTER TABLE "public"."ascent" ADD CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c" FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
