import { store } from '../../main';

import { addItem } from '../../modules/todos';

interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  render(): void;
  registerEvent(): void;
}

export default class Header implements Component {
  $target: Element;
  $element: Element;
  state: any;
  constructor($target: Element, initialState: any) {
    this.state = initialState;

    this.$target = $target;
    this.$element = document.createElement('header');
    this.$element.className = 'header';

    // this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();

    // TODO-GYU: 컴포넌트에 자동으로 등록하는 방법은 없을까?? (상태가 변경되면 자동 렌더링) : main.ts 에서 처리 가능
    // counterStore.subscribe(this.render);
  }

  render = () => {
    this.$element.innerHTML = `
      <h1>todos</h1>
      <input class="new-todo" placeholder="What needs to be done?" autofocus />
    `;
  };

  registerEvent(): void {
    this.$element.addEventListener('keypress', (event: Event) => {
      const target = event.target as HTMLInputElement;

      // 🐛 event.key 를 갖는 이벤트는 뭐지? 이벤트 타입 어떻게 처리?
      if (target.matches('input') && event.key === 'Enter' && target.value !== '') {
        store.dispatch(addItem(target.value));
        target.value = '';
        target.focus();
      }
    });
  }
}
