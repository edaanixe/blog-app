import * as httpMocks from 'node-mocks-http';
import {deletePost, url} from '../src/index';
import {mocked} from 'ts-jest/utils';
import axios from 'axios';
import {posts} from './stubs';

jest.mock('axios');

const DEEP_MOCK = true;
const mockedAxios = mocked(axios, DEEP_MOCK);

describe('updatePost', () => {
  afterAll(()=> {
    jest.clearAllMocks();
    mockedAxios.mockClear();
  });

  it('should update post', async () => {
    const POST_ID = 1;
    const req = httpMocks.createRequest({
      params: {
        '0': POST_ID,
      },
      body: posts[0],
    });
    const res = httpMocks.createResponse();

    mockedAxios.delete.mockResolvedValue(undefined);
    res.send = jest.fn();

    await deletePost(req, res);

    expect(res.send).toHaveBeenCalled();
    expect(mockedAxios.delete).toHaveBeenLastCalledWith(`${url}/${POST_ID}`);
    expect(res.statusCode).toBe(202);
  });
});
