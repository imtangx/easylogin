import axios from 'axios';
import { GithubUserInfo } from '@esaylogin/types';
import { GITHUB_ENDPOINTS } from '../src/constant';
import { GithubApiService } from '../src/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('GithubApiService', () => {
  const mockAccessToken = 'mockAccessToken';
  const mockUserInfo: GithubUserInfo = {
    id: 'mockId',
    login: 'mockLogin',
    name: 'mockName',
    email: 'mockEmail',
    avatar_url: 'mockAvatarUrl',
  };

  mockedAxios.get.mockResolvedValue({ data: mockUserInfo });

  let apiService: GithubApiService;
  beforeEach(() => {
    apiService = new GithubApiService();
  });

  it('should return user info successfully', async () => {
    await expect(apiService.getUserInfo(mockAccessToken)).resolves.toEqual(mockUserInfo);
    expect(mockedAxios.get).toHaveBeenCalledWith(GITHUB_ENDPOINTS.USER, {
      headers: {
        Authorization: `Bearer ${mockAccessToken}`,
        Accept: 'application/json',
      },
      timeout: 15000,
    });
  });

  it('should throw an error when failed to get user info', async () => {
    const mockError = new Error('mock error');
    mockedAxios.get.mockRejectedValue(mockError);

    await expect(() => new GithubApiService().getUserInfo(mockAccessToken)).rejects.toThrow(
      `Failed to get user info: ${mockError.message}`
    );
  });
});
