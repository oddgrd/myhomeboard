import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveLayoutUrl1635964937605 implements MigrationInterface {
    name = 'RemoveLayoutUrl1635964937605'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."problem" DROP COLUMN "layoutUrl"`);
        await queryRunner.query(`ALTER TABLE "public"."problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`);
        await queryRunner.query(`ALTER TABLE "public"."problem" ALTER COLUMN "layoutId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`);
        await queryRunner.query(`ALTER TABLE "public"."problem" ALTER COLUMN "layoutId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."problem" ADD "layoutUrl" character varying NOT NULL`);
    }

}
