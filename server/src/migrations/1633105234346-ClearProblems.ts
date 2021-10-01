import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClearProblems1633105234346 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM problem;
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
