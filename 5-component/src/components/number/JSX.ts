// import Component from './Component';

const replaceComponent = (
  $parent: HTMLElement,
  $current: HTMLElement,
  components: {
    [key: string]: any;
  },
) => {
  const nodeName = $current.nodeName;

  if (components[nodeName]) {
    const $new = components[nodeName].$element;

    if ($new) {
      $parent.replaceChild($new, $current);
    }
  }
};

const searchElement = (
  $target: HTMLElement,
  components: {
    [key: string]: any;
  },
) => {
  const $children = Array.from($target.children);

  if ($children.length === 0 && $target.parentElement) {
    return replaceComponent($target.parentElement, $target, components);
  }

  $children.forEach(($el) => {
    searchElement($el as HTMLElement, components);
  });
};

export const parseJSX = (
  html: string,
  components: {
    [key: string]: any;
  },
): HTMLElement => {
  const $element = document.createElement('div');
  $element.innerHTML = html;

  console.log($element);

  searchElement($element, components);

  return ($element.firstElementChild ?? $element) as HTMLElement;
  //   return $element;
};
