import {MigrationInterface, QueryRunner} from "typeorm";

export class AddArtistMedicalReport1657232759882 implements MigrationInterface {
    name = 'AddArtistMedicalReport1657232759882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medicalReport" ("id" character varying NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "areaId" character varying, CONSTRAINT "PK_ea7cdfd52edbddc8d7352e2a787" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "medicalReport" ADD CONSTRAINT "FK_27e4d236a93a98164af1c610784" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "medicalReport" DROP CONSTRAINT "FK_27e4d236a93a98164af1c610784"`);
        await queryRunner.query(`DROP TABLE "medicalReport"`);
    }

}
