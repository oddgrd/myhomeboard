import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBoardTitleType1633205880635 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN title TYPE CITEXT;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN title TYPE CITEXT;
        `);
  }
}
