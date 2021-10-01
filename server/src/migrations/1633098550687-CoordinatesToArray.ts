import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoordinatesToArray1633098550687 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ALTER COLUMN coordinates TYPE jsonb[] USING ARRAY[coordinates];
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE problem
            ALTER COLUMN coordinates TYPE jsonb USING COALESCE(coordinates[1], '"{}"');
        `);
  }
}
