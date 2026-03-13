import { Injectable } from '@nestjs/common';
import { Business, VerificationStatus, SubscriptionTier } from './business.entity';

@Injectable()
export class BusinessesService {
  /**
   * Create a new business
   */
  async createBusiness(ownerId: string, data: any): Promise<Business> {
    // TODO: Implement with TypeORM repository
    const business = new Business();
    business.ownerId = ownerId;
    business.name = data.name;
    business.categoryId = data.categoryId;
    business.address = data.address;
    business.city = data.city;
    business.verificationStatus = VerificationStatus.PENDING;
    business.subscriptionTier = SubscriptionTier.FREE;

    return business;
  }

  /**
   * Get business by ID
   */
  async getBusinessById(businessId: string): Promise<Business> {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Get business by owner ID
   */
  async getBusinessByOwnerId(ownerId: string): Promise<Business[]> {
    // TODO: Implement with TypeORM repository
    return [];
  }

  /**
   * Update business profile
   */
  async updateBusiness(businessId: string, updates: Partial<Business>) {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Submit verification documents
   */
  async submitVerification(businessId: string, docUrls: string[]) {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Get pending businesses (for admin)
   */
  async getPendingBusinesses(limit = 20, offset = 0) {
    // TODO: Implement with TypeORM repository
    return { data: [], total: 0 };
  }

  /**
   * Approve business (for admin)
   */
  async approveBusiness(businessId: string) {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Reject business (for admin)
   */
  async rejectBusiness(businessId: string, reason: string) {
    // TODO: Implement with TypeORM repository
    return null;
  }
}
