import { Injectable } from '@nestjs/common';
import { Microcredit } from '../entities/microcredit.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MicrocreditRegistryService {
  constructor(
    @InjectRepository(Microcredit)
    private microcreditRepository: Repository<Microcredit>,
  ) {}

  saveMicrocredit(microcredit: Microcredit): void {
    this.microcreditRepository.save(microcredit);
  }
}
