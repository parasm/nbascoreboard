import React, { Component } from 'react';
import TeamInfoTile from './TeamInfoTile';
import LinksTile from './LinksTile';
import QuarterScoringTile from './QuarterScoringTile';
import TopPerformerTile from './TopPerformerTile';
import GeneralStatsTile from './GeneralStatsTile';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PrevGameSummaryTile extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className='game-summary-tile'>
        <TeamInfoTile date={this.props.date} game_num={this.props.game_num} view='prev'/>
        <QuarterScoringTile date={this.props.date} game_num={this.props.game_num} view='prev'/>
        <GeneralStatsTile date={this.props.date} game_num={this.props.game_num} view='prev'/>
        <TopPerformerTile date={this.props.date} game_num={this.props.game_num} view='prev'/>
        <LinksTile game_num={this.props.game_num} date={this.props.date} view='prev'/>
      </div>
    )
  }
}

function mapStateToProps({prev_games}) {
  return { prev_games };
}

export default connect(mapStateToProps, null)(PrevGameSummaryTile);