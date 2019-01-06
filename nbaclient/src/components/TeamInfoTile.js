import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class TeamInfoTile extends Component {
  constructor(props){
    super(props);
    this.renderLogos = this.renderLogos.bind(this);
  }
  renderScore(game_data, visitor){
    let game_time = (<p></p>);
    if (game_data.p === 0 || game_data.p === null || game_data.p === 4){
      game_time = (<p>{game_data.stt}</p>)
    }else{
      game_time = (<p>{game_data.cl + ' - '+ game_data.stt}</p>)
    }
    
    return (
      <div className='game-line-score'>
        {game_time}
        <p>{visitor !== undefined && visitor.NATL_TV_BROADCASTER_ABBREVIATION  !== null ? ` (${visitor.NATL_TV_BROADCASTER_ABBREVIATION}) ` : ''}</p>
      </div>
    );
  }
  renderLogoTable(home, visitor){
    if(visitor === undefined || home === undefined) return;
    return (
      <table>
        <tbody>
          <tr>
            <td className='image-cell'><img alt={visitor.TEAM_ABBREVIATION} src={'/logos/'+visitor.TEAM_ABBREVIATION+'.svg'}/></td>
            <td>{visitor.TEAM_WINS_LOSSES}</td>
          </tr>
          <tr>
            <td className='image-cell'><img alt={home.TEAM_ABBREVIATION} src={'/logos/'+home.TEAM_ABBREVIATION+'.svg'}/></td>
            <td>{home.TEAM_WINS_LOSSES}</td>
          </tr>
        </tbody>
      </table>
    )
  }
  renderLogos(home, visitor){
    if(visitor === undefined || home === undefined) return;
    return (
      <div className='logo-wrapper'>
        <div className='team-logo'>
          <img alt={visitor.TEAM_ABBREVIATION} src={'/logos/'+visitor.TEAM_ABBREVIATION+'.svg'}/>
          <p className='team-record'>{visitor.TEAM_WINS_LOSSES}</p>
        </div>
        <div className='team-logo'>
          <img alt={home.TEAM_ABBREVIATION} src={'/logos/'+home.TEAM_ABBREVIATION+'.svg'}/>
          <p className='team-record'>{home.TEAM_WINS_LOSSES}</p>
        </div>
      </div>
    )
  }
  render(){
    if(this.props.view === 'prev' && this.props.prev_games[this.props.date] !== undefined){
      const h = this.props.prev_games[this.props.date][this.props.game_num];
      const v = this.props.prev_games[this.props.date][this.props.game_num+1];
      return (
        <div className='team-info-tile'>
          <div className='game-line-score'>
            <p>{h.TOTAL_PTS} - {v.TOTAL_PTS}</p>
          </div>
          {this.renderLogoTable(h, v)}
        </div>
      );
    }
    const game_data = this.props.daily_data.g[this.props.game_num];
    const visitor = this.props.scoreboard[game_data.v.tid];
    const home = this.props.scoreboard[game_data.h.tid];
    if(this.props.view === 'future'){
      return (
        <div className='team-info-tile-future'>
          {this.renderScore(game_data, visitor)}
          {this.renderLogos(home, visitor)}
        </div>
      );
    }
    return (
      <div className='team-info-tile'>
        {this.renderScore(game_data, visitor)}
        {this.renderLogoTable(home, visitor)}
      </div>
    );
  }
}
function mapStateToProps({daily_data, scoreboard, prev_games}) {
  return {daily_data, scoreboard, prev_games};
}

export default connect(mapStateToProps, null)(TeamInfoTile);
