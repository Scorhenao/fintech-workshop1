import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FinancialRecord } from './financial-record.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  creditScore!: number;

  @OneToMany(() => FinancialRecord, (record: { user: any; }) => record.user)
  financialRecords: FinancialRecord[] | undefined;
}
