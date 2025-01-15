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

  if (!email) {
    res.status(400).json({ error: '邮箱地址不能为空' });
    return;
  }

  try {
    const success = await emailLogin.sendCode(email);
    res.json({ success });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ error: '发送验证码失败' });
  }
});

//验证码登录
app.post('/auth/email/callback', async (req, res) => {
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

// 测试页面
app.get('/', (req, res) => {
  res.send(`
    <h1>Email Login Test</h1>
    <div>
      <h2>发送验证码</h2>
      <input type="email" id="email" placeholder="请输入邮箱">
      <button onclick="sendCode()">发送验证码</button>
    </div>
    <div style="margin-top: 20px;">
      <h2>验证登录</h2>
      <input type="text" id="code" placeholder="请输入验证码">
      <button onclick="verify()">验证登录</button>
    </div>
    <div id="result" style="margin-top: 20px;"></div>

    <script>
    async function sendCode() {
      const email = document.getElementById('email').value;
      try {
        const res = await fetch('/auth/email?email=' + encodeURIComponent(email), {
          method: 'GET'
        });
        const data = await res.json();
        document.getElementById('result').innerText = 
          data.success ? '验证码发送成功' : '验证码发送失败：' + data.error;
      } catch (error) {
        document.getElementById('result').innerText = '发送失败：' + error;
      }
    }

    async function verify() {
      const email = document.getElementById('email').value;
      const code = document.getElementById('code').value;
      try {
        const res = await fetch('/auth/email/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, code })
        });
        const data = await res.json();
        document.getElementById('result').innerText = 
          data.success ? '登录成功！' : '登录失败：' + data.error;
      } catch (error) {
        document.getElementById('result').innerText = '验证失败：' + error;
      }
    }
    </script>
  `);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});