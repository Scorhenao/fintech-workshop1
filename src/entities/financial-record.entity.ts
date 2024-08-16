import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FinancialRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('date')
  date: string;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => User, user => user.financialRecords)
  user: User;
}
