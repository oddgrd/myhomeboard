import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClearLayouts1635968522472 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM ascent;`);
    await queryRunner.query(`DELETE FROM problem;`);
    await queryRunner.query(`DELETE FROM layout;`);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
