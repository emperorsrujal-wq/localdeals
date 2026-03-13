import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum FlyerStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  SCHEDULED = 'scheduled',
  EXPIRED = 'expired',
  PAUSED = 'paused',
}

@Entity('flyers')
export class Flyer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  businessId: string;

  @Column({ type: 'uuid', nullable: true })
  templateId: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  flyerUrl: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountedPrice: number;

  @Column({ type: 'timestamp' })
  validFrom: Date;

  @Column({ type: 'timestamp' })
  validUntil: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  couponCode: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column({ type: 'enum', enum: FlyerStatus, default: FlyerStatus.DRAFT })
  status: FlyerStatus;

  @Column({ type: 'timestamp', nullable: true })
  publishedAt: Date;

  @Column({ type: 'integer', default: 1 })
  targetRadius: number; // in km

  @Column({ type: 'integer', default: 0 })
  views: number;

  @Column({ type: 'integer', default: 0 })
  saves: number;

  @Column({ type: 'integer', default: 0 })
  shares: number;

  @Column({ type: 'integer', default: 0 })
  clicks: number;

  @Column({ type: 'jsonb', nullable: true })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
