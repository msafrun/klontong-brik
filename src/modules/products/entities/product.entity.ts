import { TABLES } from 'src/common/constants/tables';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Profile } from 'src/modules/profiles/entities/profile.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity(TABLES.PRODUCTS)
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  weight: number;

  @Column()
  image: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true, default: null })
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @ManyToOne(() => Profile, (profile) => profile.id)
  profile: Profile;
}
