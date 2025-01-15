import express from 'express';
import { GithubLogin } from '../../src/index';
import { GITHUB_SCOPES } from '../../src/constant';
import { config } from 'dotenv';

config();

const app = express();

const githubLogin = new GithubLogin({
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackUrl: process.env.GITHUB_CALLBACK_URL,
  scope: [...GITHUB_SCOPES.MINIMAL],
});

app.get('/auth/github', (req, res) => {
  const url = githubLogin.getAuthUrl();
  res.redirect(url);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  if (!code || typeof code !== 'string') {
    res.status(400).json({ error: 'Invalid code' });
    return;
  }

  try {
    const response = await githubLogin.handleCallback(code);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

//测试页面
app.get('/', (req, res) => {
  res.send(`
    <h1>GitHub Login Test</h1>
    <a href="/auth/github">Login with GitHub</a>
  `);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
