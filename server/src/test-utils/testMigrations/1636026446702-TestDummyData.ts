import { MigrationInterface, QueryRunner } from 'typeorm';
const coordinates = [
  {
    x: 200,
    y: 150,
    color: 'red',
  },
  {
    x: 100,
    y: 180,
    color: 'green',
  },
  {
    x: 80,
    y: 200,
    color: 'blue',
  },
];
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

    const layout = await queryRunner.query(
      `
        INSERT INTO layout(title, description, url, "creatorId", "boardId", "publicId")
        VALUES ('testlayout', 'test layout for testing', 'https://res.cloudinary.com/dqyhbqh0x/image/upload/v1632246307/sample.jpg', $1, $2, 'asfd123uiasd')
        RETURNING id;
      `,
      [user[0].id, board[0].id]
    );

    await queryRunner.query(
      `
        INSERT INTO problem(title, rules, grade, coordinates, "creatorId", "boardId", "layoutId", angle)
        VALUES ('testproblem', 'test problem for testing', 3, $1::jsonb[], $2, $3, $4, 40)
        RETURNING id;
      `,
      [coordinates, user[0].id, board[0].id, layout[0].id]
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
