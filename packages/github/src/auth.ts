import axios from 'axios';
import { GithubConfig, GithubAuthResponse } from '@esaylogin/types';
import { GITHUB_ENDPOINTS } from './constant';

export class GithubAuthService {
  private config: GithubConfig;

  constructor(config: GithubConfig) {
    this.config = config;
  }

  getAuthorizeUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.callbackUrl,
      scope: this.config.scope.join(' '),
      response_type: 'code', 
    });
    return `${GITHUB_ENDPOINTS.AUTHORIZE}?${params.toString()}`;
  }

  async getAccessToken(code: string): Promise<GithubAuthResponse> {
    try {
      const response = await axios.post(
        GITHUB_ENDPOINTS.ACCESS_TOKEN,
        {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code,
          redirect_uri: this.config.callbackUrl,
        },
        {
          headers: {
            Accept: 'application/json',
          },
          timeout: 5000,
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }
}
