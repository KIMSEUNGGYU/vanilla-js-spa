import { createStore } from '../core/store';

import counterReducer from './counter';

const counterStore = createStore(counterReducer());

export default counterStore;
