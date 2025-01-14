export interface GithubConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope: string[]; //权限范围
}

export interface GithubUserInfo {
  id: string;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

// 授权响应
export interface GithubAuthResponse {
  access_token: string;
  token_type: string;
}

// 登录结果
export interface GithubLoginResult {
  success: boolean;
  data?: {
    userInfo: GithubUserInfo;
    token: string; // 访问令牌
  };
  error?: string;
}
