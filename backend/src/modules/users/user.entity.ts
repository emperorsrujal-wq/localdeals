import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  CONSUMER = 'consumer',
  BUSINESS_OWNER = 'business_owner',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: true, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 20, nullable: true, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @Column({ type: 'varchar', length: 255 })
  fullName: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatarUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  fcmToken: string;

  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  locationLat: number;

  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  locationLng: number;

  @Column({ type: 'jsonb', nullable: true })
  preferredCategories: string[];

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
