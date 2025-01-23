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

export interface GiteeConfig {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  scope: string[];
}

export interface GiteeAuthResponse {
  access_token: string;
  token_type: string;
}

export interface GiteeUserInfo {
  id: number;
  login: string;
  name: string;
  email: string;
  avatar_url: string;
}

export interface GiteeLoginResult {
  success: boolean;
  data?: {
    userInfo: GiteeUserInfo;
    token: string;
  };
  error?: string;
}

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  authCode: string;
  from: string;
}

export interface EmailVerifyCodeRecord {
  code: string;
  expireAt: number; // 过期时间戳
  attempts: number; // 尝试次数
}

export interface EmailLoginResult {
  success: boolean;
  data?: {
    email: string;
    token: string; // JWT token
  };
  error?: string;
}
