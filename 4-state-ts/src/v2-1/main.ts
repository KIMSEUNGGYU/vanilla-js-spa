import './style.css';

// 임시 컴포넌트 구조
import Counter from './components/counter';

// (model) => ({ getState, subscribe, dispatch });
import eventBusFactory from './core/eventBus'; // eventBus 는 스토어
import modelFactory from './core/model'; // model 은 리듀서

const counterModel = modelFactory();
// console.log(counterModel);

const eventBus = eventBusFactory(counterModel); // store

const counter = new Counter(
  document.querySelector<HTMLDivElement>('#app')!, //
  { count: 0 },
  eventBus,
);

eventBus.subscribe(counter.render);

console.log('!! EXE v2-1 main !!');
