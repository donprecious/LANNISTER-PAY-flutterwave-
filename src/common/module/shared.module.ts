import { TransactionFeeRepository } from './../../module/transaction-fee-config/transactionFeeRepository.repository';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const typeORMFeature = TypeOrmModule.forFeature([
  TransactionFeeRepository
]);
@Module({
  imports: [typeORMFeature, ConfigModule],
  exports: [typeORMFeature, ConfigModule],
})
export class SharedModule {}
