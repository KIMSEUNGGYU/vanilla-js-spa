const ADD_ITEM = 'ADD_ITEM';

export const addItem = (text) => ({
  type: ADD_ITEM,
  payload: {
    text,
  },
});

const initialState = {
  todos: [],
};

const todosReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        todos: [...state.todos, { text: payload.text, completed: false }],
      };
    default:
      return { ...state };
  }
};

export default todosReducer;
