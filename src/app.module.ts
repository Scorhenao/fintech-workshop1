import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user.repository';
import { MicrocreditRepository } from './repositories/microcredit.repository';
import { CreditCalculationService } from './services/credit-calculation.service';
import { MicrocreditService } from './services/microcredit.service';
import { StandardInterestRateStrategy } from './strategies/standard-interest-rate.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Rlwl2023.', // Cambia esto por tu contraseña
      database: 'microcredit_db',
      entities: [__dirname + '/entities/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserRepository, MicrocreditRepository]),
  ],
  providers: [
    CreditCalculationService,
    MicrocreditService,
    {
      provide: 'INTEREST_RATE_STRATEGY',
      useClass: StandardInterestRateStrategy, // Cambiar a PremiumInterestRateStrategy para probar
    },
  ],
})
export class AppModule {}
