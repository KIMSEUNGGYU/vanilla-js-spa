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
      pages.post({ params: { id: 1 } });

      expect($target.textContent).toBe('Post Page - id: 1');
    });

    it('nestedPost 호출 시, nestedPost page 가 렌더링된다.', () => {
      const params = { id: 1, nestedId: 'test' };
      pages.nestedPost({ params });

      expect($target.textContent).toMatch(/Post Page/g);
      expect($target.textContent).toMatch(/id: 1/g);
      expect($target.textContent).toMatch(/nestedId: test/g);
    });

    it('users 호출 시, query, params 가 없는 경우 users pages 가 렌더링된다.', () => {
      const params = {};
      const query = {};
      pages.users({ params, query });

      expect($target.textContent).toMatch('Users Page');
    });

    it('users 호출 시, query 가 있는 경우 users pages 가 렌더링된다.', () => {
      const params = {};
      const query = { username: 'gyu', age: 20 };
      pages.users({ params, query });

      expect($target.textContent).toMatch('Users Page');
      expect($target.textContent).toMatch('username: gyu');
      expect($target.textContent).toMatch('age: 20');
    });

    it('user 호출 시, params, query 가 있는 경우 users pages 가 렌더링된다.', () => {
      const params = { id: 'test' };
      const query = { username: 'gyu', age: 20 };
      pages.user({ params, query });

      expect($target.textContent).toMatch('User Page');
      expect($target.textContent).toMatch('id: test');
      expect($target.textContent).toMatch('username: gyu');
      expect($target.textContent).toMatch('age: 20');
    });

    it('notFound', () => {
      pages.notFound();

      expect($target.textContent).toBe('404 - Not Found Page');
    });
  });
});
