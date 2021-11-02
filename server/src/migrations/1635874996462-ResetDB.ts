import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResetDB1635874996462 implements MigrationInterface {
  name = 'ResetDB1635874996462';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE ascent;`);
    await queryRunner.query(`DROP TABLE problem;`);
    await queryRunner.query(`DROP TABLE layout;`);
    await queryRunner.query(`DROP TABLE board;`);
    await queryRunner.query(`DROP TABLE "user";`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
