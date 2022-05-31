let renderCount = 0;
export default class Number {
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
    console.log(this.state, nextState);

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
    const { number } = this.state;

    const $prevNode = this.$element.cloneNode(true);

    const template = `
      <button>${number}</button>
      <h3>renderCount: ${renderCount}</h3>
    `;

    // TODO-GYU: DOM 노드 파싱후 diff 알고리즘 적용
    console.log('after', $prevNode, this.$element);

    renderCount++;
    this.$element.innerHTML = template.trim();
  };

  registerEvent(): void {
    this.$element.addEventListener('click', (event) => {
      const target = event.target as Element;

      if (target.matches('button')) {
        this.setState({
          //   number: renderCount % 2 === 0 ? this.state.number + 1 : this.state.number,
          number: this.state.number + 1,
        });
      }
    });
  }
}
