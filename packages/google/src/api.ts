import axios from 'axios';
import { GoogleUserInfo } from '@easylogin/types';
import { GOOGLE_ENDPOINTS } from './constant';

export class GoogleApiService {
  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      const response = await axios.get(GOOGLE_ENDPOINTS.USER, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          personFields: 'names,emailAddresses,photos', // 指定需要的字段
        },
        timeout: 15000,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(`Failed to get user info: ${error.message}`);
    }
  }
}
