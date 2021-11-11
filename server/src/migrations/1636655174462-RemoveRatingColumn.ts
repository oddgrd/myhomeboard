import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRatingColumn1636655174462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            DROP COLUMN rating;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ADD COLUMN rating INTEGER;
        `);
  }
}
