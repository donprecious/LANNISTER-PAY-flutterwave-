import { TransactionFeeConfigurations } from "src/entities/TransactionFeeConfigurations.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TransactionFeeConfigurations)
export class TransactionFeeRepository extends Repository<TransactionFeeConfigurations> {}
