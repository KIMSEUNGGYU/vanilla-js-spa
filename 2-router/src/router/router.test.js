import Router from '.';

describe('router', () => {
  const componentMock = jest.fn();
  const pushStateMock = jest.fn();
  const dispatchEventMock = jest.fn();
  let router;

  beforeEach(() => {
    router = new Router();
    history.pushState = pushStateMock;
    window.dispatchEvent = dispatchEventMock;
    jest.clearAllMocks();
    jest.spyOn(router, 'notFoundComponent');
  });

  // ❓ THINK - path가 변경되는 것을 테스트하기 위한 코드, 더 좋은 방법은 없을까?
  function changePath(path) {
    delete window.location;
    window.location = {};
    Object.defineProperty(window, 'location', {
      value: {
        pathname: path,
      },
    });
  }

  it('setNotFound 호출 시, router 의 notFoundComponent 가 변경된다.', () => {
    router.notFoundComponent = null;

    router.setNotFound(componentMock);

    // ❓ 함수 값 비교할 때 어떤 matcher 를 사용해야하는지
    expect(router.notFoundComponent).toBe(componentMock);
  });

  it('addRoute 호출 시, router 의 route 가 추가된다.', () => {
    expect(router.router.length).toBe(0);

    router //
      .addRoute('/', componentMock)
      .addRoute('/posts', componentMock);

    // ❓ router 객체의 router 속성이 private 인 경우 test 는 어떻게 할까?
    expect(router.router.length).toBe(2);
  });

  it('changeRoute 호출 시, pushState 및 이벤트를 발생한다.', () => {
    router.changeRoute('/');

    expect(pushStateMock).toBeCalledTimes(1);
    expect(pushStateMock).toBeCalledWith(null, '', '/');
    expect(dispatchEventMock).toBeCalledTimes(1);
  });

  context('route 호출 시 - router 가 있는 경우', () => {
    it('브라우저의 url 과 등록된 path가 같은 경우 path 에 맞는 컴포넌트를 보여준다.', () => {
      router.addRoute('/', componentMock);
      changePath('/');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
    });

    it('브라우저의 url 과 등록된 path가 다른 경우 notFoundComponent 호출한다.', () => {
      router.addRoute('/posts', componentMock);
      changePath('/');

      router.route();

      expect(router.notFoundComponent).toBeCalledTimes(1);
      expect(componentMock).not.toBeCalled();
    });

    it('url이 "/" 인 경우 해당 컴포넌트를 호출한다.', () => {
      router.addRoute('/', componentMock);
      changePath('/');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
      expect(componentMock).toBeCalledWith({});
    });

    it('url이 "/posts" 인 경우 해당 컴포넌트를 호출한다.', () => {
      router.addRoute('/posts', componentMock);
      changePath('/posts');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
      expect(componentMock).toBeCalledWith({});
    });

    it('url이 "/posts/1" (param) 인 경우 해당 컴포넌트를 호출한다.', () => {
      router.addRoute('/posts/:id', componentMock);
      changePath('/posts/1');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
      expect(componentMock).toBeCalledWith({ id: '1' });
    });

    it('url이 "/posts/1/test" (중첩 param) 인 경우 해당 컴포넌트를 호출한다.', () => {
      router.addRoute('/posts/:id/:nestedId', componentMock);
      changePath('/posts/1/test');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
      expect(componentMock).toBeCalledWith({ id: '1', nestedId: 'test' });
    });

    it('url이 "/posts/1/2" (중첩 param) 인 경우 해당 컴포넌트를 호출한다.', () => {
      router.addRoute('/posts/:id/:nestedId', componentMock);
      changePath('/posts/1/2');

      router.route();

      expect(componentMock).toBeCalledTimes(1);
      expect(componentMock).toBeCalledWith({ id: '1', nestedId: '2' });
    });
  });

  context('route 호출 시 - router 에 등록되어 있지 않는 경우,', () => {
    it('router 가 없다면 notFoundComponent 를 호출한다.', () => {
      changePath('/bad-url');

      router.route();

      expect(router.notFoundComponent).toBeCalledTimes(1);
    });
  });
});
