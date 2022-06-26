import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedDeficiencyTableAndRelations1656251098574 implements MigrationInterface {
    name = 'CreatedDeficiencyTableAndRelations1656251098574'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "deficiency" ("id" character varying NOT NULL, "name" character varying NOT NULL, "is_custom" boolean NOT NULL DEFAULT true, "createdBy" character varying NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6e3973239ec280ea528aebe4407" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_deficiencies_deficiency" ("userId" character varying NOT NULL, "deficiencyId" character varying NOT NULL, CONSTRAINT "PK_c40a437acdada46ce04cc753bdf" PRIMARY KEY ("userId", "deficiencyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5d27b7b3e3e75ef88d8c96120c" ON "user_deficiencies_deficiency" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_97b74fe72a58e1c08768b2f9bf" ON "user_deficiencies_deficiency" ("deficiencyId") `);
        await queryRunner.query(`ALTER TABLE "user_deficiencies_deficiency" ADD CONSTRAINT "FK_5d27b7b3e3e75ef88d8c96120cc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_deficiencies_deficiency" ADD CONSTRAINT "FK_97b74fe72a58e1c08768b2f9bf8" FOREIGN KEY ("deficiencyId") REFERENCES "deficiency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_deficiencies_deficiency" DROP CONSTRAINT "FK_97b74fe72a58e1c08768b2f9bf8"`);
        await queryRunner.query(`ALTER TABLE "user_deficiencies_deficiency" DROP CONSTRAINT "FK_5d27b7b3e3e75ef88d8c96120cc"`);
        await queryRunner.query(`DROP INDEX "IDX_97b74fe72a58e1c08768b2f9bf"`);
        await queryRunner.query(`DROP INDEX "IDX_5d27b7b3e3e75ef88d8c96120c"`);
        await queryRunner.query(`DROP TABLE "user_deficiencies_deficiency"`);
        await queryRunner.query(`DROP TABLE "deficiency"`);
    }

}
