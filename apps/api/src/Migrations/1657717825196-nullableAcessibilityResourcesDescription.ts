import {MigrationInterface, QueryRunner} from "typeorm";

export class nullableAcessibilityResourcesDescription1657717825196 implements MigrationInterface {
    name = 'nullableAcessibilityResourcesDescription1657717825196'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "acessibilityResourcesDescription" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "artist"."acessibilityResourcesDescription" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "artist"."acessibilityResourcesDescription" IS NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ALTER COLUMN "acessibilityResourcesDescription" SET NOT NULL`);
    }

}
