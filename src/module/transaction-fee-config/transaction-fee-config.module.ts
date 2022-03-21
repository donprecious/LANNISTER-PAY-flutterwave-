import { Module } from "@nestjs/common";
import { TransactionFeeService } from "./transaction-fee.service";
import { TransactionFeeController } from "./transaction-fee.controller";
import { SharedModule } from "src/common/module/shared.module";

@Module({
  providers: [TransactionFeeService],
  controllers: [TransactionFeeController],
  imports: [SharedModule],
})
export class TransactionFeeConfigModule {}
