const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

export const increase = () => ({
  type: INCREASE,
});

export const decrease = () => ({
  type: DECREASE,
});

const initialState = {
  number: 0,
};

const counterReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return { ...state };
  }
};

export default counterReducer;
