import { User } from '../entities/user.entity';

export interface InterestRateStrategy {
  calculate(user: User): number;
}
