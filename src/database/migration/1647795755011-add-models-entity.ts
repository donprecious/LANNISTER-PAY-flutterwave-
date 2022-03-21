import {MigrationInterface, QueryRunner} from "typeorm";

export class addModelsEntity1647795755011 implements MigrationInterface {
    name = 'addModelsEntity1647795755011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ADD "feeId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ADD "feeCurrency" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ADD "entityProperty" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ADD "feeValue" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" DROP COLUMN "feeValue"`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" DROP COLUMN "entityProperty"`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" DROP COLUMN "feeCurrency"`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" DROP COLUMN "feeId"`);
    }

}
