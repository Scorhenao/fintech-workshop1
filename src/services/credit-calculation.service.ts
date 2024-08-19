import { Injectable } from '@nestjs/common';
import { InterestRateStrategy } from '../interfaces/interest-rate-strategy.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class CreditCalculationService {
  constructor(private readonly strategy: InterestRateStrategy) {}

  calculateInterestRate(user: User): number {
    return this.strategy.calculate(user);
  }
}
