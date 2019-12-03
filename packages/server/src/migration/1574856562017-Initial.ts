import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1574856562017 implements MigrationInterface {
    name = 'Initial1574856562017';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
            `CREATE TABLE "user" ("id" integer NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "scooter" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, CONSTRAINT "PK_d34b48695ebd552222c6e8ec675" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "startDate" character varying NOT NULL, "endDate" character varying NOT NULL, "userId" integer, "scooterId" integer, CONSTRAINT "REL_01cd2b829e0263917bf570cb67" UNIQUE ("userId"), CONSTRAINT "REL_9c2eedfb6ff0b7f1358a678c36" UNIQUE ("scooterId"), CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_9c2eedfb6ff0b7f1358a678c36e" FOREIGN KEY ("scooterId") REFERENCES "scooter"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_9c2eedfb6ff0b7f1358a678c36e"`, undefined);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`, undefined);
        await queryRunner.query(`DROP TABLE "event"`, undefined);
        await queryRunner.query(`DROP TABLE "scooter"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
    }
}
