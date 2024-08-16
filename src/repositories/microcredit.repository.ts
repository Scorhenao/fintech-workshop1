import { EntityRepository, Repository } from 'typeorm';
import { Microcredit } from '../entities/microcredit.entity';

@EntityRepository(Microcredit)
export class MicrocreditRepository extends Repository<Microcredit> {}
