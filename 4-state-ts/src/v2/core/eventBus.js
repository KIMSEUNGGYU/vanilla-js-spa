// TODO-gyu: loadsh clondeDeep 대체 또는 직접 만든 것 사용
const cloneDeep = (x) => {
  return JSON.parse(JSON.stringify(x));
};

const freeze = (state) => Object.freeze(cloneDeep(state));

export default (model) => {
  const listeners = [];
  let state = model();

  const subscribe = (listener) => {
    listeners.push(listener);

    // 해당 리스너 제거 기능 반환 removeSubscribe 기능
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const invokeSubscribers = () => {
    const data = freeze(state);
    listeners.forEach((l) => l(data));
  };

  const dispatch = (event) => {
    const newState = model(state, event);

    if (!newState) {
      throw new Error('model should always return a value');
    }

    if (newState === state) {
      return;
    }

    state = newState;

    invokeSubscribers();
  };

  return {
    subscribe,
    dispatch,
    getState: () => freeze(state), // 현재 상태를 freeze 하여 반환
  };
};
