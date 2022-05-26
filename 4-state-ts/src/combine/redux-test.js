import { createStore, combineReducers } from './core/redux.js';

import counterReducer, { increase } from './modules/counter.js';
import todosReducer, { addItem } from './modules/todos.js';

const store = createStore(counterReducer);

console.log('counter', store.getState());
store.dispatch(increase());
store.dispatch(increase());
console.log('counter', store.getState());

const store2 = createStore(todosReducer);

console.log('todos', store2.getState());
store2.dispatch(addItem('react'));
store2.dispatch(addItem('typescript'));
console.log('todos', store2.getState());
