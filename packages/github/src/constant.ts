export const GITHUB_ENDPOINTS = {
  AUTHORIZE: "https://github.com/login/oauth/authorize",
  ACCESS_TOKEN: "https://github.com/login/oauth/access_token",
  USER: "https://api.github.com/user",
} as const;

export const GITHUB_SCOPES = { 
  MINIMAL: ['read:user', 'user:email'] as const,
  STANDARD: ['read:user', 'user:email', 'read:org'] as const,
  FULL: ['repo', 'read:user', 'user:email', 'read:org'] as const
} as const;
