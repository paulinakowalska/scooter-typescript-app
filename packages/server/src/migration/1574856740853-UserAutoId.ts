import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAutoId1574856740853 implements MigrationInterface {
    name = 'UserAutoId1574856740853';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`, undefined);
        await queryRunner.query(`CREATE SEQUENCE "user_id_seq" OWNED BY "user"."id"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq')`, undefined);
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_01cd2b829e0263917bf570cb672"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`, undefined);
        await queryRunner.query(`DROP SEQUENCE "user_id_seq"`, undefined);
        await queryRunner.query(
            `ALTER TABLE "event" ADD CONSTRAINT "FK_01cd2b829e0263917bf570cb672" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
            undefined,
        );
    }
}
