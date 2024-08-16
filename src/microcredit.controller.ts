import { Controller, Post, Body } from '@nestjs/common';
import { MicrocreditService } from './services/microcredit.service';
import { Microcredit } from './entities/microcredit.entity';

@Controller('microcredits')
export class MicrocreditController {
  constructor(private readonly microcreditService: MicrocreditService) {}

  @Post()
  async apply(@Body() body: { userId: string, amount: number }): Promise<Microcredit> {
    return this.microcreditService.applyForMicrocredit(body.userId, body.amount);
  }
}
