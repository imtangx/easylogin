import axios from 'axios';
import { GithubUserInfo } from '@easylogin/types';
import { GITHUB_ENDPOINTS } from './constant';

export class GithubApiService {
  async getUserInfo(accessToken: string): Promise<GithubUserInfo> {
    try {
      const response = await axios.get(GITHUB_ENDPOINTS.USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
        timeout: 15000,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }
}
