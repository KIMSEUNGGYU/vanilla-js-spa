// 단일 리듀서

import { createStore } from '../core/redux';

// counter reducer
import counterReducer from './counter';
const counterStore = createStore(counterReducer());
export { counterStore };

import todosReducer from './todos';
const todosStore = createStore(todosReducer());
export { todosStore };
