import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Microcredit {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('float')
  amount!: number;

  @Column('float')
  interestRate!: number;

  @Column()
  status!: string;

  @ManyToOne(() => User, user => user.financialHistory)
  user!: User;
}
