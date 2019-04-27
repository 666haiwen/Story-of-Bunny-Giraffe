import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import titleRight from '../img/title-right.png';
import titleLeft from '../img/title-left.jpg';

class Nav extends React.Component {
    render() {
      return (
        <div className='page-title blank-box'>
          <header className='home-title'>
            <Link to="/home" className='nav-link'>Home</Link>
            <Link to="/images" className='nav-link'>Images</Link>
            <Link to="/games" className='nav-link'>Games</Link>
            <Link replace to="/contact" className='nav-link'>Contact</Link>
            <Link to="/nested" className='nav-link'>Nested</Link>
            <h1 className='home-h1'>
              Story of Bunny and Giraffe
            </h1>
          </header>
        <img src={titleLeft} className='title-left' />
        <img src={titleRight} className='title-right' />
      </div>
      );
    }
  }

  Nav.propTypes = {
      pageName: PropTypes.string.isRequired,
      dispatch: PropTypes.func.isRequired
  };
  const mapStateToProps = (state) => {
      return {pageName: state.page.pageName};
  };
  const NavContainer = connect(mapStateToProps)(Nav);
  export default NavContainer;
  