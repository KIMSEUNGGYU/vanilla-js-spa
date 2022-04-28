const $ = (selector: string, target = document) => {
  return target.querySelector(selector);
};

const $$ = (selector: string, target = document) => {
  return target.querySelectorAll(selector);
};

export { $, $$ };
