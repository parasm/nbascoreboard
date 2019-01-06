import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getGameDetail, getDailyBoard, getScoreboard } from '../actions/index';
import GameHeader from './GameHeader';
import GameStats from './GameStats';

class Boxscore extends Component {
  componentDidMount(){
    this.props.getDailyBoard();
    this.props.getGameDetail(this.props.match.params.gid);
    this.props.getScoreboard();
  }
  render(){
    return (
      <div>
        <GameHeader game_num={this.props.match.params.game_num}/>
        <GameStats gid={this.props.match.params.gid} game_num={this.props.match.params.game_num}/>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getGameDetail, getDailyBoard, getScoreboard}, dispatch);
}
function mapStateToProps({daily_data, game_details}) {
  return { daily_data, game_details };
}

export default connect(mapStateToProps, mapDispatchToProps)(Boxscore);
