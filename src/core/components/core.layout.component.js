import React from 'react';
import Header from './header.component';
import PropTypes from 'prop-types';

const CoreLayout = ({children}) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
);

CoreLayout.propTypes = {
  children: PropTypes.element.isRequired
};

export default CoreLayout;
