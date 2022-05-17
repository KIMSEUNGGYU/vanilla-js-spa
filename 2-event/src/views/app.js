let template;

const createAppElement = () => {
  if (!template) {
    // template 에 있는 템플릿을 가져옴
    template = document.getElementById('todo-app');
  }

  // 템플릿 첫번째 하위 요소가 실제 DOM 정보
  return template.content.firstElementChild.cloneNode(true);
};

export default ({ $target }) => {
  const $element = $target.cloneNode(true);
  $element.innerHTML = '';
  $element.appendChild(createAppElement());
  return $element;
};
