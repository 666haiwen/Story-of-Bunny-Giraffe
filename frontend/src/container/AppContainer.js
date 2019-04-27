import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route } from 'react-router-dom';
import NavContainer from './NavContainer';
import Images from '../components/Images';
import Articles from '../components/Articles';
import Other from '../components/Other';
import GamesContainer from './GamesContainer';
import Footer from '../components/Footer';
import Home from '../components/Home';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <BrowserRouter>
          <div id="main" style={{'height': this.props.mainHeight}}>
            <NavContainer />
            <Route path="/home" component={Home} />
            <Route path="/images" component={Images} />
            <Route path="/games" component={GamesContainer} />
            <Route path="/about" component={Articles} />
            <Route path="/contact" component={Other} />
          </div>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  mainHeight: state.main.height,
});
const AppContainer = connect(mapStateToProps)(App);
export default AppContainer;

