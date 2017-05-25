import {connect} from 'react-redux';
import {increment, doubleAsync} from './counter.module';

import Counter from './counter.component';


const mapDispatchToProps = {
  increment: () => increment(1),
  doubleAsync
};

const mapStateToProps = (state) => ({
  counter: state.counter
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
