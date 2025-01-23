import { GiteeConfig, GiteeLoginResult } from '@esaylogin/types';
import { GiteeAuthService } from './auth';
import { GiteeApiService } from './api';

export class GiteeLogin {
  private authService: GiteeAuthService;
  private apiService: GiteeApiService;

  constructor(config: GiteeConfig) {
    if (!config.clientId || !config.clientSecret || !config.callbackUrl || !config.scope) {
      throw new Error('Missing required configuration');
    }
    this.authService = new GiteeAuthService(config);
    this.apiService = new GiteeApiService();
  }

  getAuthUrl(): string {
    return this.authService.getAuthorizeUrl();
  }

  async handleCallback(authCode: string): Promise<GiteeLoginResult> {
    try {
      const authResponse = await this.authService.getAccessToken(authCode);
      const userInfo = await this.apiService.getUserInfo(authResponse.access_token);
      
      return {
        success: true,
        data: {
          userInfo,
          token: authResponse.access_token,
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
