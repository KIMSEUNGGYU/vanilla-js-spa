import { cloneDeep } from '../utils/util';

// type State = {
//   todos: any[];
// };

type TodoItem = {
  text: string;
  completed: boolean;
};

type State = {
  todos: TodoItem[];
};

type Action = {
  type: string;
  payload?: any;
};

type Methods = {
  [key: string]: Function;
};

// 액션 타입 정의 - actionCreator
const ADD_ITEM = 'todos/ADD_ITEM' as const;

// 액션 생성 함수 - actionCreator
export const addItem = (text: string) => ({
  type: ADD_ITEM,
  payload: {
    text,
  },
});

// 상태 초기값
const initialState = {
  todos: [],
};

const methods: Methods = {
  [ADD_ITEM]: (state: State, action: Action) => {
    const { text } = action.payload;

    const todoItem = {
      text,
      completed: false,
    };

    return {
      ...state,
      todos: [...state.todos, todoItem],
    };
  },
};

// 리듀서 기본 템플릿
// counter reducer 정의 - models
export default function todosReducer() {
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
