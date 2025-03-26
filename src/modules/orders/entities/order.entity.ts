import { IsJSON, IsNumber } from 'class-validator';
import { ORDER_STATUS } from 'src/common/constants/orders';
import { TABLES } from 'src/common/constants/tables';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES.ORDERS)
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'jsonb' })
  @IsJSON()
  items: any;

  @Column({ default: ORDER_STATUS.PENDING })
  order_status: string;

  @Column()
  trx_number: string;

  @Column()
  @IsNumber()
  amount: number;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  trx_expiry: Date;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  updated_at: Date;
}
