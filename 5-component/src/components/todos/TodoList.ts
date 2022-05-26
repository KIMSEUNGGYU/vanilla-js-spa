import { store } from '../../main';

interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  render(): void;
  registerEvent(): void;
}

export default class TodoList implements Component {
  $target: Element;
  $element: Element;
  state: any;
  constructor($target: Element, initialState: any) {
    this.state = initialState;

    this.$target = $target;
    this.$element = document.createElement('section');
    this.$element.className = 'main';

    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();

    // TODO-GYU: 컴포넌트에 자동으로 등록하는 방법은 없을까?? (상태가 변경되면 자동 렌더링) : main.ts 에서 처리 가능
    // counterStore.subscribe(this.render);
  }

  render = () => {
    const { todos } = store.getState().todos;

    this.$element.innerHTML = `
      <input id="toggle-all" class="toggle-all" type="checkbox" />
      <label for="toggle-all"> Mark all as complete </label>
      <ul class="todo-list" data-component="todos">
        ${todos
          .map(
            (todo: { text: string; completed: boolean }) => `
            <li class= "${todo.completed ? 'completed' : ''}">
              <div class="view">
                <input class="toggle" type="checkbox" "${todo.completed ? 'checked' : ''}" />
                <label>${todo.text}</label>
                <button class="destroy"></button>
              </div>
            <input class="edit" value="text" />
            </li>
          `,
          )
          .join('')}
    </ul>
    `;
  };

  registerEvent(): void {}
}
