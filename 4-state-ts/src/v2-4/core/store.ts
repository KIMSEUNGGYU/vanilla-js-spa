import { freeze } from '../utils/util';

export default class Store {
  private listeners: Function[];
  private state: any;
  private model: Function;
  constructor(model: Function) {
    this.listeners = [];
    this.model = model;
    this.state = model();
  }

  private publish = () => {
    const data = freeze(this.state);
    this.listeners.forEach((l) => l(data));
  };

  subscribe = (listener: Function) => {
    this.listeners.push(listener);

    // 해당 리스너 제거 기능 반환 removeSubscribe 기능
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  };

  dispatch = (event: { type: string; payload?: any }) => {
    const newState = this.model(this.state, event);

    if (!newState) {
      throw new Error('model should always return a value');
    }

    // 상태가 변하지 않으면 렌더링 방지
    if (newState === this.state) {
      return;
    }

    this.state = newState;

    this.publish();
  };

  getState = () => {
    return freeze(this.state);
  };
}

export const createStore = (reducer: Function) => {
  const store = new Store(reducer);

  return store;
};

export const combinReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};

  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers;
    }
  });

  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state, action) {
    let hasChanged = false;

    const nextState = {};

    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key];
      const prevStateForKey = state[key];
      const nextStateForKey = reducer(prevStateForKey, action);

      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== prevStateForKey;

      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    });

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;

    return hasChanged ? nextState : state;
  };
};
