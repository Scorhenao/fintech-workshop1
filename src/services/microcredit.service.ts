import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { MicrocreditRepository } from '../repositories/microcredit.repository';
import { CreditCalculationService } from './credit-calculation.service';
import { User } from '../entities/user.entity';
import { Microcredit } from '../entities/microcredit.entity';

@Injectable()
export class MicrocreditService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creditCalculationService: CreditCalculationService,
    private readonly microcreditRepository: MicrocreditRepository
  ) {}

  async applyForMicrocredit(userId: string, amount: number): Promise<Microcredit> {
    const user = await this.userRepository.findOne(userId);
    if (!user) throw new Error('User not found');
    
    const interestRate = this.creditCalculationService.calculateInterestRate(user);
    const microcredit = new Microcredit();
    microcredit.userId = userId;
    microcredit.amount = amount;
    microcredit.interestRate = interestRate;
    microcredit.status = 'PENDING';

    return this.microcreditRepository.save(microcredit);
  }
}
