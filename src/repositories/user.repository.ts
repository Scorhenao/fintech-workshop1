import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository extends Repository<User> {
  async findById(userId: string): Promise<User | null> {
    return this.findOne({ where: { id: userId } });
  }
}
