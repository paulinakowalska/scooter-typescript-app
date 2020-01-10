import {MigrationInterface, QueryRunner} from "typeorm";

export class newPropertiesMigration1578584167152 implements MigrationInterface {
    name = 'newPropertiesMigration1578584167152'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "mail" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "phoneNumber" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "scooter" ADD "model" character varying(100) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "scooter" ADD "status" character varying(100) NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "scooter" DROP COLUMN "status"`, undefined);
        await queryRunner.query(`ALTER TABLE "scooter" DROP COLUMN "model"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phoneNumber"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "mail"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`, undefined);
    }

}
