import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProblemTitleType1633119240350 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ALTER COLUMN title TYPE CITEXT;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ALTER COLUMN title TYPE VARCHAR;
        `);
  }
}
