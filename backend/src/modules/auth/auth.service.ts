import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FirebaseService } from '../../firebase/firebase.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private firebaseService: FirebaseService,
  ) {}

  /**
   * Verify Firebase token and create JWT session
   */
  async verifyFirebaseToken(firebaseToken: string) {
    try {
      const decodedToken = await this.firebaseService.verifyIdToken(firebaseToken);
      const userId = decodedToken.uid;
      const email = decodedToken.email;

      // Create JWT token for API
      const jwtToken = this.jwtService.sign({
        sub: userId,
        email: email,
        firebaseUid: userId,
      });

      return {
        userId,
        email,
        jwtToken,
      };
    } catch (error) {
      throw new Error(`Firebase token verification failed: ${error.message}`);
    }
  }

  /**
   * Create JWT token
   */
  createJwtToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  /**
   * Verify JWT token
   */
  verifyJwtToken(token: string) {
    return this.jwtService.verify(token);
  }
}
