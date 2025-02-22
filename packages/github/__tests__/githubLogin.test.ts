import axios from 'axios';
import { GithubConfig, GithubAuthResponse, GithubUserInfo } from '@easylogin/types';
import { GithubLogin } from '../src';
import { GithubAuthService } from '../src/auth';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GithubLogin', () => {
  const mockConfig: GithubConfig = {
    clientId: 'mockClientId',
    clientSecret: 'mockClientSecret',
    callbackUrl: 'http://localhost:8080/callback',
    scope: ['read:user', 'user:email'],
  };

  let githubLogin: GithubLogin;
  beforeEach(() => {
    githubLogin = new GithubLogin(mockConfig);
  });

  it('should throw an error when missing required parameters', () => {
    const invaildConfigs: Partial<GithubConfig>[] = [
      { clientId: '1', clientSecret: '1', callbackUrl: 'http://localhost:3000' },
      { clientId: '1', clientSecret: '1', scope: ['read:user', 'user:email'] },
      { clientId: '1', callbackUrl: 'http://localhost:3000', scope: ['read:user', 'user:email'] },
      { clientSecret: '1', callbackUrl: 'http://localhost:3000', scope: ['read:user', 'user:email'] },
    ];

    invaildConfigs.forEach(config => {
      expect(() => new GithubLogin(config as GithubConfig)).toThrow('Missing required configuration');
    });
  });

  it('should initialize with correct config', () => {
    expect(githubLogin).toBeInstanceOf(GithubLogin);
  });

  it('should return correct authorize url', () => {
    const authService = new GithubAuthService(mockConfig);
    const expectedUrl: string = authService.getAuthorizeUrl();
    expect(githubLogin.getAuthUrl()).toBe(expectedUrl);
  });

  it('should handle callback and return access token and user info', async () => {
    const mockCode = 'mockCode';
    const mockAuthResponse: GithubAuthResponse = {
      access_token: 'mockAccessToken',
      token_type: 'bearer',
    };
    const mockUserInfo: GithubUserInfo = {
      id: 'mockId',
      login: 'mockLogin',
      name: 'mockName',
      email: 'mockEmail',
      avatar_url: 'mockAvatarUrl',
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockAuthResponse });
    mockedAxios.get.mockResolvedValue({ data: mockUserInfo });

    const result = await githubLogin.handleCallback(mockCode);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      userInfo: mockUserInfo,
      token: mockAuthResponse.access_token,
    });
  });

  it('should throw an error when failed handle callback', async () => {
    const mockCode = 'mockCode';
    const mockError = new Error('mock error');
    mockedAxios.post.mockRejectedValueOnce(mockError);

    const result = await githubLogin.handleCallback(mockCode);
    expect(result.success).toBe(false);
  });
});
