import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Microcredit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column('decimal')
  amount: number;

  @Column('decimal')
  interestRate: number;

  @Column()
  status: string;
}
