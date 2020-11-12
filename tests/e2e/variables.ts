export const postSchema = {
  key: 'postSchema',
  type: 'string',
  value: JSON.stringify({
    type: 'object',
    properties: {
      userId: {
        type: 'integer',
      },
      id: {
        type: 'integer',
      },
      title: {
        type: 'string',
      },
      body: {
        type: 'string',
      },
    },
    required: [
      'userId',
      'id',
      'title',
      'body',
    ],
  }),

};

export const baseUrl = {
  key: 'baseUrl',
  type: 'string',
  value: 'http://localhost:5001/blog-app-6f01e/us-central1',
};
