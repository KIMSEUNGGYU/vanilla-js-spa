import { $ } from './src/utils/dom.js';

import getTodos from './src/getTodos.js';

import appView from './src/views/app.js';

const state = {
  todos: getTodos(), // todo[]:  { text: '', completed: boolean}
  currentFilter: 'All', // All, Active, Completed
};

const $main = $('.todoapp');

window.requestAnimationFrame(() => {
  const $newMain = appView({ $target: $main, state }); // $main을 복사해서 적용된 DOM 을 반환
  $main.replaceWith($newMain); // 적용된 DOM 으로 대체
});
