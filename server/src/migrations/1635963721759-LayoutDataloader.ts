import { MigrationInterface, QueryRunner } from 'typeorm';

export class LayoutDataloader1635963721759 implements MigrationInterface {
  name = 'LayoutDataloader1635963721759';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."problem" DROP CONSTRAINT "REL_5f1a67c1ec436bff1608eefe36"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."problem" DROP CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360"`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."problem" ADD CONSTRAINT "REL_5f1a67c1ec436bff1608eefe36" UNIQUE ("layoutId")`
    );
    await queryRunner.query(
      `ALTER TABLE "public"."problem" ADD CONSTRAINT "FK_5f1a67c1ec436bff1608eefe360" FOREIGN KEY ("layoutId") REFERENCES "layout"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
