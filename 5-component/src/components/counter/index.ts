export default class Counter {
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
    this.componentDidMount();
  }

  setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.componentDidUpdate();
  };

  componentDidMount = () => {
    this.render();
    this.registerEvent();
  };

  componentDidUpdate = () => {
    this.render();
  };

  render = () => {
    const { number, diffNumber } = this.state;

    const template = `
    <div>    
      <h1>COUNTER!</h1>
      <div class="counter">
        <div>
          <input type="number" value="${diffNumber}" min="1" />
        </div>
        <button>+1</button>
        <span>${number}</span>
        <button>-1</button>
      </div>
    </div>
    `;

    // TODO-GYU: DOM 노드 파싱후 diff 알고리즘 적용

    this.$element.innerHTML = template.trim();
  };

  registerEvent(): void {
    this.$element.addEventListener('click', (event) => {
      const target = event.target as Element;

      if (target.matches('button')) {
        if (target.textContent === '+1') {
          this.setState({
            number: this.state.number + this.state.diffNumber,
          });
        }

        if (target.textContent === '-1') {
          this.setState({
            number: this.state.number - this.state.diffNumber,
          });
        }
      }
    });

    this.$element.addEventListener('change', (event) => {
      const target = event.target as HTMLInputElement;

      if (target.matches('input')) {
        this.setState({
          diffNumber: +target.value,
        });
      }
    });
  }
}
