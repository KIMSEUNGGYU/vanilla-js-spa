// ❓ THINK-GYU: interface? abstract class 둘 중에 무엇?을 사용할지?
// interface? absctract class??

type CounterState = {
  number: number;
  diffNumber: number;
};
interface Component {
  $target: Element;
  $element: Element;
  state: CounterState; // 다양한 형태 올 수 있음?을 타입으로?

  // ❓ THINK-GYU: constructor 타입 어떻게 정의
  // constructor($target: Element, initialState: any): Component;
  setState(newState: CounterState): void;
  render(): void;
  registerEvent(): void;
}

export default class Counter implements Component {
  $target: Element;
  $element: Element;
  state: CounterState;
  constructor($target: Element, initialState: CounterState) {
    this.state = initialState;

    this.$target = $target;
    this.$element = document.createElement('div');
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();
  }

  setState(newState: CounterState): void {
    this.state = {
      ...this.state,
      ...newState,
    };

    // console.log('change', this.state);

    this.render();
  }

  render = () => {
    const { number, diffNumber } = this.state;

    this.$element.innerHTML = `
      <h1>COUNTER!</h1>
      <div>
        <input type="number" value="${diffNumber}" min="1" />
      </div>
      <div class="counter">
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
          this.setState({
            ...this.state,
            number: this.state.number + this.state.diffNumber,
          });
        }

        if (target.textContent === '-1') {
          this.setState({
            ...this.state,
            number: this.state.number - this.state.diffNumber,
          });
        }
      }
    });

    this.$element.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target.matches('input')) {
        this.setState({
          ...this.state,
          diffNumber: +target.value,
        });
      }
    });
  }
}
