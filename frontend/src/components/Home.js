import React from 'react';
import {COUPLE_START, STRAWBERRY, HOME_CONST} from '../const';
import {getDay} from '../api/utils';

class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        current: 1,
        Anniversary: [
          {name: 'Love Day', days:getDay(COUPLE_START)},
          {name: 'StrawBerry Day', days:getDay(STRAWBERRY)},
        ],
      };
    }

    render() {
      const day = this.state.Anniversary[this.state.current];
      const mainBackground = HOME_CONST.COLOR[this.state.current];
      return (
        <div className='page-main' style={{height: HOME_CONST.HEIGHT}}>
          <div className='days-title'>
            <h1>{day.name}</h1>
            <div className='days-bottom' />
          </div>
          <div className='days-main' style={{background: mainBackground}}>
            <div className='custom-title'>
              <h1><span style={{fontSize: 48}}>{day.days}</span></h1>
            </div>
          </div>
          <div className='days-bottom panel-bottom' />
        </div>
      );
    }
  }

export default Home;
  