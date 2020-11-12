import {Collection} from 'postman-collection';
import * as fs from 'fs';
import * as path from 'path';

import getPostsRequest from './getPostsRequest';
import {baseUrl, postSchema} from './variables';

// 1. Create a collection which will be used to group requests
const blogAppCollection = new Collection({
  info: {
    name: 'blog-app',
  },
});

// 2. Import variables which can be accessed by all requests
blogAppCollection.variables.add(baseUrl);
blogAppCollection.variables.add(postSchema);

// 3. Add requests via the `items` array
blogAppCollection.items.add(getPostsRequest);

// 4. Serialize the collection into JSON (required by Newman)
fs.writeFileSync(
    path.join(__dirname, 'blog-app.postman_collection.json'),
    JSON.stringify(blogAppCollection, null, 2),
);
