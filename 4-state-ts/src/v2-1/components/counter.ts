import eventCreators from '../core/eventCreator';

interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  // setState(newState: any): void;
  render(): void;
  registerEvent(): void;
}

export default class Counter implements Component {
  $target: Element;
  $element: Element;
  state: any;
  eventBus: any;

  constructor($target: Element, initialState: any, eventBus?: any) {
    this.state = initialState;

    this.$target = $target;
    this.$element = document.createElement('div');
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    this.eventBus = eventBus;

    // calls
    this.render();
    this.registerEvent();
  }

  render = () => {
    const { number, diffNumber } = this.eventBus.getState();

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
          this.eventBus.dispatch(eventCreators.increase());
        }

        if (target.textContent === '-1') {
          this.eventBus.dispatch(eventCreators.decrease());
        }
      }
    });

    this.$element.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target.matches('input')) {
        this.eventBus.dispatch(eventCreators.applyDiff(+target.value));
      }
    });
  }
}
