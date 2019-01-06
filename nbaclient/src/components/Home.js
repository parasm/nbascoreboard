import React, { Component } from 'react';
import { getDailyBoard, getDailyLeaders, getDailyLineups, getScoreboard, getPrevGameData } from '../actions/index';
import { bindActionCreators } from 'redux';
import LiveGameSummaryTile from './LiveGameSummaryTile';
import FutureGameSummaryTile from './FutureGameSummaryTile';
import PrevGameSummaryTile from './PrevGameSummaryTile';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Row, Col } from 'reactstrap';
import '../game.css';

class Home extends Component {
  constructor(props){
    super(props);
    const currentDate = new Date();
    currentDate.setMinutes(currentDate.getMinutes() - currentDate.getTimezoneOffset() - 60*4);
    this.state = { date: currentDate, today: currentDate.toISOString().split('T')[0] };
    this.renderGames = this.renderGames.bind(this);
    this.nextDate = this.nextDate.bind(this);
    this.prevDate = this.prevDate.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount(){
    this.props.getDailyBoard();
    this.props.getDailyLeaders();
    this.props.getDailyLineups();
    this.props.getScoreboard(this.state.date.toISOString().split('T')[0]);
  }
  onChange(date){
    this.setState({ date });
    this.props.getPrevGameData(date.toISOString().split('T')[0]);
  }
  renderGames(){
    if(this.props.daily_data.g === undefined) return;
    const selectedTime = this.state.date.toISOString().split('T')[0];
    if(selectedTime !== this.state.today && this.props.prev_games[selectedTime] !== undefined){
      const prevGames = this.props.prev_games[selectedTime];
      const gameTiles = [];
      prevGames.forEach((item, index) => {
        if(index % 2 === 0){
          gameTiles.push(<PrevGameSummaryTile key={item.PTS_PLAYER_ID} date={selectedTime} game_num={index}/>);
        }
      });
      return (
        <div className='container'>
          <Row>
            {gameTiles}
          </Row>
        </div>
      );
    } 
    const futureGames = [];
    const liveGames = [];
    this.props.daily_data.g.forEach((item, index) => {
      if (item.p === 0 || item.p === null){
        futureGames.push(<Col key={index} md='4'><FutureGameSummaryTile game_num={index}/></Col>);
      }else{
        liveGames.push(<LiveGameSummaryTile key={index} game_num={index}/>);
      }
      
    });
    return (
      <div className='container'>
        <Row>
          {liveGames}
        </Row>
        <Row>
          {futureGames}
        </Row>
      </div>

    )
  }
  nextDate(){
    const d = new Date(this.state.date.getTime() + 86400000);
    this.setState({ date: d});
    this.props.getPrevGameData(d.toISOString().split('T')[0]);
  }
  prevDate(){
    const d = new Date(this.state.date.getTime() - 86400000);
    this.setState({ date: d});
    this.props.getPrevGameData(d.toISOString().split('T')[0]);
  }
  render() {
    return (
      <div className='App'>
        <div className='date-picker'>
          <FontAwesomeIcon onClick={this.prevDate} icon={faArrowLeft} />
          <DatePicker onChange={this.onChange} value={this.state.date}/>
          <FontAwesomeIcon onClick={this.nextDate} icon={faArrowRight} />
        </div>
        <br/>
        {this.renderGames()}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getDailyBoard, getDailyLeaders, getDailyLineups, getScoreboard, getPrevGameData}, dispatch);
}

function mapStateToProps(state) {
  return { daily_data: state.daily_data, prev_games: state.prev_games};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
