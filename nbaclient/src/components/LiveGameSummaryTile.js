import React, { Component } from 'react';
import TeamInfoTile from './TeamInfoTile';
import QuarterScoringTile from './QuarterScoringTile';
import TopPerformerTile from './TopPerformerTile';
import GeneralStatsTile from './GeneralStatsTile';
import LinksTile from './LinksTile';
import {connect} from 'react-redux';

class LiveGameSummaryTile extends Component {
  render(){
    const gameData = this.props.daily_data[this.props.game_num];
    const quarterTile = (gameData.p === 0 || gameData.p === null)  ? null: (<QuarterScoringTile game_num={this.props.game_num}/>);
    return (
      <div className='game-summary-tile'>
        <TeamInfoTile game_num={this.props.game_num}/>
        {quarterTile}
        <GeneralStatsTile game_num={this.props.game_num}/>
        <TopPerformerTile game_num={this.props.game_num}/>
        <LinksTile game_num={this.props.game_num}/>
      </div>
    )
  }
}

function mapStateToProps({daily_data}) {
  return { daily_data: daily_data.g };
}

export default connect(mapStateToProps, null)(LiveGameSummaryTile);
