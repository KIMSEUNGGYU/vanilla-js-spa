import { createStore } from '../core/store';

// counter reducer
import counterReducer from './counter';
const counterStore = createStore(counterReducer());
export { counterStore };

import todosReducer from './todos';
const todosStore = createStore(todosReducer());
export { todosStore };
