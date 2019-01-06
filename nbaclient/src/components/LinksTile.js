import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class LinksTile extends Component {
  constructor(props){
    super(props);
  }
  render(){
    if(this.props.view === 'prev'){
      return (
        <div className='links-tile'>
          <p><Link to={`${this.props.date}/game${this.props.game_num}`}>Box Score</Link> - </p>
          <p><Link to={`${this.props.date}/game${this.props.game_num}#team`}>Team Comparison</Link> - </p>
          <p><Link to={`${this.props.date}/game${this.props.game_num}#shot`}>Shot Charts</Link> - </p>
          <p><Link to={`${this.props.date}/game${this.props.game_num}#team-stats`}>Team Stats</Link></p>
        </div>
      );
    }
    if(this.props.daily_data === undefined) return (<p>Uh oh you caught me loading</p>);
    return (
      <div className='links-tile'>
        <p><Link to={`${this.props.daily_data.gdte}/game${this.props.game_num}`}>Box Score</Link> - </p>
        <p><Link to={`${this.props.daily_data.gdte}/game${this.props.game_num}#team`}>Team Comparison</Link> - </p>
        <p><Link to={`${this.props.daily_data.gdte}/game${this.props.game_num}#shot`}>Shot Charts</Link> - </p>
        <p><Link to={`${this.props.daily_data.gdte}/game${this.props.game_num}#team-stats`}>Team Stats</Link></p>
      </div>
    );
  }
}

function mapStateToProps({daily_data, prev_games}) {
  return { daily_data, prev_games };
}

export default connect(mapStateToProps, null)(LinksTile);
