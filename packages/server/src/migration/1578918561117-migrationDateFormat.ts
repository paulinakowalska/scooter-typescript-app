import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationDateFormat1578918561117 implements MigrationInterface {
    name = 'migrationDateFormat1578918561117'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "startDate" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "endDate" TIMESTAMP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "endDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "endDate" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "startDate"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" ADD "startDate" character varying NOT NULL`, undefined);
    }

}
