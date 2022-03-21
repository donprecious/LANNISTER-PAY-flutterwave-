import {MigrationInterface, QueryRunner} from "typeorm";

export class transactionFeeEntity1647788106765 implements MigrationInterface {
    name = 'transactionFeeEntity1647788106765'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "transaction_fee_configurations_feelocale_enum" AS ENUM('*', 'LOCL', 'INTL')`);
        await queryRunner.query(`CREATE TYPE "transaction_fee_configurations_feeentity_enum" AS ENUM('*', 'CREDIT-CARD', 'DEBIT-CARD', 'BANK-ACCOUNT', 'USSD', 'WALLET-ID')`);
        await queryRunner.query(`CREATE TYPE "transaction_fee_configurations_feetype_enum" AS ENUM('*', 'PERC', 'FLAT_PERC')`);
        await queryRunner.query(`CREATE TABLE "transaction_fee_configurations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "isActive" boolean NOT NULL DEFAULT true, "createdOn" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedOn" TIMESTAMP, "updatedBy" character varying, "deletedOn" TIMESTAMP WITH TIME ZONE, "deletedBy" character varying, "feeLocale" "transaction_fee_configurations_feelocale_enum" NOT NULL, "feeEntity" "transaction_fee_configurations_feeentity_enum" NOT NULL, "feeType" "transaction_fee_configurations_feetype_enum" NOT NULL, CONSTRAINT "PK_b4c5415a4ebf053509c1119b0b7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transaction_fee_configurations"`);
        await queryRunner.query(`DROP TYPE "transaction_fee_configurations_feetype_enum"`);
        await queryRunner.query(`DROP TYPE "transaction_fee_configurations_feeentity_enum"`);
        await queryRunner.query(`DROP TYPE "transaction_fee_configurations_feelocale_enum"`);
    }

}
