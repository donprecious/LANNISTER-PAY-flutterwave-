import { SharedEntity } from '../common/model/sharedEntity';
import { FeeLocaleEnum, FeeEntityEnum, FeeTypeEnum } from './../common/model/shared.enum';

import {Column, Entity} from "typeorm";

@Entity()
export class TransactionFeeConfigurations extends SharedEntity {
  @Column()
  feeId: string;

  @Column()
  feeCurrency: string;

  @Column({
    type: "enum",
    enum: FeeLocaleEnum,
  })
  feeLocale: FeeLocaleEnum;

  @Column({
    type: "enum",
    enum: FeeEntityEnum,
  })
  feeEntity: FeeEntityEnum;

  @Column()
  entityProperty: string;

  @Column({
    type: "enum",
    enum: FeeTypeEnum,
  })
  feeType: FeeTypeEnum;

  @Column()
  feeValue: string;
}
