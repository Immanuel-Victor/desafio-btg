import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateExpirationTimeColumn1752254449886 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "tokens"
        ALTER COLUMN "expiration_time" TYPE timestamp
        USING "expiration_time"::timestamp;
    `);
  }
  
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "tokens"
        ALTER COLUMN "expiration_time" TYPE varchar
        USING "expiration_time"::varchar;
    `);
  }
}
