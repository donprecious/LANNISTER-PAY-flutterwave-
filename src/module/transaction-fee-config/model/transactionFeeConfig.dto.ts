import { IsNotEmpty } from "class-validator";

export class TransactionFeeConfigDto {
 @IsNotEmpty()
  FeeConfigurationSpec: string
}