import express from 'express';
import { GoogleLogin } from '../../src/index';
import { GOOGLE_SCOPES } from '../../src/constant';
import { config } from 'dotenv';

config();

const app = express();

const googleLogin = new GoogleLogin({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: process.env.GOOGLE_CALLBACK_URL,
  scope: [...GOOGLE_SCOPES.MINIMAL],
});

app.get('/auth/google', (req, res) => {
  const url = googleLogin.getAuthUrl();
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  res.redirect('http://127.0.0.1:5500/packages/google/__tests__/setup/index.html');
});

const PORT = 8083;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
