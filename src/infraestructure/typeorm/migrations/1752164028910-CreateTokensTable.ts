import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTokensTable1752164028910 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryRunner.query(`
      CREATE TABLE "tokens" (
        "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        "secret" varchar NOT NULL,
        "expiration_time" varchar NOT NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "tokens";`);
  }
}