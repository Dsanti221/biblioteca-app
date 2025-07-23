import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
});

export const getPosts = () => api.get('posts');

export const getPostById = (id) => api.get(`posts/${id}`);

export const createPost = (data) => api.post('posts', data);

export default api;
