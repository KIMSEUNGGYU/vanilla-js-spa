import './style.css';

// 임시 컴포넌트 구조
import Counter from './components/counter';

new Counter(
  document.querySelector<HTMLDivElement>('#app')!, //
  { number: 0 },
);

console.log('!! EXE v1 main !!');

// 기본 코드
// const app = document.querySelector<HTMLDivElement>('#app')!;
// app.innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;
