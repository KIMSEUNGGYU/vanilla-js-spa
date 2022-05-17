import { $$ } from '../utils/dom.js';

export default ({ $target, state: { currentFilter } }) => {
  const $element = $target.cloneNode(true);

  Array.from($$('li a', $element)) //
    .forEach(($a) => {
      $a.textContent === currentFilter //
        ? $a.classList.add('selected')
        : $a.classList.remove('selected');
    });

  return $element;
};
