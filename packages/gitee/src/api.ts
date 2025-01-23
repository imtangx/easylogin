import axios from 'axios';
import { GiteeUserInfo } from '@esaylogin/types';
import { GITEE_ENDPOINTS } from './constant';

export class GiteeApiService {
  async getUserInfo(accessToken: string): Promise<GiteeUserInfo> {
    try {
      const response = await axios.get(GITEE_ENDPOINTS.USER, {
        params: {
          access_token: accessToken,
        },
        timeout: 15000,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }
}
