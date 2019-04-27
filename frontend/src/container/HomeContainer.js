import React from 'react';
import * as actions from '../actions';
import * as d3 from 'd3';
import { connect } from 'react-redux';
import {ANN_TIME, HOME_CONST, MAIN} from '../const';
import {getDay} from '../api/utils';

class Home extends React.Component {
    constructor(props) {
      super(props);
      const {current, anniversary} = this.timeUpdate();
      this.state = {
        current: current,
        Anniversary: anniversary,
        showId: -1,
      };
      this.timeInterval = setInterval(() => {
        const {current, anniversary} = this.timeUpdate();
        this.setState({
          ...this.state,
          current: current,
          Anniversary: anniversary,
        });
      }, 1000);
      this.props.setMainHeight(HOME_CONST.HEIGHT + MAIN.TOP);
      this.fixCurrent = false;
    }

    componentDidMount() {
      this.titles = d3.selectAll('.candidate-title');
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
      if (this.fixCurrent == true) {
        current = this.state.current;
      }
      return {current: current, anniversary: anniversary};
    }

    setShowId(id) {
      d3.selectAll('.candidate-title').style('opacity', 0.0);
      d3.select('#candidate-title-' + id).style('opacity', 1.0);
    }

    titleClick(id) {
      this.fixCurrent = true;
      this.setState({
        ...this.state,
        current: id
      });
    }

    render() {
      const day = this.state.Anniversary[this.state.current];
      const mainBackground = HOME_CONST.COLOR[this.state.current];
      const anniversaryList = [];
      this.state.Anniversary.forEach((v, i) => {
        if (i != this.state.current) {
          anniversaryList.push(
            <div className='days-candidate' key={i}>
              <div className='days-candidate-content' style={{background: HOME_CONST.COLOR[i]}}>
                <div className='days-candidate-border' 
                  onMouseEnter={() => this.setShowId(i)} 
                  onMouseLeave={() => this.setShowId(-1)}
                  onClick={() => this.titleClick(i)}>
                </div>
                <div className='custom-title'>
                  <h3><span style={{fontSize: 18}}>{v.name}</span></h3>
                  <h3 className='candidate-title' id={'candidate-title-' + i}>
                    <span style={{fontSize: 18}}>{v.days + ' Days'}</span>
                  </h3>
                </div>
              </div>
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
          <div className='days-list'>
            {anniversaryList.map(v => v)}
          </div>
          <div className='days-bottom panel-bottom' />
        </div>
      );
    }
  }

const HomeContainer = connect(null, actions)(Home);
export default HomeContainer;