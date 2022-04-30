import { Target } from '../types';

type LocationType = {
  params: any;
  query: any;
};

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

  const post = ({ params, query }: LocationType) => {
    const { id } = params;
    target.textContent = `Post Page - id: ${id}`;
  };

  const nestedPost = ({ params, query }: LocationType) => {
    const { id, nestedId } = params;
    target.textContent = `Post Page - id: ${id}, nestedId: ${nestedId}`;
  };

  const users = ({ params, query }: LocationType) => {
    let text = `Users Page - params: `;

    text = getParamQueryText(text, params, query);

    target.textContent = text;
  };

  const user = ({ params, query }: LocationType) => {
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
