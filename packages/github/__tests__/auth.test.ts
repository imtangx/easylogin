import axios from 'axios';
import { GithubConfig, GithubAuthResponse } from '@esaylogin/types';
import { GithubAuthService } from '../src/auth';
import { GITHUB_ENDPOINTS } from '../src/constant';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GithubAuthService', () => {
  const mockConfig: GithubConfig = {
    clientId: 'mockClientId',
    clientSecret: 'mockClientSecret',
    callbackUrl: 'http://localhost:8080/callback',
    scope: ['read:user', 'user:email'],
  };

  let authService: GithubAuthService;
  beforeEach(() => {
    authService = new GithubAuthService(mockConfig);
  });

  it('should initialize with correct config', () => {
    expect(authService['config']).toEqual(mockConfig);
  });

  it('shoule return correct authorize url', () => {
    const expectedUrl: string = `${GITHUB_ENDPOINTS.AUTHORIZE}?client_id=mockClientId&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fcallback&scope=read%3Auser+user%3Aemail&response_type=code`;
    expect(authService.getAuthorizeUrl()).toBe(expectedUrl);
  });

  it('should return access token successfully', async () => {
    const mockCode: string = 'mockCode';
    const mockAuthResponse: GithubAuthResponse = {
      access_token: 'mockAccessToken',
      token_type: 'bearer',
    };

    mockedAxios.post.mockResolvedValueOnce({ data: mockAuthResponse });

    const result = await authService.getAccessToken(mockCode);
    expect(result).toEqual(mockAuthResponse);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      GITHUB_ENDPOINTS.ACCESS_TOKEN,
      {
        client_id: mockConfig.clientId,
        client_secret: mockConfig.clientSecret,
        code: mockCode,
        redirect_uri: mockConfig.callbackUrl,
      },
      {
        headers: {
          Accept: 'application/json',
        },
        timeout: 15000,
      }
    );
  });

  it('should throw an error when failed to get access token', async () => {
    const mockCode: string = 'mockCode';
    const mockError = new Error('mock error');
    mockedAxios.post.mockRejectedValueOnce(mockError);

    await expect(authService.getAccessToken(mockCode)).rejects.toThrow(
      `Failed to get access token: ${mockError.message}`
    );
  });
});
