import { TransactionPayloadDto, TransactionFeeComputeDto } from './model/transactionPayload.dto';
import { TransactionFeeConfigurations } from './../../entities/TransactionFeeConfigurations.entity';
import { FeeLocaleEnum, FeeTypeEnum } from './../../common/model/shared.enum';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { FeeEntityEnum } from 'src/common/model/shared.enum';
import { FeeConfigModel } from './model/feeConfigModel';
import { TransactionFeeRepository } from './transactionFeeRepository.repository';
import { Any, In } from 'typeorm';

@Injectable()
export class TransactionFeeService {
  /**
   *
   */
  constructor(private transactionFeeRepo: TransactionFeeRepository) {}
  async processFeeConfiguration(feeConfig: string): Promise<FeeConfigModel[]> {
    const fees = feeConfig.split("\n");
    const feeModels: FeeConfigModel[] = [];
    for (const fee of fees) {
      const model = this.extractFeeData(fee);
      feeModels.push(model);
    }
    const validate = await this.validateFeeModel(feeModels);
    if (validate.length > 0) {
      throw new BadRequestException(
        validate,
        "error validating fee configurations"
      );
    }
    await this.saveFee(feeModels);
    return feeModels;
  }

  async computeFee(
    transactionPayload: TransactionPayloadDto
  ): Promise<TransactionFeeComputeDto> {
    const feeLocale =
      transactionPayload.CurrencyCountry ==
      transactionPayload.PaymentEntity.Country
        ? FeeLocaleEnum.LOCL
        : FeeLocaleEnum.INTL;
    const feeEntity = transactionPayload.PaymentEntity.Type
      ? transactionPayload.PaymentEntity.Type
      : FeeEntityEnum.ANY;
    const entityProperty = [
      transactionPayload.PaymentEntity.ID,
      transactionPayload.PaymentEntity.Brand,
      transactionPayload.PaymentEntity.Issuer,
      transactionPayload.PaymentEntity.SixID,
      transactionPayload.PaymentEntity.Number,
      "*",
    ];
    const getFees = await this.transactionFeeRepo.findOne({
      where: [
        {
          feeLocale: feeLocale,
          feeEntity: feeEntity,
          entityProperty: Any(entityProperty),
        }
      ],
    });
      if (!getFees) {
          throw new NotFoundException({
            Error: "No fee configuration for USD transactions."
          } as TransactionFeeComputeDto) 
      }
    let fee = 0;
    const feeType = getFees.feeType;
    if (feeType == FeeTypeEnum.FLAT) {
      fee = Number(getFees.feeValue);
    } else if (feeType == FeeTypeEnum.PERC) {
      fee = (Number(getFees.feeValue) * transactionPayload.Amount) / 100;
    } else if (feeType == FeeTypeEnum.FLAT_PERC) {
      const fees = getFees.feeValue.split(":");
      const flatFee = fees[0];
      const percentFee = fees[1];
      fee =
        (Number(percentFee) * transactionPayload.Amount) / 100 +
        Number(flatFee);
    }
    const chargedAmount = transactionPayload.Amount + fee;
    const settlementAmount = transactionPayload.Amount;
    const response = {
      AppliedFeeID: getFees.feeId,
      AppliedFeeValue: fee,
      ChargeAmount: chargedAmount,
      SettlementAmount: settlementAmount,
    } as TransactionFeeComputeDto;
    return response;
  }

  private extractFeeData(singleLineFeeConfig: string): FeeConfigModel {
    const feeArr = singleLineFeeConfig.split(" ");
    const feeModel = {} as FeeConfigModel;

    feeModel.feeId = feeArr[0];
    feeModel.feeCurrency = feeArr[1];
    feeModel.feeLocale = feeArr[2];

    const feeEntityData = feeArr[3].split("(");
    feeModel.feeEntity = feeEntityData[0];
    const feeEntityProperty = feeEntityData[1].slice(0, -1);
    feeModel.entityProperty = feeEntityProperty;

    feeModel.feeType = feeArr[6];
    feeModel.feeValue = feeArr[7];
    return feeModel;
  }

  async validateFeeModel(
    feeConfigs: FeeConfigModel[]
  ): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];
    for (const feeconfig of feeConfigs) {
      const result = await validate(feeconfig);

      errors.push(...result);
    }
    return errors;
  }

  private async saveFee(feeConfigModels: FeeConfigModel[]) {
    for (const feeModel of feeConfigModels) {
      const findFee = await this.transactionFeeRepo.findOne({
        where: { feeId: feeModel.feeId },
      });
      if (findFee) {
        continue;
      }
      const fee = feeModel as TransactionFeeConfigurations;

      const feeConfigModel = this.transactionFeeRepo.create(fee);
      await this.transactionFeeRepo.save(feeConfigModel);
    }
  }
}
