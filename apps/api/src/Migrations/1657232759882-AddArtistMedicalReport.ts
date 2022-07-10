import {MigrationInterface, QueryRunner} from "typeorm";

export class AddArtistMedicalReport1657232759882 implements MigrationInterface {
    name = 'AddArtistMedicalReport1657232759882'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" ADD "medicalReport" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artist" DROP COLUMN "medicalReport"`);
    }

}
