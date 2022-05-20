export default class Counter {
  private $target: Element;
  private $element: HTMLDivElement;
  private state: { count: number };
  constructor($target: Element, initialState: any) {
    this.state = initialState;

    this.$target = $target;

    // this.$element = document.createDocumentFragment();
    this.$element = document.createElement('div');

    this.$target.innerHTML = '';
    this.$target.appendChild(this.$element);

    // calls
    this.render();
    this.registerEvent();
  }

  setState = (newState: { count: number }) => {
    this.state = {
      ...this.state,
      ...newState,
    };

    this.render();
  };

  render = () => {
    const { count } = this.state;

    this.$element.innerHTML = `
        <h1>COUNTER!</h1>
            <div class="counter">
            <button>+1</button>
                <span>${count}</span>
            <button>-1</button>
        </div>
    `;
  };

  registerEvent = () => {
    this.$element.addEventListener('click', (event) => {
      let { count } = this.state;

      const target = event.target as Element;

      if (target.tagName === 'BUTTON') {
        if (target.textContent === '+1') {
          this.setState({ count: count + 1 });
        }

        if (target.textContent === '-1') {
          this.setState({ count: count - 1 });
        }
      }
    });
  };
}
