import express from 'express';
import { GiteeLogin } from '../../src/index';
import { GITEE_SCOPES } from '../../src/constant';
import { config } from 'dotenv';

config();

const app = express();

const giteeLogin = new GiteeLogin({
  clientId: process.env.GITEE_CLIENT_ID,
  clientSecret: process.env.GITEE_CLIENT_SECRET,
  callbackUrl: process.env.GITEE_CALLBACK_URL,
  scope: [...GITEE_SCOPES.MINIMAL],
});

app.get('/auth/gitee', (req, res) => {
  const url = giteeLogin.getAuthUrl();
  res.redirect(url);
});

app.get('/auth/gitee/callback', async (req, res) => {
  const { code: authCode } = req.query;

  if (!authCode || typeof authCode !== 'string') {
    res.status(400).json({ error: 'Invalid authCode' });
    return;
  }

  try {
    const response = await giteeLogin.handleCallback(authCode);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
