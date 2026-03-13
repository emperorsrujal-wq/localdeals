import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FirebaseService {
  private firebaseApp: admin.app.App;

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase() {
    try {
      // Path to your service account key
      const serviceAccountPath = path.join(
        process.cwd(),
        'firebase-admin-key.json'
      );

      // Check if file exists
      if (!fs.existsSync(serviceAccountPath)) {
        throw new Error(
          `Service account key not found at: ${serviceAccountPath}`
        );
      }

      // Load service account
      const serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, 'utf8')
      );

      // Initialize Firebase Admin SDK
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: serviceAccount.project_id,
      });

      console.log('✅ Firebase Admin SDK initialized successfully');
    } catch (error) {
      console.error('❌ Firebase initialization failed:', error.message);
      throw error;
    }
  }

  /**
   * Get Firebase Authentication instance
   */
  getAuth() {
    return admin.auth(this.firebaseApp);
  }

  /**
   * Get Realtime Database instance
   */
  getDatabase() {
    return admin.database(this.firebaseApp);
  }

  /**
   * Get Cloud Firestore instance
   */
  getFirestore() {
    return admin.firestore(this.firebaseApp);
  }

  /**
   * Get Cloud Storage instance
   */
  getStorage() {
    return admin.storage(this.firebaseApp);
  }

  /**
   * Verify Firebase ID token
   */
  async verifyIdToken(token: string) {
    try {
      return await this.getAuth().verifyIdToken(token);
    } catch (error) {
      throw new Error(`Token verification failed: ${error.message}`);
    }
  }

  /**
   * Create custom JWT token for user
   */
  async createCustomToken(uid: string, claims?: object) {
    try {
      return await this.getAuth().createCustomToken(uid, claims);
    } catch (error) {
      throw new Error(`Custom token creation failed: ${error.message}`);
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    try {
      return await this.getAuth().getUserByEmail(email);
    } catch (error) {
      throw new Error(`User not found: ${error.message}`);
    }
  }

  /**
   * Get user by UID
   */
  async getUserByUid(uid: string) {
    try {
      return await this.getAuth().getUser(uid);
    } catch (error) {
      throw new Error(`User not found: ${error.message}`);
    }
  }

  /**
   * Create new user
   */
  async createUser(email: string, password: string, displayName?: string) {
    try {
      return await this.getAuth().createUser({
        email,
        password,
        displayName,
      });
    } catch (error) {
      throw new Error(`User creation failed: ${error.message}`);
    }
  }

  /**
   * Send password reset email
   */
  async sendPasswordResetEmail(email: string) {
    try {
      return await this.getAuth().generatePasswordResetLink(email);
    } catch (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
  }

  /**
   * Send verification email
   */
  async generateEmailVerificationLink(email: string) {
    try {
      return await this.getAuth().generateEmailVerificationLink(email);
    } catch (error) {
      throw new Error(`Verification email generation failed: ${error.message}`);
    }
  }

  /**
   * Set custom claims on user
   */
  async setCustomUserClaims(uid: string, customClaims: object) {
    try {
      return await this.getAuth().setCustomUserClaims(uid, customClaims);
    } catch (error) {
      throw new Error(`Setting custom claims failed: ${error.message}`);
    }
  }

  /**
   * Send OTP to phone
   */
  async sendOtpToPhone(phoneNumber: string) {
    // This requires additional setup with Firebase
    // Will be handled through client SDKs
    throw new Error('OTP sending must be done through client SDK');
  }

  /**
   * Get Firebase app instance
   */
  getApp() {
    return this.firebaseApp;
  }

  /**
   * Health check
   */
  async healthCheck(): Promise<{ status: string }> {
    try {
      await this.getAuth().getUser('health-check-invalid-uid').catch(() => {
        // Expected to fail, just checking connectivity
      });
      return { status: 'ok' };
    } catch (error) {
      return { status: 'error', message: error.message };
    }
  }
}
