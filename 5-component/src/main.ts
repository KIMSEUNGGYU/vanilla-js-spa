import './style.css';

import { createStore, combinReducers } from './core/redux';

import { counterReducer, todosReducer } from './modules';
import { increase } from './modules/counter';
import { addItem } from './modules/todos';

// 임시 컴포넌트 구조
import Counter from './components/counter';
import TodoList from './components/todos';

const rootReducer = combinReducers({
  counter: counterReducer(),
  todos: todosReducer(),
});
const store = createStore(rootReducer);

// 멀티 리듀서 - 단일 수행
// function calls() {
//   const store = createStore(rootReducer);

//   console.log('counter', store.getState());
//   store.dispatch(increase());
//   store.dispatch(increase());
//   console.log('counter', store.getState());

//   console.log('todos', store.getState());
//   store.dispatch(addItem('react'));
//   store.dispatch(addItem('vanilla'));
//   console.log('todos', store.getState());
// }
// calls();

// 멀티 리듀서 서비스 적용
function calls() {
  const counter = new Counter(
    document.querySelector<HTMLDivElement>('#app')!, //
    { count: 0 },
  );
  store.subscribe(counter.render);

  const todoList = new TodoList(
    document.querySelector('#app')!, //
    {},
  );
  store.subscribe(todoList.render);
}
calls();

export { store };
