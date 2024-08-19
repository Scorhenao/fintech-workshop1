import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Microcredit } from './entities/microcredit.entity';
import { MicrocreditService } from './services/microcredit.service';
import { CreditCalculationService } from './services/credit-calculation.service';
import { MicrocreditRegistryService } from './services/microcredit-registry.service';
import { StandardInterestRateStrategy } from './strategies/standard-interest-rate.strategy';
import { UserRepository } from './repositories/user.repository'; // Asegúrate de importar el repositorio aquí

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'fintech',
      entities: [User, Microcredit],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Microcredit, UserRepository]), // Incluye UserRepository aquí
  ],
  providers: [
    MicrocreditService,
    CreditCalculationService,
    MicrocreditRegistryService,
    StandardInterestRateStrategy,
  ],
})
export class AppModule {}
