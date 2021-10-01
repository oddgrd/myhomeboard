import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProblemAndBoard1633094485205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
                ALTER TABLE problem
                ADD UNIQUE ("title", "boardId");
            `);
    await queryRunner.query(`
            ALTER TABLE board
            DROP COLUMN location;
        `);
    await queryRunner.query(`
            ALTER TABLE board
            ADD COLUMN city VARCHAR;
        `);
    await queryRunner.query(`
            ALTER TABLE board
            ADD COLUMN country VARCHAR;
        `);
    await queryRunner.query(`
            UPDATE board 
            SET city = 'Oslo', 
                country = 'Norway';
        `);
    await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN city SET NOT NULL;
        `);
    await queryRunner.query(`
            ALTER TABLE board
            ALTER COLUMN country SET NOT NULL;
        `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
