import {MigrationInterface, QueryRunner} from "typeorm";

export class CascadeDelAscents1632917497873 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.query(`
        ALTER TABLE "ascent" 
        DROP CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c";
        `)
        await queryRunner.query(`
        ALTER TABLE "ascent" 
        ADD CONSTRAINT "FK_3a23db094da0d02f0b68d579b2c" 
        FOREIGN KEY ("problemId") REFERENCES "problem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
