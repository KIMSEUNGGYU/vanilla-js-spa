const CHANGE_ROUTE_EVENT = 'urlChange';

const router = {
  routes: [],
  notFoundComponent: () => {},
  setNotFound: (component) => {
    router.notFoundComponent = component;
  },
  addRoute: (path, component) => {
    router.routes.push({
      path,
      component,
    });
  },
  changeRoute: (url) => {
    history.pushState(null, null, url);
    window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
  },

  route: () => {
    const { pathname } = location;

    const currentRouter = router.routes.find((value) => value.path === pathname);
    if (!currentRouter) {
      router.notFoundComponent();
      return;
    }
    currentRouter.component();
  },
};

window.addEventListener(CHANGE_ROUTE_EVENT, router.route);
window.addEventListener('popstate', router.route); // 뒤로 가기 이벤트 등록

export default router;
