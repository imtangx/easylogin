import { useEffect } from 'react';
import { GithubLogin } from '@esaylogin/github';
import { GithubConfig, GithubLoginResult } from '@esaylogin/types';

export const useGithubLogin = (config: GithubConfig) => {
  const githubLogin = new GithubLogin(config);

  const login = () => {
    const authUrl = githubLogin.getAuthUrl();
    window.location.href = authUrl;
  };

  return {
    login,
  };
};
