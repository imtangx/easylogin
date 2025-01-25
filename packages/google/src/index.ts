import { GoogleConfig, GoogleLoginResult } from '@esaylogin/types';
import { GoogleAuthService } from './auth';
import { GoogleApiService } from './api';

export class GoogleLogin {
  private authService: GoogleAuthService;
  private apiService: GoogleApiService;

  constructor(config: GoogleConfig) {
    if (!config.clientId || !config.clientSecret || !config.callbackUrl || !config.scope) {
      throw new Error('Missing required configuration');
    }
    this.authService = new GoogleAuthService(config);
    this.apiService = new GoogleApiService();
  }

  getAuthUrl(): string {
    return this.authService.getAuthorizeUrl();
  }

  async handleCallback(callbackUrl: string): Promise<GoogleLoginResult> {
    try {
      const access_token = this.authService.getAccessToken(callbackUrl);
      const userInfo = this.apiService.getUserInfo(access_token);

      return {
        success: true,
        data: {
          userInfo,
          token: access_token,
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
