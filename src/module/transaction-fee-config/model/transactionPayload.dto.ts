export class TransactionPayloadDto {
  ID: number;
  Amount: number;
  Currency: string;
  CurrencyCountry: string;
  Customer: Customer;
  PaymentEntity: PaymentEntity;
}

export class Customer {
  ID: number;
  EmailAddress: string;
  FullName: string;
  BearsFee: boolean;
}

export class PaymentEntity {
  ID: number;
  Issuer: string;
  Brand: string;
  Number: string;
  SixID: number;
  Type: string;
  Country: string;
}


export class TransactionFeeComputeDto {
  AppliedFeeID: string;
  AppliedFeeValue: number;
  ChargeAmount: number;
  SettlementAmount: number;
  Error: string;
}

