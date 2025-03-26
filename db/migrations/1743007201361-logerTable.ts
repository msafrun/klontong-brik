import { MigrationInterface, QueryRunner } from 'typeorm';

export class LogerTable1743007201361 implements MigrationInterface {
  name = 'logerTable1743007201361';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "logs" (
  "id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
  "data" jsonb DEFAULT NULL, 
  "table" character varying DEFAULT NULL, 
  "operation" character varying DEFAULT NULL,
  "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "logs"`);
  }
}
