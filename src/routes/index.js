import CoreLayout from '../core/components/core.layout.component';
import Home from './home';
import counterRoute from './counter';


export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    counterRoute(store)
  ]
});

export default createRoutes;
