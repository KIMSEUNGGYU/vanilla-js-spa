import Header from './Header';
import TodoList from './TodoList';
import Footers from './Footers';

interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  render(): void;
  registerEvent(): void;
}

export default class Todos implements Component {
  $target: Element;
  $element: Element;
  state: any;
  constructor($target: Element, initialState: any) {
    this.state = initialState;

    this.$target = $target;

    this.$element = document.createElement('div');
    this.$element.innerHTML = '';
    this.$element.className = 'todoapp';

    // this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();

    // TODO-GYU: 컴포넌트에 자동으로 등록하는 방법은 없을까?? (상태가 변경되면 자동 렌더링) : main.ts 에서 처리 가능
    // counterStore.subscribe(this.render);
  }

  render = () => {
    this.$element.innerHTML = '';
    new Header(this.$element, {});
    new TodoList(this.$element, {});
    new Footers(this.$element, {});
  };

  registerEvent(): void {}
}
