import { TransactionPayloadDto } from './model/transactionPayload.dto';
import { TransactionFeeConfigDto } from './model/transactionFeeConfig.dto';
import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionFeeService } from './transaction-fee.service';

@ApiTags("transaction-fee")
@Controller("")
export class TransactionFeeController {
  /**
   *
   */
  constructor(private transactionFeeService: TransactionFeeService) {}

  @Post("fee")
  async feeConfig(@Body() transactionFeeConfigDto: TransactionFeeConfigDto) {
    const result = await this.transactionFeeService.processFeeConfiguration(
      transactionFeeConfigDto.FeeConfigurationSpec
    );

    return {
      status: "ok",
    };
  }

  @Post("compute-transaction-fee")
  async computeTransactionFee(
    @Body() transactionPayload: TransactionPayloadDto
  ) {
    const result = await this.transactionFeeService.computeFee(
      transactionPayload
    );
    return result;
  }
}
