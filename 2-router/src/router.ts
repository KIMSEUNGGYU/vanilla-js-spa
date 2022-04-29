export const CHANGE_ROUTE_EVENT = 'urlChange';

interface RouterImpl {
  setNotFound(component: () => void): Router;
  addRoute(path: string, component: () => void): Router;
  changeRoute(url: string): void;
  route(): void;
}

type RouterType = {
  path: string;
  component: () => void;
};

export default class Router implements RouterImpl {
  router: RouterType[];
  notFoundComponent: () => void;
  constructor() {
    this.router = [];
    this.notFoundComponent = () => {};
  }

  setNotFound = (component: () => void): Router => {
    this.notFoundComponent = component;
    return this;
  };

  addRoute = (path: string, component: () => void): Router => {
    this.router.push({
      path,
      component,
    });

    return this;
  };

  changeRoute = (url: string): void => {
    history.pushState(null, '', url);
    window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
  };

  route = (): void => {
    const { pathname } = location;

    console.log('ss', this.router);

    const currentRouter = this.router?.find((route) => route.path === pathname);

    if (!currentRouter) {
      this.notFoundComponent();
      return;
    }

    currentRouter.component();
  };
}

// ❓ THINK : 여기에다가 하는 게 좋아 보이는데.. 음..
// window.addEventListener(CHANGE_ROUTE_EVENT, router.route);
// window.addEventListener('popstate', router.route); // 뒤로 가기 이벤트 등록
