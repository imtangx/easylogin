import axios from 'axios';
import { GiteeConfig, GiteeAuthResponse } from '@easylogin/types';
import { GITEE_ENDPOINTS } from './constant';

export class GiteeAuthService {
  private config: GiteeConfig;

  constructor(config: GiteeConfig) {
    this.config = config;
  }

  getAuthorizeUrl(): string {
    const params = new URLSearchParams({
      client_id: this.config.clientId,
      redirect_uri: this.config.callbackUrl,
      scope: this.config.scope.join('+'),
      response_type: 'code',
    });
    return `${GITEE_ENDPOINTS.AUTHORIZE}?${params.toString()}`;
  }

  async getAccessToken(authCode: string): Promise<GiteeAuthResponse> {
    try {
      const response = await axios.post(
        GITEE_ENDPOINTS.ACCESS_TOKEN,
        {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: authCode,
          redirect_uri: this.config.callbackUrl,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            Accept: 'application/json',
          },
          timeout: 15000,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }
}
