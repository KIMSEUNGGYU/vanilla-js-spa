import { Target } from '../types';

const $ = (selector: string, target: Target = window.document) => {
  return target.querySelector(selector);
};

const $$ = (selector: string, target: Target = window.document) => {
  return target.querySelectorAll(selector);
};

export { $, $$ };
