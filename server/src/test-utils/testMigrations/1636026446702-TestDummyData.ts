import { MigrationInterface, QueryRunner } from 'typeorm';

export class TestDummyData1636026446702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = await queryRunner.query(`
        INSERT INTO "user"(name, email, avatar, "googleId")
        VALUES ('odd', 'test@testmail.com', 'https://myhomeboard.no/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FAATXAJyOadLzWK_lpFK9AM8O3jtULuvtcT8vmPSIEpxU9A%3Ds96-c&w=64&q=75', '123942389')
        RETURNING id;
      `);

    const board = await queryRunner.query(
      `
        INSERT INTO board(title, "creatorId", description, adjustable, angles, city, country)
        VALUES ('test', $1, 'test board for testing', FALSE, ARRAY[30], 'Oslo', 'Norway')
        RETURNING id;
      `,
      [user[0].id]
    );

    await queryRunner.query(
      `
        INSERT INTO layout(title, description, url, "creatorId", "boardId", "publicId")
        VALUES ('testlayout', 'test layout for testing', 'https://res.cloudinary.com/dqyhbqh0x/image/upload/v1632246307/sample.jpg', $1, $2, 'asfd123uiasd')
        RETURNING id;
      `,
      [user[0].id, board[0].id]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "user"
        WHERE name = 'oddtest';
    `);

    await queryRunner.query(`
      DELETE FROM layout
      WHERE title = 'testlayout';
    `);

    await queryRunner.query(`
      DELETE FROM board
      WHERE title = 'test';
    `);
  }
}
