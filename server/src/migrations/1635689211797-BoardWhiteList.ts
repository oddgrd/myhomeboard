import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoardWhiteList1635689211797 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "user"
                ADD COLUMN "boardWhitelist" TEXT[];
            `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE "user"
                DROP COLUMN "boardWhitelist";
            `);
  }
}
