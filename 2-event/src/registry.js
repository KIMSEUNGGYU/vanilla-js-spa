import { $$ } from './utils/dom.js';

// 레지시트리는 앱에서 사용할 수 있는 모든 구성요소(컴포넌트)
const registry = {};

const renderWrapper = (component) => {
  // renderWrapper(cloneComponent)($target, state, events)
  return ($target, state, events) => {
    const $element = component($target, state, events);

    const $childComponents = $$('[data-component]', $element);

    Array.from($childComponents).forEach((target) => {
      const name = target.dataset.component;

      const child = registry[name];
      if (!child) {
        return;
      }

      // child 는 component
      target.replaceWith(child(target, state, events));
    });

    return $element;
  };
};

const add = (name, component) => {
  registry[name] = renderWrapper(component);
};

const renderRoot = ($target, state, events) => {
  const cloneComponent = ($target) => {
    return $target.cloneNode(true);
  };

  return renderWrapper(cloneComponent)($target, state, events);
};

export default {
  add,
  renderRoot,
};
