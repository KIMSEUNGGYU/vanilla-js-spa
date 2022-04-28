export default (target: HTMLElement) => {
  const home = () => {
    target.textContent = 'Home Page';
  };

  const posts = () => {
    target.textContent = 'Posts Page';
  };

  const post = () => {
    target.textContent = 'Post Page';
  };

  const notFound = () => {
    target.textContent = '404 - Not Found Page';
  };

  return {
    home,
    posts,
    post,
    notFound,
  };
};
