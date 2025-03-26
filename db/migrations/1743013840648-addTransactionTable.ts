import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTransactionTable1743013840648 implements MigrationInterface {
    name = 'AddTransactionTable1743013840648'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "items" character varying NOT NULL, "order_status" character varying NOT NULL DEFAULT 'pending', "trx_number" character varying NOT NULL, "amount" integer NOT NULL, "trx_expiry" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
