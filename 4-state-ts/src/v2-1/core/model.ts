import { Event } from '../types/common';

const cloneDeep = (x: any) => JSON.parse(JSON.stringify(x));

const INITIAL_STATE = {
  number: 0,
  diffNumber: 1,
};

type Counter = {
  number: number;
  diffNumber: number;
};

// state, action(payload)
const increase = (state: Counter, action: Event) => {
  return {
    ...state,
    number: state.number + state.diffNumber,
  };
};

const decrease = (state: Counter, action: Event) => {
  return {
    ...state,
    number: state.number - state.diffNumber,
  };
};

// const applyDiff = (state, event) => {
const applyDiff = (state: Counter, action: Event) => {
  const diffNumber = action.payload;

  return {
    ...state,
    diffNumber,
  };
};

const methods: {
  [key: string]: Function;
} = {
  INCREASE: increase,
  DECREASE: decrease,
  APPLY_DIFF: applyDiff,
};

export default (initalState: Counter = INITIAL_STATE) => {
  // event === actions
  return (prevState: Counter, event: Event) => {
    if (!prevState) {
      return cloneDeep(initalState);
    }

    // 🐛 TODO-gyu: 해당 에러 처리 방법 고민
    const currentModifier = methods[event.type];

    if (!currentModifier) {
      return prevState;
    }

    return currentModifier(prevState, event);
  };
};
