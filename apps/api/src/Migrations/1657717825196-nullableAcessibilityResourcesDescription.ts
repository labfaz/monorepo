import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableAcessibilityResourcesDescription1657717825196 implements MigrationInterface {
    name = 'nullableAcessibilityResourcesDescription1657717825196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "acessibilityResourcesDescription"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "accessibility_resources_description" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "acessibilityResourcesDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "accessibility_resources_description"`);
    }

}
