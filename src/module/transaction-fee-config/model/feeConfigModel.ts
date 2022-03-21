import { IsEnum, isEnum } from 'class-validator';
import { FeeLocaleEnum, FeeTypeEnum, FeeEntityEnum } from './../../../common/model/shared.enum';
export class FeeConfigModel {

  feeId: string;
  feeCurrency: string;

  @IsEnum(FeeLocaleEnum)
  feeLocale: string;

  @IsEnum(FeeEntityEnum)
  feeEntity: string;

  entityProperty: string;

  @IsEnum(FeeTypeEnum)
  feeType: string;

  feeValue: string;
}