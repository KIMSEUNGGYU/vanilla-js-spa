import { $ } from './utils/dom.js';

import Pages from './pages.js';

import Router from './router.js';

const router = Router();

const pages = Pages($('#root'));

$('header > nav > ul').addEventListener('click', (event) => {
  const { target } = event;

  if (target.matches('button[data-navigate]')) {
    const { navigate } = target.dataset;

    // router.navigate('aaa');
    router.route(navigate);
  }
});

// 첫 페이지 렌더링
pages.home();

// router 추가
router.addRoute('/1-router/', pages.home);
router.addRoute('/1-router/posts', pages.posts);
router.setNotFound(pages.notFound);
// router.addRoute('/1-router/bad-url', pages.notFound);

// console.log(router);
//
