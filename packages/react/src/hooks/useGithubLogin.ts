import { useEffect } from 'react';
import { GithubLogin } from '@easylogin/github';
import { GithubConfig, GithubLoginResult } from '@easylogin/types';

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
