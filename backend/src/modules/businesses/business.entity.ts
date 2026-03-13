import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected',
}

export enum SubscriptionTier {
  FREE = 'free',
  STARTER = 'starter',
  PRO = 'pro',
  ENTERPRISE = 'enterprise',
}

@Entity('businesses')
export class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  ownerId: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'uuid' })
  categoryId: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 100 })
  city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  state: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  zipCode: string;

  @Column({ type: 'varchar', length: 50, default: 'US' })
  country: string;

  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  location: any;

  @Column({ type: 'varchar', length: 20, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  website: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverUrl: string;

  @Column({ type: 'jsonb', nullable: true })
  operatingHours: any;

  @Column({ type: 'enum', enum: VerificationStatus, default: VerificationStatus.PENDING })
  verificationStatus: VerificationStatus;

  @Column({ type: 'jsonb', nullable: true })
  verificationDocs: string[];

  @Column({ type: 'enum', enum: SubscriptionTier, default: SubscriptionTier.FREE })
  subscriptionTier: SubscriptionTier;

  @Column({ type: 'timestamp', nullable: true })
  subscriptionExpires: Date;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
