export const GITEE_ENDPOINTS = {
  AUTHORIZE: 'https://gitee.com/oauth/authorize',
  ACCESS_TOKEN: 'https://gitee.com/oauth/token',
  USER: 'https://gitee.com/api/v5/user',
} as const;

export const GITEE_SCOPES = {
  MINIMAL: ['user_info'] as const,
  STANDARD: ['user_info', 'projects'] as const,
  FULL: ['user_info', 'projects', 'pull_requests'] as const,
} as const;
