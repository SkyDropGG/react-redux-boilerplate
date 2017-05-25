import {injectReducer} from '../../store/reducers';

export default (store) => ({
  path: 'counter',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./counter.container').default;
      const reducer = require('./counter.module').default;
      injectReducer(store, {
        key: 'counter',
        reducer
      });
      cb(null, Counter);
    }, 'counter');
  }
});
