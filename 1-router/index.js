import { $ } from './utils/dom.js';

import Pages from './pages.js';

const pages = Pages($('#root'));

$('header > nav > ul').addEventListener('click', (event) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target.dataset;

    if (navigate === '/1-router/') {
      pages.home();
    } else if (navigate === '/1-router/posts') {
      pages.posts();
    } else {
      pages.notFound();
    }
  }
});

// 첫 페이지 렌더링
pages.home();
