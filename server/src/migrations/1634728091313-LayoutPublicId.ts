import { MigrationInterface, QueryRunner } from 'typeorm';

export class LayoutPublicId1634728091313 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM problem;
        `);
    await queryRunner.query(`
          DELETE FROM layout;
        `);
    await queryRunner.query(`
          ALTER TABLE layout
          ADD COLUMN "publicId" VARCHAR NOT NULL;
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
