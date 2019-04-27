import React from 'react';
import { Provider } from 'react-redux';
// import { Route, BrowserRouter } from 'react-router-dom';
import AppContainer from '../container/AppContainer';
import PropTypes from 'prop-types';
import '../css/page.css';
import '../css/home.css';
import '../css/games.css';


const Root = ({ store }) => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
