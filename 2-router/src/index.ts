import { $ } from './utils/dom';

import { Target } from './types';

import Pages from './pages';
import Router from './router';

const pages = Pages($('#root') as Target);

const router = new Router();

$('header > nav > ul')?.addEventListener('click', (event: any) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target?.dataset;

    router.changeRoute(navigate);
  }
});

router //
  .addRoute('/', pages.home)
  .addRoute('/posts', pages.posts)
  .addRoute('/posts/:id', pages.post)
  .addRoute('/posts/:id/:nestedId', pages.nestedPost)
  .addRoute('/users', pages.users)
  .addRoute('/users/:id', pages.user)
  .setNotFound(pages.notFound)
  .route();
