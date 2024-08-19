import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class FinancialRecord {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  date!: string;

  @Column('float')
  amount!: number;

  @ManyToOne(() => User, user => user.financialRecords)
  user!: User;
}
