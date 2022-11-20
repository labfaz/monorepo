import {MigrationInterface, QueryRunner} from "typeorm";

export class Sync1668882127674 implements MigrationInterface {
    name = 'Sync1668882127674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD IF NOT EXISTS "medicalReport" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" TYPE TIMESTAMP WITH TIME ZONE array`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."class_dates" IS NULL`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN IF EXISTS "accessibility_resources_description"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD IF NOT EXISTS "accessibility_resources_description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "accessibility_resources_description"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "accessibility_resources_description" text`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."class_dates" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" TYPE TIMESTAMP WITH TIME ZONE array`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "medicalReport"`);
    }

}
