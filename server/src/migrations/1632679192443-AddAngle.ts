import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAngle1632679192443 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ADD COLUMN angle SMALLINT;
        `);
    await queryRunner.query(`
            UPDATE problem
            SET angle = 30;
        `);
    await queryRunner.query(`
        ALTER TABLE problem
        ALTER COLUMN angle SET NOT NULL;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            DROP COLUMN angle;
        `);
  }
}
