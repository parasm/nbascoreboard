import React, { Component } from 'react';
import TeamInfoTile from './TeamInfoTile';
import TopPerformerTile from './TopPerformerTile';
import LinksTile from './LinksTile';
import { connect } from 'react-redux';

class FutureGameSummaryTile extends Component {
  constructor(props){
    super(props);
    this.renderLastMeeting = this.renderLastMeeting.bind(this);
  }
  renderLastMeeting(home_id){
    const lastMeetingData = this.props.daily_data[this.props.game_num].lm;
    if(lastMeetingData.gdte === null || lastMeetingData.gdte === '') return;
    const date = new Date(lastMeetingData.gdte);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    return (
      <div className='last-meeting'>
        <p>{lastMeetingData.gres} ({dateStr})</p>
        <p>{lastMeetingData.seri}</p>
      </div>
    )
  }
  render(){
    const gameData = this.props.daily_data[this.props.game_num];
    return (
      <div className='future-game-summary-tile'>
        <TeamInfoTile view='future' game_num={this.props.game_num}/>
        {this.renderLastMeeting(gameData.h.tid)}
        <TopPerformerTile game_num={this.props.game_num}/>
        <LinksTile game_num={this.props.game_num}/>
      </div>
    )
  }
}

function mapStateToProps({daily_data}) {
  return { daily_data: daily_data.g };
}

export default connect(mapStateToProps, null)(FutureGameSummaryTile);
