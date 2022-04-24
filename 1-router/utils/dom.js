// querySelector 는 Node, 와 element 노드가 가능한 걸로 암
const $ = (selector, target = document) => {
  return target.querySelector(selector);
};

const $$ = (selector, target = document) => {
  return target.querySelectorAll(selector);
};

export { $, $$ };
