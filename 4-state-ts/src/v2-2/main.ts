import './style.css';

import reducer from './modules';

// 임시 컴포넌트 구조
import Counter from './components/counter';

console.log('!! EXE v2-2 main !!');

const counter = new Counter(
  document.querySelector<HTMLDivElement>('#app')!, //
  { count: 0 },
);

// TODO-GYU: 복수 상태 관리 기능 구현
reducer.subscribe(counter.render);
