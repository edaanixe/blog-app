import * as httpMocks from 'node-mocks-http';
import {getPost, url} from '../src/index';
import {posts} from './stubs';
import {mocked} from 'ts-jest/utils';
import axios from 'axios';

jest.mock('axios');

const DEEP_MOCK = true;
const mockedAxios = mocked(axios, DEEP_MOCK);

describe('getPost', () => {
  afterAll(()=> {
    jest.clearAllMocks();
    mockedAxios.mockClear();
  });

  it('should fetch post', async () => {
    const post = posts[0];
    const POST_ID = 1;
    const req = httpMocks.createRequest({
      params: {
        '0': POST_ID,
      },
    });
    const res = httpMocks.createResponse();

    mockedAxios.get.mockResolvedValue(({data: post}));
    res.send = jest.fn();

    await getPost(req, res);

    expect(res.send).toHaveBeenCalledWith(post);
    expect(mockedAxios.get).toHaveBeenLastCalledWith(`${url}/${POST_ID}`);
    expect(res.statusCode).toBe(200);
  });

  it('should return status code 404 when API fails', async () => {
    const ERROR_MESSAGE = 'Resource not found';
    const notFoundError = {
      response: {
        status: 404,
        statusText: ERROR_MESSAGE,
      },
    };
    const req = httpMocks.createRequest();
    const res = httpMocks.createResponse();

    mockedAxios.get.mockRejectedValue(notFoundError);
    res.send = jest.fn();

    await getPost(req, res);

    expect(res.send).toHaveBeenCalledWith(ERROR_MESSAGE);
    expect(res.statusCode).toBe(404);
  });
});
