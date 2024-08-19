import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FinancialRecord } from './financial-record.entity';
import { Microcredit } from './microcredit.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column('float')
  creditScore!: number;

  @OneToMany(() => FinancialRecord, financialRecord => financialRecord.user)
  financialRecords!: FinancialRecord[];

  @OneToMany(() => Microcredit, microcredit => microcredit.user)
  financialHistory!: Microcredit[];
}
