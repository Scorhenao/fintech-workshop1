import { Injectable } from '@nestjs/common';
import { UserRepository } from './../repositories/user.repository';
import { Microcredit } from '../entities/microcredit.entity';
import { CreditCalculationService } from './credit-calculation.service';
import { MicrocreditRegistryService } from './microcredit-registry.service';

@Injectable()
export class MicrocreditService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creditCalculationService: CreditCalculationService,
    private readonly microcreditRegistryService: MicrocreditRegistryService
  ) {}

  async applyForMicrocredit(userId: string, amount: number): Promise<Microcredit> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    const interestRate = await this.creditCalculationService.calculateInterestRate(user);
    const microcredit = new Microcredit();
    microcredit.amount = amount;
    microcredit.interestRate = interestRate;
    microcredit.status = 'PENDING';
    microcredit.user = user;

    await this.microcreditRegistryService.saveMicrocredit(microcredit);

    return microcredit;
  }
}
