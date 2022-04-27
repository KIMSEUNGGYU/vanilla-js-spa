import { $ } from './utils/dom.js';

import Pages from './pages.js';

import router from './router.js';

const pages = Pages($('#root'));

$('header > nav > ul').addEventListener('click', (event) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target.dataset;

    router.changeRoute(navigate);
  }
});

// router 추가
router //
  .addRoute('/1-router/', pages.home)
  .addRoute('/1-router/posts', pages.posts)
  .addRoute('/1-router/posts/:id', pages.post)
  .addRoute('/1-router/posts/:id/:anotherId', pages.another)
  .setNotFound(pages.notFound)
  .route();
