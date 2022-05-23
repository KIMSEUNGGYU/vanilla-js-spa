// ❓ THINK-GYU: interface? abstract class 둘 중에 무엇?을 사용할지?
// interface? absctract class??
interface Component {
  $target: Element;
  $element: Element;
  state: any; // 다양한 형태 올 수 있음?을 타입으로?

  // ❓ THINK-GYU: constructor 타입 어떻게 정의
  // constructor($target: Element, initialState: any): Component;
  setState(newState: any): void;
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
    this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();
  }

  setState(newState: { count: number }): void {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  }

  render(): void {
    const { count } = this.state;

    this.$element.innerHTML = `
      <h1>COUNTER!</h1>
          <div class="counter">
          <button>+1</button>
              <span>${count}</span>
          <button>-1</button>
      </div>
    `;
  }

  registerEvent(): void {
    this.$element.addEventListener('click', (event) => {
      let { count } = this.state;

      const target = event.target as Element;
      if (target.matches('button')) {
        if (target.textContent === '+1') {
          this.setState({ count: count + 1 });
        }

        if (target.textContent === '-1') {
          this.setState({ count: count - 1 });
        }
      }
    });
  }
}
