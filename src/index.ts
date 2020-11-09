import * as functions from 'firebase-functions';
import axios from 'axios';

export const url = 'https://jsonplaceholder.typicode.com/posts';

export const getPosts = functions.https.onRequest(async (req, res) => {
  try {
    const {data: posts} = await axios.get(url);

    res.send(posts);
  } catch (error) {
    functions.logger.error(error, {structuredData: true});
    res.status(500).send(error.message);
  }
});

export const getPost = functions.https.onRequest(async (req, res) => {
  try {
    const postId = req.params[0];
    const {data: post} = await axios.get(`${url}/${postId}`);

    res.send(post);
  } catch ({response}) {
    functions.logger.error(response.statusText, {structuredData: true});
    res.status(response.status).send(response.statusText);
  }
});

export const createPost = functions.https.onRequest(async (req, res) => {
  try {
    const {
      userId,
      title,
      body,
    } = req.body;

    const {data: post} = await axios.post(url, {userId, title, body});

    res.status(201).send(post);
  } catch ({response}) {
    functions.logger.error(response.statusText, {structuredData: true});
    res.status(response.status).send(response.statusText);
  }
});

export const updatePost = functions.https.onRequest(async (req, res) => {
  try {
    const postId = req.params[0];
    const {
      title,
      body,
    } = req.body;

    await axios.put(`${url}/${postId}`, {title, body});

    res.status(204).send();
  } catch ({response}) {
    functions.logger.error(response.statusText, {structuredData: true});
    res.status(response.status).send(response.statusText);
  }
});

export const deletePost = functions.https.onRequest(async (req, res) => {
  try {
    const postId = req.params[0];

    await axios.delete(`${url}/${postId}`);

    res.status(202).send();
  } catch ({response}) {
    functions.logger.error(response.statusText, {structuredData: true});
    res.status(response.status).send(response.statusText);
  }
});
