import './style.css';

import { counterStore, todosStore } from './modules';

// 임시 컴포넌트 구조
import Counter from './components/counter';
import TodoList from './components/todos';

console.log('!! EXE v2-4 main !!');

// COUNTER;
const counter = new Counter(
  document.querySelector<HTMLDivElement>('#app')!, //
  { count: 0 },
);
// TODO-GYU: 복수 상태 관리 기능 구현
counterStore.subscribe(counter.render);

const todoList = new TodoList(
  document.querySelector('#app')!, //
  {},
);

todosStore.subscribe(todoList.render);
