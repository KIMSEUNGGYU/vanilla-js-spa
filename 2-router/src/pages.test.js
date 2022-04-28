import { $ } from './utils/dom';

import Pages from './pages';

describe('pages', () => {
  context('render', () => {
    document.body.innerHTML = `<main id="root"></main>`;

    const $target = $('#root');
    const pages = Pages($target);

    it('home', () => {
      pages.home();

      expect($target.textContent).toBe('Home Page');
    });

    it('posts', () => {
      pages.posts();

      expect($target.textContent).toBe('Posts Page');
    });

    it('post', () => {
      pages.post();

      expect($target.textContent).toBe('Post Page');
    });

    it('notFound', () => {
      pages.notFound();

      expect($target.textContent).toBe('404 - Not Found Page');
    });
  });
});
