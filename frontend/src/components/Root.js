import React from 'react';
import { Provider } from 'react-redux';
import { Route, BrowserRouter } from 'react-router-dom';
import AppContainer from '../container/AppContainer';
import PropTypes from 'prop-types';

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Route path='/' component={AppContainer} />
    </BrowserRouter>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
