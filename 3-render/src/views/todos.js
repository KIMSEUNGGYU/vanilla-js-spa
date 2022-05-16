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

export default ({ $target, state }) => {
  const { todos } = state;

  const $element = $target.cloneNode(true);
  const $todos = todos //
    .map(getTodoElement)
    .join('');

  $element.innerHTML = $todos;

  return $element;
};
