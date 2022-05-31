import { cloneDeep } from '../utils/util';

type State = {
  number: number;
  diffNumber: number;
};
type Action = {
  type: string;
  payload?: any;
};

// 액션 타입 정의 - actionCreator
const EVENT_TYPES = Object.freeze({
  INCREASE: 'counter/INCREASE',
  DECREASE: 'counter/DECREASE',
  RESET: 'counter/RESET',
  APPLY_DIFF: 'counter/APPLY_DIFF',
});

// 액션 생성 함수 - actionCreator
export const increase = () => ({
  type: EVENT_TYPES.INCREASE,
});

export const decrease = () => ({
  type: EVENT_TYPES.DECREASE,
});

export const reset = () => ({
  type: EVENT_TYPES.RESET,
});

export const applyDiff = (diffNumber: number) => ({
  type: EVENT_TYPES.APPLY_DIFF,
  payload: diffNumber,
});

// 상태 초기값
const initialState = {
  number: 0,
  diffNumber: 1,
};

const methods = {
  [EVENT_TYPES.INCREASE]: (state: State, action: Action) => {
    return {
      ...state,
      number: state.number + state.diffNumber,
    };
  },
  [EVENT_TYPES.DECREASE]: (state: State, action: Action) => {
    return {
      ...state,
      number: state.number - state.diffNumber,
    };
  },
  //   [EVENT_TYPES.RESET]: reset,
  [EVENT_TYPES.APPLY_DIFF]: (state: State, action: Action) => {
    const diffNumber = action.payload;

    return {
      ...state,
      diffNumber,
    };
  },
};

// 리듀서 기본 템플릿
// counter reducer 정의 - models
export default function counterReducer() {
  return (prevState: any, action: Action) => {
    if (!prevState) {
      return cloneDeep(initialState);
    }

    // 🐛 TODO-gyu: 해당 에러 처리 방법 고민
    const currentModifier = methods[action.type];

    if (!currentModifier) {
      return prevState;
    }

    return currentModifier(prevState, action);
  };
}
