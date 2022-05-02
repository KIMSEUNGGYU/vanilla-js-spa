import { Target } from '../types';

import { LocationType } from '../types';

export default (target: Target) => {
  const getParamQueryText = (text: string, params: any, query: any): string => {
    Object.entries(params).forEach(([key, value]) => {
      text += `${key}: ${value}`;
    });

    text += ' query: ';
    Object.entries(query).forEach(([key, value]) => {
      text += `${key}: ${value} `;
    });

    return text;
  };

  const home = () => {
    target.textContent = 'Home Page';
  };

  const posts = () => {
    target.textContent = 'Posts Page';
  };

  const post = ({ params }: any) => {
    const { id } = params;
    target.textContent = `Post Page - id: ${id}`;
  };

  const nestedPost = ({ params }: any) => {
    const { id, nestedId } = params;
    target.textContent = `Post Page - id: ${id}, nestedId: ${nestedId}`;
  };

  const users = ({ params, query }: any) => {
    let text = `Users Page - params: `;

    text = getParamQueryText(text, params, query);

    target.textContent = text;
  };

  const user = ({ params, query }: any) => {
    let text = `User Page - params: `;

    text = getParamQueryText(text, params, query);

    target.textContent = text;
  };

  const notFound = () => {
    target.textContent = '404 - Not Found Page';
  };

  return {
    home,
    posts,
    post,
    nestedPost,
    users,
    user,
    notFound,
  };
};
