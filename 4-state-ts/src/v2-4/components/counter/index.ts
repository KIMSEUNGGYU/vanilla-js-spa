// 💡 TODO-GYU: store 를 어디서 선언할지 !!
import { store } from '../../main';

import { increase, decrease, applyDiff } from '../../modules/counter'; // counter state 변경 이벤트 (액션 생성 함수)

interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  render(): void;
  registerEvent(): void;
}

export default class Counter implements Component {
  $target: Element;
  $element: Element;
  state: any;
  constructor($target: Element, initialState: any) {
    this.state = initialState;

    this.$target = $target;
    this.$element = document.createElement('div');
    this.$element.className = 'counterapp';
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();

    // TODO-GYU: 컴포넌트에 자동으로 등록하는 방법은 없을까?? (상태가 변경되면 자동 렌더링) : main.ts 에서 처리 가능
    // counterStore.subscribe(this.render);
  }

  render = () => {
    const { number, diffNumber } = store.getState().counter;

    this.$element.innerHTML = `
      <h1>COUNTER!</h1>
      <div class="counter">
        <div>
          <input type="number" value="${diffNumber}" min="1" />
        </div>
        <button>+1</button>
        <span>${number}</span>
        <button>-1</button>
      </div>
    `;
  };

  registerEvent(): void {
    this.$element.addEventListener('click', (event) => {
      const target = event.target as Element;

      if (target.matches('button')) {
        if (target.textContent === '+1') {
          store.dispatch(increase());
        }

        if (target.textContent === '-1') {
          store.dispatch(decrease());
        }
      }
    });

    this.$element.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target.matches('input')) {
        store.dispatch(applyDiff(+target.value));
      }
    });
  }
}
