import * as httpMocks from 'node-mocks-http';
import {getPosts} from '../src/index';
import {posts} from './stubs';
import {mocked} from 'ts-jest/utils';
import axios from 'axios';

jest.mock('axios');

const DEEP_MOCK = true;
const mockedAxios = mocked(axios, DEEP_MOCK);

describe('getPosts', () => {
  afterAll(()=> {
    jest.clearAllMocks();
    mockedAxios.mockClear();
  });

  it('should fetch posts', async () => {
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    mockedAxios.get.mockResolvedValue(({data: posts}));
    res.send = jest.fn();

    await getPosts(req, res);

    expect(res.send).toHaveBeenCalledWith(posts);
    expect(res.statusCode).toBe(200);
  });

  it('should return status code 500 when API fails', async () => {
    const ERROR_MESSAGE = 'Something went wrong';
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    mockedAxios.get.mockRejectedValue(new Error(ERROR_MESSAGE));
    res.send = jest.fn();

    await getPosts(req, res);

    expect(res.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    expect(res.statusCode).toBe(500);
  });
});
