import { $, $$ } from './dom';

describe('utils / dom / $ 함수', () => {
  context('dom 객체가 존재하는 경우', () => {
    it('$ 는 해당 DOM 객체를 반환한다. ', () => {
      document.body.innerHTML = '<main id="root"></main>';

      expect($('#root')).not.toBe(null);
    });
  });

  context('dom 객체가 존재하지 않는 경우', () => {
    it('$ 는 null 을 반환한다.', () => {
      document.body.innerHTML = null;

      expect($('#root')).toBe(null);
    });
  });
});

describe('utils / dom / $$ 함수', () => {
  context('dom 객체가 존재하는 경우', () => {
    it('$$ 는 해당 인자와 일치하는 여러 DOM 객체를 반환한다. ', () => {
      document.body.innerHTML = `<ul>
        <li><button data-navigate="/1-router/">home</button></li>
        <li><button data-navigate="/1-router/posts">posts</button></li>
        <li><button data-navigate="/1-router/posts/1">detail-post</button></li>
      `;

      expect($$('li').length).toBe(3);
    });
  });

  context('dom 객체가 존재하지 않는 경우', () => {
    it('$$ 는 빈 NodeList 를 반환한다.', () => {
      document.body.innerHTML = null;

      expect($$('#root').length).toBe(0);
    });
  });
});
