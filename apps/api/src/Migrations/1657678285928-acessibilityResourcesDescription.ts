import {MigrationInterface, QueryRunner} from "typeorm";

export class acessibilityResourcesDescription1657678285928 implements MigrationInterface {
    name = 'acessibilityResourcesDescription1657678285928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course" DROP CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "subscription_date"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "teacherId"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "teacher" text array NOT NULL DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "course" ADD "subscription_start_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "course" ADD "subscription_finish_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "course" ADD "link" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "acessibilityResourcesDescription" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "tags" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."tags" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "tags" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "detail" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."detail" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "detail" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "fonte" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."fonte" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "fonte" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "has_subscription" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."has_subscription" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" TYPE TIMESTAMP WITH TIME ZONE array`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."class_dates" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" SET DEFAULT '{}'`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_75f23983b423a20777e71c12bf3"`);
        await queryRunner.query(`COMMENT ON COLUMN "request"."status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`COMMENT ON COLUMN "request"."courseId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "REL_75f23983b423a20777e71c12bf"`);
        await queryRunner.query(`ALTER TABLE "technical" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "technical" ADD "profession" text`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "cpf" text`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "rg"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "rg" text`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "expedition_department"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "expedition_department" text`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" text`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cep" text`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighbourhood"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "neighbourhood" text`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "number" text`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_75f23983b423a20777e71c12bf3" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_75f23983b423a20777e71c12bf3"`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "number"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "number" integer`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "neighbourhood"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "neighbourhood" character varying`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "cep"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "cep" character varying`);
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "address" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "expedition_department"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "expedition_department" character varying`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "rg"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "rg" character varying`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "cpf"`);
        await queryRunner.query(`ALTER TABLE "artist" ADD "cpf" character varying`);
        await queryRunner.query(`ALTER TABLE "technical" DROP COLUMN "profession"`);
        await queryRunner.query(`ALTER TABLE "technical" ADD "profession" character varying`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "REL_75f23983b423a20777e71c12bf" UNIQUE ("courseId")`);
        await queryRunner.query(`COMMENT ON COLUMN "request"."courseId" IS NULL`);
        await queryRunner.query(`ALTER TABLE "request" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "request"."status" IS NULL`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_75f23983b423a20777e71c12bf3" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."class_dates" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "class_dates" TYPE TIMESTAMP WITH TIME ZONE array`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."has_subscription" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "has_subscription" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "fonte" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."fonte" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "fonte" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "detail" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."detail" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "detail" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "tags" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "course"."tags" IS NULL`);
        await queryRunner.query(`ALTER TABLE "course" ALTER COLUMN "tags" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "acessibilityResourcesDescription"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "link"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "subscription_finish_date"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "subscription_start_date"`);
        await queryRunner.query(`ALTER TABLE "course" DROP COLUMN "teacher"`);
        await queryRunner.query(`ALTER TABLE "course" ADD "teacherId" character varying`);
        await queryRunner.query(`ALTER TABLE "course" ADD "subscription_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "course" ADD CONSTRAINT "FK_3e002f760e8099dd5796e5dc93b" FOREIGN KEY ("teacherId") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
