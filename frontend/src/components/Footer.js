import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className='blank-box page-footer'>
        <footer className='footer-div'>
          <span style={{color:'#ff005e', paddingRight: 5}}>&hearts;</span>
          From 2018.8.10-2116.8.10
          <span style={{position:'absolute', right:50}}>Contact us</span>
        </footer>       
      </div>
    );
  }
}

export default Footer;
  