import { EmailConfig, EmailLoginResult } from '@easylogin/types';
import { EmailApiService } from './api';
import { EmailAuthService } from './auth';

export class EmailLogin {
  private authService: EmailAuthService;
  private apiService: EmailApiService;

  constructor(config: EmailConfig) {
    if (!config.host || !config.port || !config.user || !config.authCode || !config.from) {
      throw new Error('Missing required configuration');
    }
    this.authService = new EmailAuthService();
    this.apiService = new EmailApiService(config);
  }

  /**
   * 发送验证码
   * @param email 邮箱地址
   * @returns 是否发送成功
   */
  async sendCode(email: string): Promise<boolean> {
    try {
      const code = await this.authService.createVerifyCode(email);
      return await this.apiService.sendVerifyCode(email, code);
    } catch (error: any) {
      console.error('Failed to send code:', error);
      return false;
    }
  }

  /**
   * 验证码登录
   * @param email 邮箱地址
   * @param code 验证码
   * @returns 登录结果
   */
  handleCallback(email: string, code: string): EmailLoginResult {
    return this.authService.verify(email, code);
  }
}
