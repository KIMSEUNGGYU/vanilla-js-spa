const CHANGE_ROUTE_EVENT = 'urlChange';

const router = {
  routes: [],
  notFoundComponent: () => {},
  setNotFound: (component) => {
    router.notFoundComponent = component;
    return router;
  },
  addRoute: (path, component) => {
    const params = [];
    const parsedPath = path
      .replace(/:(\w+)/g, (match, param) => {
        params.push(param);
        return '([^\\/]+)';
      })
      .replace(/\//g, '\\/'); // 정규표현식이 이해할 수 있게 설정 (정규표현식 패턴으로 적용)

    router.routes.push({
      // path,
      testRegExp: new RegExp(`^${parsedPath}$`),
      component,
      params,
    });
    return router;
  },
  changeRoute: (url) => {
    history.pushState(null, null, url);
    window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
  },

  route: () => {
    const { pathname } = location;

    const currentRouter = router.routes.find((route) => {
      const { testRegExp } = route;
      return testRegExp.test(pathname);
    });

    if (!currentRouter) {
      router.notFoundComponent();
      return;
    }

    // 해당 컴포넌트에 있는 파람 지정
    let urlParams = {};

    if (currentRouter.params.length !== 0) {
      const matches = pathname.match(currentRouter.testRegExp);
      matches.shift();
      matches.forEach((paramValue, index) => {
        const paramName = currentRouter.params[index];
        urlParams[paramName] = paramValue;
      });
    }

    currentRouter.component(urlParams);
  },
};

window.addEventListener(CHANGE_ROUTE_EVENT, router.route);
window.addEventListener('popstate', router.route); // 뒤로 가기 이벤트 등록

export default router;
