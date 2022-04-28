import { $ } from './utils/dom';

import { Target } from './types';

import Pages from './pages';

const pages = Pages($('#root') as Target);

$('header > nav > ul')?.addEventListener('click', (event: any) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target?.dataset;

    console.log(navigate);
  }
});

pages.home();

// // router 추가
// router //
//   .addRoute('/1-router/', pages.home)
//   .addRoute('/1-router/posts', pages.posts)
//   .addRoute('/1-router/posts/:id', pages.post)
//   .addRoute('/1-router/posts/:id/:anotherId', pages.another)
//   .setNotFound(pages.notFound)
//   .route();
