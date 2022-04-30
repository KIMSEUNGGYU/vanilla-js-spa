import { $ } from '../utils/dom';

import Pages from '.';

describe('pages', () => {
  context('render', () => {
    document.body.innerHTML = `<main id="root"></main>`;

    const $target = $('#root');
    const pages = Pages($target);

    it('home 호출 시, home page 가 렌더링된다.', () => {
      pages.home();

      expect($target.textContent).toBe('Home Page');
    });

    it('posts 호출 시, posts page 가 렌더링된다.', () => {
      pages.posts();

      expect($target.textContent).toBe('Posts Page');
    });

    it('post 호출 시, post page 가 렌더링된다.', () => {
      pages.post({ id: 1 });

      expect($target.textContent).toBe('Post Page - id 1');
    });

    it('notFound', () => {
      pages.notFound();

      expect($target.textContent).toBe('404 - Not Found Page');
    });
  });
});
