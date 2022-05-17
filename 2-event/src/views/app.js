import { $ } from '../utils/dom.js';

// view
import todosView from './todos.js';
import counterView from './couter.js';
import filtersView from './filters.js';

export default ({ $target, state }) => {
  const $element = $target.cloneNode(true);

  const $list = $('.todo-list', $element);
  const $counter = $('.todo-count', $element);
  const $filters = $('.filters', $element);

  $list.replaceWith(todosView({ $target: $list, state }));
  $counter.replaceWith(counterView({ $target: $counter, state }));
  $filters.replaceWith(filtersView({ $target: $filters, state }));

  return $element;
};
