import { MigrationInterface, QueryRunner } from "typeorm";

export class AdjustProductandprofilerelation1743007201361 implements MigrationInterface {
    name = 'AdjustProductandprofilerelation1743007201361'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1870c0c44e00242760ba1788e7c"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_1870c0c44e00242760ba1788e7c"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1870c0c44e00242760ba1788e7c" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_1870c0c44e00242760ba1788e7c"`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_1870c0c44e00242760ba1788e7c" UNIQUE ("profileId")`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_1870c0c44e00242760ba1788e7c" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
