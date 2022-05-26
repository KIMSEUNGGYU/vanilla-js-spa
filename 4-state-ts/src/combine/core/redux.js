export const combineReducers = (reducers) => {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};

  reducerKeys.forEach((key) => {
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  });

  const finalReducerKeys = Object.keys(finalReducers);

  // root reducer
  return function combination(state = {}, action) {
    // let hasChanged = false;

    const nextState = {};

    // console.log('finalReducer', finalReducers);
    finalReducerKeys.forEach((key) => {
      const reducer = finalReducers[key];
      const prevStateForKey = state[key];

      const nextStateForKey = reducer(prevStateForKey, action);

      // console.log('prevStateForKey', prevStateForKey, nextStateForKey);

      nextState[key] = nextStateForKey;
      // hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
    });

    // hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;

    return nextState;
    // return hasChanged ? nextState : state;
  };
};

export const createStore = (reducer) => {
  let state;
  const listeners = [];

  const getState = () => ({ ...state });

  const dispatch = (action) => {
    state = reducer(state, action);

    publish();
  };

  const publish = () => {
    listeners.forEach(({ subscriber, context }) => {
      subscriber.call(context);
    });
  };

  const subscribe = (subscriber, context = null) => {
    listeners.push({
      subscriber,
      context,
    });
  };

  // 초기값 수행
  state = reducer(undefined, {});

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export const createAction = (type, payload = {}) => ({
  type,
  payload: { ...payload },
});
