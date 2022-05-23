// redux actions 정의
const EVENT_TYPES = Object.freeze({
  INCREASE: 'INCREASE',
  DECREASE: 'DECREASE',
  RESET: 'RESET',
  APPLY_DIFF: 'APPLY_DIFF',
});

// actions 함수 정의
export default {
  increase: () => ({
    type: EVENT_TYPES.INCREASE,
    // payload: text,
  }),
  decrease: () => ({
    type: EVENT_TYPES.DECREASE,
    // payload: {
    //   text,
    //   index,
    // },
  }),
  reset: () => ({
    type: EVENT_TYPES.RESET,
    // payload: RESET,
  }),
  applyDiff: (diffNumber: number) => ({
    type: EVENT_TYPES.APPLY_DIFF,
    payload: diffNumber,
  }),
};
