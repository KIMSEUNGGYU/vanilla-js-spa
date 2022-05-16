import { $, $$ } from './utils/dom.js';

const getTodoElement = (todo) => {
  const { text, completed } = todo;

  return `
    <li ${completed ? 'class="completed"' : ''}>
        <div class="view">
            <input 
                ${completed ? 'checked' : ''}
                class="toggle" 
                type="checkbox" 
            />
            <label>${text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${text}">
    </li>
  `;
};

const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  return length === 1 ? '1 Item left' : `${length} Items left`;
};

// View
export default ($target, state) => {
  const { todos, currentFilter } = state;

  // 주어진 상위 노드를 $element 로 복사해서 해당 노드를 수정해서 반환
  // 실제 DOM(주어진 $target)을 조작하지 않고 복사해서 수정해서 렌더
  const $element = $target.cloneNode(true);

  const $list = $('.todo-list', $element);
  const $counter = $('.todo-count', $element);
  const $filter = $('.filters', $element);

  // (viewer) todos 템플릿 생성
  $list.innerHTML = todos.map(getTodoElement).join('');
  $counter.textContent = getTodoCount(todos);
  // 함수화 하는게 낫나? - 이게 순수함수로 어떻게 빼지?
  Array.from($$('li a', $filter)) //
    .forEach(($a) => {
      $a.textContent === currentFilter //
        ? $a.classList.add('selected')
        : $a.classList.remove('selected');
    });

  return $element;
};
