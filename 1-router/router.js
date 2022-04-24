export default () => {
  const routes = [];
  const router = {};
  let notFoundComponent = () => {};

  router.addRoute = (path, component) => {
    routes.push({
      path,
      component,
    });
  };

  router.setNotFound = (component) => {
    notFoundComponent = component;
  };

  router.route = (path) => {
    const currentRouter = routes.find((value) => value.path === path);
    if (!currentRouter) {
      notFoundComponent();
      return;
    }

    currentRouter.component();
  };

  return router;
};
