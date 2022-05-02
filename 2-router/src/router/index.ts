import { Obj } from '../types';

const CHANGE_ROUTE_EVENT = 'urlChange';
interface RouterImpl {
  setNotFound(component: () => void): Router;
  addRoute(path: string, component: (parmas?: any) => void): Router;
  changeRoute(url: string): void;
  route(): void;
}

type RouterType = {
  testRegExp: RegExp;
  component: (location?: any) => void;
  params: string[];
};
export default class Router implements RouterImpl {
  router: RouterType[];
  constructor() {
    this.router = [];
    this.notFoundComponent = () => {};
    window.addEventListener(CHANGE_ROUTE_EVENT, this.route);
    window.addEventListener('popstate', this.route); // 뒤로 가기 이벤트 등록
  }

  // ❓ THINK : (jest에서) private 인데 어떻게 접근이 가능하지? (브라우저는 접근 불가)
  private notFoundComponent: () => void;

  private getUrlQuery = () => {
    const searchQuery = new URLSearchParams(window.location.search);
    const query: Obj = {};
    for (const [key, value] of searchQuery) {
      query[key] = value;
    }

    return query;
  };

  private getUrlParams = (currentRouter: RouterType, pathname: string) => {
    const params: Obj = {};

    if (currentRouter.params.length !== 0) {
      const matches = pathname.match(currentRouter.testRegExp);
      // ❓ THINK : 테스트 커버리지를 검사할 때  matches?.shift 쓰면 안되어서 if문 안으로 검사함.
      // 이럴 경우 어떻게 처리하는게 좋을까?
      if (matches) {
        matches.shift();
        matches.forEach((paramValue, index) => {
          const paramName = currentRouter.params[index];
          params[paramName] = paramValue;
        });
      }
    }

    return params;
  };

  setNotFound = (component: () => void): Router => {
    this.notFoundComponent = component;
    return this;
  };

  addRoute = (path: string, component: () => void): Router => {
    // params 제공
    const params: string[] = [];

    // parse params
    const parsedParam = path
      .replace(/:(\w+)/g, (_, param) => {
        params.push(param); // param 추가하고
        return '([^\\/]+)'; // 정규표현식으로 처리하기 위해 param 을 특정 패턴으로 변경
      })
      .replace(/\//g, '\\/'); // '/' 를 '\/' 패턴으로 변경 (정규표현식으로 인식하기 위함)

    this.router.push({
      testRegExp: new RegExp(`^${parsedParam}$`),
      component,
      params,
    });

    return this;
  };

  changeRoute = (url: string): void => {
    history.pushState(null, '', url);
    window.dispatchEvent(new CustomEvent(CHANGE_ROUTE_EVENT));
  };

  route = (): void => {
    const { pathname } = window.location;

    // parse query
    const query = this.getUrlQuery();

    const currentRouter = this.router.find((route) => route.testRegExp.test(pathname));
    if (!currentRouter) {
      this.notFoundComponent();
      return;
    }

    // parse params
    const params = this.getUrlParams(currentRouter, pathname);

    const location = {
      params,
      query,
    };

    currentRouter.component(location);
  };
}
