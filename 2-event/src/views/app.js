let template;

const createAppElement = () => {
  if (!template) {
    // template 에 있는 템플릿을 가져옴
    template = document.getElementById('todo-app');
  }

  // 템플릿 첫번째 하위 요소가 실제 DOM 정보
  return template.content.firstElementChild.cloneNode(true);
};

const addEvents = ($target, events) => {
  $target.querySelector('.new-todo').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      events.addItem(event.target.value);
      event.target.value = '';
    }
  });
};

export default ($target, state, events) => {
  const $element = $target.cloneNode(true);

  $element.innerHTML = '';
  $element.appendChild(createAppElement());

  addEvents($element, events);

  return $element;
};
