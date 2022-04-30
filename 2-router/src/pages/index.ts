import { Target } from '../types';

export default (target: Target) => {
  const home = () => {
    target.textContent = 'Home Page';
  };

  const posts = () => {
    target.textContent = 'Posts Page';
  };

  const post = (params: { id: string }) => {
    const { id } = params;
    target.textContent = `Post Page - id ${id}`;
  };

  const nestedPost = (params: { id: string; nestedId: string }) => {
    const { id, nestedId } = params;
    target.textContent = `Post Page - id ${id}, nestedId: ${nestedId}`;
  };

  const notFound = () => {
    target.textContent = '404 - Not Found Page';
  };

  return {
    home,
    posts,
    post,
    nestedPost,
    notFound,
  };
};
