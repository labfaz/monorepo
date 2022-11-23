import {MigrationInterface, QueryRunner} from "typeorm";

export class courseUpdate1669172872201 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "course_type_enum" ADD VALUE 'SESI'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TYPE "course_type_enum"`);
        await queryRunner.query(`CREATE TYPE "course_type_enum" AS ENUM('Curso', 'Live', 'Oficina', 'Roda de conversa')`);
    }

}
