import { GithubAuthService } from './auth';
import { GithubApiService } from './api';
import { GithubConfig, GithubLoginResult } from '@esaylogin/types';

export class GithubLogin {
  private authService: GithubAuthService;
  private apiService: GithubApiService;

  constructor(config: GithubConfig) {
    if (!config.clientId || !config.clientSecret || !config.callbackUrl) {
      throw new Error('Missing required configuration');
    }
    this.authService = new GithubAuthService(config);
    this.apiService = new GithubApiService(); 
  }

  getAuthUrl(): string {
    return this.authService.getAuthorizeUrl();
  }

  async handleCallback(code: string): Promise<GithubLoginResult> {
    try {
      const authResponse = await this.authService.getAccessToken(code);
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
