import { EmailConfig, EmailLoginResult, EmailVerifyCodeRecord } from '@esaylogin/types';
import { VERIFY_CODE } from './constant';

export class EmailAuthService {
  private verifyCodeMap: Map<string, EmailVerifyCodeRecord>;
  private lastSendMap: Map<string, number>;

  constructor() {
    this.verifyCodeMap = new Map();
    this.lastSendMap = new Map();
  }

  /**
   * 生成随机验证码
   * @returns 验证码
   */
  private generateCode(): string {
    return Math.random().toString().slice(-VERIFY_CODE.LENGTH);
  }

  /**
   * 创建验证码
   * @param email 邮箱地址
   * @returns 验证码
   */
  async createVerifyCode(email: string): Promise<string> {
    const lastSendTime = this.lastSendMap.get(email) || 0;
    if (Date.now() - lastSendTime < VERIFY_CODE.MAX_RETRY_TIME) {
      throw new Error('发送过于频繁，请稍后再试');
    }
    const code = this.generateCode();
    this.verifyCodeMap.set(email, {
      code,
      expireAt: Date.now() + VERIFY_CODE.EXPIRE_TIME,
      attempts: 0,
    });
    this.lastSendMap.set(email, Date.now());
    return code;
  }

  /**
   * 验证验证码
   * @param email 邮箱地址
   * @param code 验证码
   * @returns 验证结果
   */
  verify(email: string, code: string): EmailLoginResult {
    const record = this.verifyCodeMap.get(email);
    if (!record) {
      return {
        success: false,
        error: '验证码不存在',
      };
    }

    if (record.expireAt < Date.now()) {
      this.verifyCodeMap.delete(email);
      return {
        success: false,
        error: '验证码已过期',
      };
    }

    if (record.attempts >= VERIFY_CODE.MAX_ATTEMPTS) {
      this.verifyCodeMap.delete(email);
      return {
        success: false,
        error: '验证码尝试次数过多',
      };
    }

    record.attempts++;

    if (record.code !== code) {
      return {
        success: false,
        error: '验证码错误',
      };
    }

    this.verifyCodeMap.delete(email);

    return {
      success: true,
      data: {
        email,
        token: 'jwt-token', // TODO: 实现JWT生成
      },
    };
  }
}
