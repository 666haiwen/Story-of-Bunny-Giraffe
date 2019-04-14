import React from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import {GAMES_CONST, MAIN} from '../const';

class Games extends React.Component {
    constructor(props) {
      super(props);
      this.color = ['C', 'D', 'H', 'S'];
      this.number = [...Array(10)].map((_, i) => i == 0 ? 'A' : (i + 1).toString());
      this.state = {
        cards: [...Array(4)].map(_ =>  {return {'src': require('../img/cards/red_back.png')};}),
        answers: {
          cards: [...Array(4)].map(_ =>  require('../img/cards/red_back.png')),
          symbol: ['?', '?', '?', '?']
        },
      };
      this.gameState = 'ready';
      this.symbol = ['+', '-', '×', '÷'];
      this.possible_combine = [
        [0, 1, 2],
        [0, 2, 1]
      ];
      this.possible_cards = [];
      const mark = [false, false, false, false];
      const get_possible_cards = (mark, cards_index) => {
        if (cards_index.length == 4) {
          this.possible_cards.push(cards_index.concat());
          return;
        }
        for (let i = 0; i < 4; i++)
          if (mark[i] == false) {
            mark[i] = true;
            cards_index.push(i);
            get_possible_cards(mark, cards_index);
            mark[i] = false;
            cards_index.pop();
          }
      };
      get_possible_cards(mark, []);
      this.props.setMainHeight(GAMES_CONST.HEIGHT + MAIN.TOP);
    }

    new_cards() {
      const numberFlag = [...Array(4 * 10)].map(_ => true);
      const newCards = [];
      let cnt = 0;
      while (newCards.length != 4) {
        cnt += 1;
        if (cnt > 10)
          break;
        const new_color = (Math.random() * 4) | 0;
        const new_number = (Math.random() * 10) | 0;
        const newCard = new_color * 10 + new_number;
        if (numberFlag[newCard]==true) {
          numberFlag[newCard] = false;
          const src = this.number[new_number] + this.color[new_color];
          newCards.push({
            src: require(`../img/cards/${src}.png`),
            value: new_number + 1,
          });
        }
      }
      this.setState({
        cards: newCards,
        answers: {
          cards: [...Array(4)].map(_ =>  require('../img/cards/red_back.png')),
          symbol: ['?', '?', '?', '?']
        },
      });
      this.gameState = 'new';
    }

    operattion_res(x, y, operation) {
      switch (operation) {
        case 0:
          return x + y;
        case 1:
          return x - y;
        case 2:
          return x * y;
        case 3:
          if (y == 0)
            return false;
          return x / y;
      }
    }

    vertify(symbols) {
      let res, combineRes, cardsIndexRes;
      this.possible_cards.some(cardsIndex => {
        const cardsValue = cardsIndex.map(v => this.state.cards[v].value);
        this.possible_combine.some((combine, combineIndex) => {
          const cards = cardsValue.concat();
          for (let index = 0; index < combine.length; index++) {
            const symbolIndex = combine[index];
            res = this.operattion_res(cards[symbolIndex], cards[symbolIndex + 1], symbols[symbolIndex]);
            if (res == false) {
              res = 0;
              break;
            }
            cards[symbolIndex] = cards[symbolIndex + 1] = res;
          } // for (let index = 0; index < combine.length; index++)
          if (res == 24) {
            combineRes = combineIndex;
            cardsIndexRes = cardsIndex.concat();
            // console.log(cards);
            // console.log(cardsValue);
            return true;
          }
        }); //this.possible_combine.forEach
        if (res == 24)
          return true;
      }); //this.possible_cards.forEach
      if (res == 24)
        return {success: true, combine: combineRes, cardsIndex: cardsIndexRes};
      else
        return {success: false};
    }
    
    answer(symbols) {
      if (this.gameState != 'new')
        return;
      if (symbols.length == 3) {
        const {success, combine, cardsIndex} = this.vertify(symbols);
        if (success == true) {
          this.gameState = 'answer';
          const answerCards = cardsIndex.map(v => this.state.cards[v].src);
          this.setState({
            ...this.state,
            answers: {
              cards: answerCards,
              symbol: symbols.map(v => this.symbol[v]),
              combine: combine
            }
          });
        }
        return;
      }
      for (let symbol = 0; symbol < 4; symbol++) {
        symbols.push(symbol);
        this.answer(symbols);
        symbols.pop();
      }
    }

    render() {
      let firstBracket = null, secondBracket = null;
      if (this.gameState == 'answer') {
        firstBracket = 
        <div>
          <span className='card-symbol' style={{'left': '-60px'}}>(</span>
          <span className='card-symbol' style={{'left': '420px'}}>)</span>
        </div>;
        if (this.state.answers.combine == 0)
          secondBracket = 
            <div>
              <span className='card-symbol' style={{'left': '-80px'}}>(</span>
              <span className='card-symbol' style={{'left': '710px'}}>)</span>
            </div>;
        else
          secondBracket = 
            <div>
              <span className='card-symbol' style={{'left': '620px'}}>(</span>
              <span className='card-symbol' style={{'left': '1000px'}}>)</span>
            </div>;
      }
      return (
        <div className='page-main' style={{height: GAMES_CONST.HEIGHT}}>
          <div className='game-title'>
            <img style={{'width': '280px'}} src={require('../img/cards/aces.png')}></img>
            <p className='game-title-p'>24 Game</p>
          </div>
          <div className='cards-panel'>
            <img className='card-img' style={{'left': '0px'}} src={this.state.cards[0].src}></img>
            <img className='card-img' style={{'left': '250px'}} src={this.state.cards[1].src}></img>
            <img className='card-img' style={{'left': '500px'}} src={this.state.cards[2].src}></img>
            <img className='card-img' style={{'left': '750px'}} src={this.state.cards[3].src}></img>
          </div>
          <div className='answers-panel'>
            <img className='card-img' style={{'left': '0px'}} src={this.state.answers.cards[0]}></img>
            <img className='card-img' style={{'left': '290px'}} src={this.state.answers.cards[1]}></img>
            <img className='card-img' style={{'left': '580px'}} src={this.state.answers.cards[2]}></img>
            <img className='card-img' style={{'left': '870px'}} src={this.state.answers.cards[3]}></img>
            <span className='card-symbol' style={{'left': '180px'}}>{this.state.answers.symbol[0]}</span>
            <span className='card-symbol' style={{'left': '470px'}}>{this.state.answers.symbol[1]}</span>
            <span className='card-symbol' style={{'left': '760px'}}>{this.state.answers.symbol[2]}</span>
            {firstBracket}
            {secondBracket}
          </div>
          <div className='cards-control'>
            <button className='card-btn new-game-btn' onClick={() => this.new_cards()}>New Game</button>
            <button className='card-btn answer-btn' onClick={() => this.answer([])}>Answer</button>
          </div>
        </div>
      );
    }
  }
  
  
  const GamesContainer = connect(null, actions)(Games);
  export default GamesContainer;
