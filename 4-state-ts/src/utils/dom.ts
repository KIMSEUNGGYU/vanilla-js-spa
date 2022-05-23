export const $ = (selector: string, $target: Document | Element = document) => {
  $target.querySelector(selector);
};

export const $$ = (selector: string, $target: Document | Element = document) => {
  $target.querySelectorAll(selector);
};
