import getTodos from './src/getTodos.js';

import view from './src/view.js';

const state = {
  todos: getTodos(), // todo[]:  { text: '', completed: boolean}
  currentFilter: 'All', // All, Active, Completed
};

const $main = document.querySelector('.todoapp');

window.requestAnimationFrame(() => {
  const $newMain = view($main, state);
  $main.replaceWith($newMain);
});
