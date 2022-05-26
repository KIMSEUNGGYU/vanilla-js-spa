import { createStore, combineReducers } from './core/redux.js';

import counterReducer, { increase } from './modules/counter.js';
import todosReducer, { addItem } from './modules/todos.js';

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
});

const store = createStore(rootReducer);

function calls() {
  //   console.log('counter', store.getState());
  store.dispatch(increase());
  store.dispatch(increase());
  console.log('counter', store.getState());

  //   console.log('todos', store.getState());
  store.dispatch(addItem('react'));
  store.dispatch(addItem('typescript'));
  console.log('todos', store.getState());
}

calls();
