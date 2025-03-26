import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableOrder1743013996498 implements MigrationInterface {
    name = 'AlterTableOrder1743013996498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "items" jsonb NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "items"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "items" character varying NOT NULL`);
    }

}
