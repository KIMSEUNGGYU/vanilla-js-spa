import { $ } from './src/utils/dom.js';

import getTodos from './src/getTodos.js';

// import appView from './src/views/app.js';
import todosView from './src/views/todos.js';
import counterView from './src/views/couter.js';
import filtersView from './src/views/filters.js';

import registry from './src/registry.js';

registry.add({ name: 'todos', component: todosView });
registry.add({ name: 'counter', component: counterView });
registry.add({ name: 'filters', component: filtersView });

const state = {
  todos: getTodos(), // todo[]:  { text: '', completed: boolean}
  currentFilter: 'All', // All, Active, Completed
};

const render = () => {
  window.requestAnimationFrame(() => {
    const $main = $('.todoapp');
    // const $newMain = appView({ $target: $main, state }); // $main을 복사해서 적용된 DOM 을 반환
    const $newMain = registry.renderRoot({ $target: $main, state }); // $main을 복사해서 적용된 DOM 을 반환
    $main.replaceWith($newMain); // 적용된 DOM 으로 대체
  });
};

// 동적 데이터 렌더링
// setInterval(() => {
//   state.todos = getTodos();
//   render();
// }, 3000);

render();
