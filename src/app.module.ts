
import { configConstant } from "./common/constants/config.constant";
import { Module } from "@nestjs/common";
import { ConfigService, ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./common/module/shared.module";
import { SentryModule } from "@ntegral/nestjs-sentry";
import { TransactionFeeConfigModule } from "./module/transaction-fee-config/transaction-fee-config.module";




@Module({
  imports: [
    ConfigModule.forRoot(),
    SentryModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => {
        return {
          dsn: ConfigService.get(configConstant.sentry.dsn),
          debug: true,
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: "postgres",
          host: configService.get(configConstant.database.host),
          port: +configService.get<number>(configConstant.database.port),
          username: configService.get(configConstant.database.username),
          password: configService.get(configConstant.database.password),
          database: configService.get(configConstant.database.name),
          entities: [__dirname + "/**/*.entity{.ts,.js}"],
          synchronize: false,
          logging: true,
        };
      },
      inject: [ConfigService],
    }),
    SharedModule,
    TransactionFeeConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
