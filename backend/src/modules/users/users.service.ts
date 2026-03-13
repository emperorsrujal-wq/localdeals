import { Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  /**
   * Create a new user
   */
  async createUser(email: string, phone: string, fullName: string, role: UserRole) {
    // TODO: Implement with TypeORM repository
    const user = new User();
    user.email = email;
    user.phone = phone;
    user.fullName = fullName;
    user.role = role;
    user.isActive = true;

    return user;
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User> {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<User> {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<User>) {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Update user location
   */
  async updateUserLocation(userId: string, lat: number, lng: number) {
    // TODO: Implement with TypeORM repository
    return null;
  }

  /**
   * Save FCM token for push notifications
   */
  async saveFcmToken(userId: string, fcmToken: string) {
    // TODO: Implement with TypeORM repository
    return null;
  }
}
