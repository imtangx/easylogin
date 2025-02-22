import nodemailer from 'nodemailer';
import { EmailConfig } from '@easylogin/types';
import { EMAIL_TEMPLATES } from './constant';

export class EmailApiService {
  private transporter: nodemailer.Transporter;
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
    this.transporter = nodemailer.createTransport({
      host: this.config.host,
      port: this.config.port,
      secure: this.config.port === 465, // SSL
      auth: {
        user: this.config.user,
        pass: this.config.authCode,
      },
    });
  }

  /**
   * 发送验证码邮件
   * @param to 目标邮箱
   * @param code 验证码
   * @returns 是否发送成功
   */

  async sendVerifyCode(to: string, code: string): Promise<boolean> {
    try {
      await this.transporter.sendMail({
        from: this.config.from,
        to,
        subject: EMAIL_TEMPLATES.VERIFY_CODE.subject,
        html: EMAIL_TEMPLATES.VERIFY_CODE.html(code),
      });
      return true;
    } catch (error: any) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}
