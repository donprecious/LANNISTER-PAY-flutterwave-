import {MigrationInterface, QueryRunner} from "typeorm";

export class addedFlatEnumType1647821074117 implements MigrationInterface {
    name = 'addedFlatEnumType1647821074117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."transaction_fee_configurations_feetype_enum" RENAME TO "transaction_fee_configurations_feetype_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."transaction_fee_configurations_feetype_enum" AS ENUM('*', 'PERC', 'FLAT_PERC', 'FLAT')`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ALTER COLUMN "feeType" TYPE "public"."transaction_fee_configurations_feetype_enum" USING "feeType"::"text"::"public"."transaction_fee_configurations_feetype_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_fee_configurations_feetype_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transaction_fee_configurations_feetype_enum_old" AS ENUM('*', 'PERC', 'FLAT_PERC')`);
        await queryRunner.query(`ALTER TABLE "public"."transaction_fee_configurations" ALTER COLUMN "feeType" TYPE "public"."transaction_fee_configurations_feetype_enum_old" USING "feeType"::"text"::"public"."transaction_fee_configurations_feetype_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."transaction_fee_configurations_feetype_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."transaction_fee_configurations_feetype_enum_old" RENAME TO "transaction_fee_configurations_feetype_enum"`);
    }

}
