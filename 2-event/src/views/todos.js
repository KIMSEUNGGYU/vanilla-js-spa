let template;

const createNewTodoNode = () => {
  if (!template) {
    template = document.getElementById('todo-item');
  }

  return template.content.firstElementChild.cloneNode(true);
};

const getTodoElement = (todo, index, events) => {
  const { text, completed } = todo;

  const $element = createNewTodoNode();

  $element.querySelector('input.edit').value = text;
  $element.querySelector('label').textContent = text;

  if (completed) {
    $element.classList.add('completed');
    $element.querySelector('input.toggle').checked = true;
  }

  const handler = (event) => events.deleteItem(index);

  $element.querySelector('button.destroy').addEventListener('click', handler);

  return $element;
};

export default ($target, state, events) => {
  const { todos } = state;

  const $element = $target.cloneNode(true);

  $element.innerHTML = '';

  todos //
    .map((todo, index) => getTodoElement(todo, index, events))
    .forEach((element) => $element.appendChild(element));

  return $element;
};
