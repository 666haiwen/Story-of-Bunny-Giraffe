import React from 'react';
import {ANN_TIME, HOME_CONST} from '../const';
import {getDay} from '../api/utils';

class Home extends React.Component {
    constructor(props) {
      super(props);
      const {current, anniversary} = this.timeUpdate();
      this.state = {
        current: current,
        Anniversary: anniversary,
      };
      this.timeInterval = setInterval(() => {
        const {current, anniversary} = this.timeUpdate();
        this.setState({
          ...this.state,
          current: current,
          Anniversary: anniversary,
        });
      }, 1000);
    }

    timeUpdate() {
      const anniversary = [
        {name: 'Love Day', days:getDay(new Date(ANN_TIME.LOVE), new Date())},
        {name: 'StrawBerry Day', days:getDay(new Date(ANN_TIME.STRAWBERRY), new Date())},
        {name: 'Re-meet Day', days:getDay(new Date(), new Date(ANN_TIME.RE_MEET))}
      ];
      let current = 0;
      if (anniversary[1].days % 100 == 0)
        current = 1;
      else if (anniversary[2].days % 10 == 0)
        current = 2;
      return {current: current, anniversary: anniversary};
    }

    render() {
      console.log(this.state);
      const day = this.state.Anniversary[this.state.current];
      const mainBackground = HOME_CONST.COLOR[this.state.current];
      const anniversaryList = [];
      this.state.Anniversary.forEach((v, i) => {
        if (i != this.state.current) {
          anniversaryList.push(
            <div className='days-candidate' key={i}>
              {v.name + ' Days'}
            </div>
          );
        }
      });
      return (
        <div className='page-main' style={{height: HOME_CONST.HEIGHT}}>
          <div className='days-title'>
            <h1>{day.name}</h1>
            <div className='days-bottom' />
          </div>
          <div className='days-main' style={{background: mainBackground}}>
            <div className='custom-title'>
              <h1><span style={{fontSize: 48}}>{day.days + ' Days'}</span></h1>
            </div>
          </div>
          {/* <div className='days-list'>
            {anniversaryList.map(v => v)}
          </div> */}
          <div className='days-bottom panel-bottom' />
        </div>
      );
    }
  }

export default Home;
  