import * as httpMocks from 'node-mocks-http';
import {createPost} from '../src/index';
import {posts} from './stubs';
import {mocked} from 'ts-jest/utils';
import axios from 'axios';

jest.mock('axios');

const DEEP_MOCK = true;
const mockedAxios = mocked(axios, DEEP_MOCK);

describe('createPost', () => {
  afterAll(()=> {
    jest.clearAllMocks();
    mockedAxios.mockClear();
  });

  it('should create post', async () => {
    const newPost = posts[0];
    const req = httpMocks.createRequest({
      body: newPost,
    });
    const res = httpMocks.createResponse();

    mockedAxios.post.mockResolvedValue(({data: newPost}));
    res.send = jest.fn();

    await createPost(req, res);

    expect(res.send).toHaveBeenCalledWith(newPost);
    expect(res.statusCode).toBe(201);
  });
});
