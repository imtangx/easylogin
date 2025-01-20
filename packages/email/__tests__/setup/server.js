import express from 'express';
import { EmailLogin } from '../../src/index';
import { config } from 'dotenv';

config();

const app = express();
// 添加 JSON 解析中间件
app.use(express.json());

const emailLogin = new EmailLogin({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  user: process.env.EMAIL_USER,
  authCode: process.env.EMAIL_AUTH_CODE,
  from: process.env.EMAIL_FROM,
});

//发送验证码
app.get('/auth/email', async (req, res) => {
  const { email } = req.query;

  try {
    const success = await emailLogin.sendCode(email);
    res.json({ success });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ error: '发送验证码失败' });
  }
});

//验证码登录
app.post('/auth/email/login', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    res.status(400).json({ error: '邮箱地址和验证码不能为空' });
    return;
  }

  try {
    const result = await emailLogin.handleCallback(email, code);
    res.json(result);
  } catch (error) {
    console.error('验证码验证失败:', error);
    res.status(500).json({ error: '验证码验证失败' });
  }
});

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
