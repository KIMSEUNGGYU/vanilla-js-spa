export default (target) => {
  const home = () => {
    target.textContent = 'Home Page';
  };

  const posts = () => {
    target.textContent = 'Posts Page';
  };

  const post = (params) => {
    const { id } = params;
    target.textContent = `PostDetail Page - ${id}`;
  };

  const another = (params) => {
    const { id, anotherId } = params;
    target.textContent = `PostDetail Page - id: ${id} / another: ${anotherId}`;
  };

  const notFound = () => {
    target.textContent = '404 - Not Found Page';
  };

  return {
    home,
    posts,
    post,
    another,
    notFound,
  };
};
