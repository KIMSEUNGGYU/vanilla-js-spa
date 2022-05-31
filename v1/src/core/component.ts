// TODO-GYU: 추상화 후 적용 예정

abstract class Component {
  $target: Element;
  $element: Element;
  props: any;
  state: any; // 내부 상태
  constructor($target: Element, props: any, initialState = {}) {
    this.$target = $target;
    this.$element = document.createElement('div');
    this.$target.appendChild(this.$element);

    this.props = props;
    this.state = initialState;

    this.componentDidMount();
  }

  setState = (nextState: any) => {
    this.state = {
      ...this.state,
      ...nextState,
    };

    this.componentDidUpdate();
  };

  protected abstract render(): void;

  protected abstract registerEvent(): void;

  //
  componentDidMount = () => {
    this.render();
    this.registerEvent();
  };

  componentDidUpdate = () => {
    this.render();
  };
}

export default Component;
