const cloneDeep = (x) => JSON.parse(JSON.stringify(x));

const INITIAL_STATE = {
  number: 0,
  diffNumber: 1,
};

// state, action(payload)
const increase = (state, action) => {
  return {
    ...state,
    number: state.number + state.diffNumber,
  };
};

const decrease = (state, action) => {
  return {
    ...state,
    number: state.number - state.diffNumber,
  };
};

// const applyDiff = (state, event) => {
const applyDiff = (state, action) => {
  const diffNumber = action.payload;

  return {
    ...state,
    diffNumber,
  };
};

const methods = {
  INCREASE: increase,
  DECREASE: decrease,
  APPLY_DIFF: applyDiff,
};

export default (initalState = INITIAL_STATE) => {
  return (prevState, event) => {
    if (!prevState) {
      return cloneDeep(initalState);
    }

    const currentModifier = methods[event.type];

    if (!currentModifier) {
      return prevState;
    }

    return currentModifier(prevState, event);
  };
};
