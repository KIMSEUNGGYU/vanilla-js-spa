let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index) => {
  const { text, completed } = todo;

  const $element = createNewTodoNode();

  $element.querySelector('input.edit').value = text;
  $element.querySelector('label').textContent = text;

  if (completed) {
    $element.classList.add('completed');
    $element.querySelector('input.toggle').checked = true;
  }

  $element.querySelector('button.destroy').dataset.index = index;

  return $element;
};

export default ($target, state, events) => {
  const { todos } = state;

  const $element = $target.cloneNode(true);

  $element.innerHTML = '';

  // create Element
  todos //
    .map((todo, index) => getTodoElement(todo, index))
    .forEach((element) => $element.appendChild(element));

  // 이벤트 위임으로 이벤트 등록
  $element.addEventListener('click', (event) => {
    if (event.target.matches('button.destroy')) {
      events.deleteItem(event.target.dataset.index);
    }
  });

  return $element;
};
