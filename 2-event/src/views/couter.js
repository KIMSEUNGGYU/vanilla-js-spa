const getTodoCount = (todos) => {
  const notCompleted = todos.filter((todo) => !todo.completed);

  const { length } = notCompleted;

  return length === 1 //
    ? '1 Item left'
    : `${length} Items left`;
};

export default ($target, { todos }) => {
  const $element = $target.cloneNode(true);

  $element.textConent = getTodoCount(todos);

  return $element;
};
