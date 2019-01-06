import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

class GameStats extends Component {
  constructor(props){
    super(props);
    this.renderStats = this.renderStats.bind(this);
  }
  renderStats(team){
    if(isEmpty(this.props.game_details)) return;
    const gameDetails = this.props.game_details[this.props.gid];
    const playerStats = team === 'home' ? gameDetails.hls.pstsg : gameDetails.vls.pstsg;
    const stats = playerStats.map(item => {
      const fgPer = item.fga === 0 ? '0%' : `${Math.round((item.fgm/item.fga)*100)}%`;
      const tpPer = item.tpa === 0 ? '0%' : `${Math.round((item.tpm/item.tpa)*100)}%`;
      const ftPer = item.fta === 0 ? '0%' : `${Math.round((item.ftm/item.fta)*100)}%`;
      return (
          <tr key={item.pid}>
            <td>{`${item.fn} ${item.ln}`}</td>
            <td>{item.min}</td>
            <td>{item.pts}</td>
            <td>{item.ast}</td>
            <td>{`${item.reb} (${item.dreb}|${item.oreb})`}</td>
            <td>{item.tov}</td>
            <td>{item.stl}</td>
            <td>{item.blk}</td>
            <td>{item.pf}</td>
            <td>{item.pm}</td>
            <td>{`${fgPer} (${item.fgm}-${item.fga})`}</td>
            <td>{`${tpPer} (${item.tpm}-${item.tpa})`}</td>
            <td>{`${ftPer} (${item.ftm}-${item.fta})`}</td>
          </tr>
      );
    });
    return (
      <tbody>
        {stats}
      </tbody>
    );
  }
  render(){
    if(this.props.game_details.length === 0) return (<div></div>);
    if(this.props.daily_data.length === 0) return (<div></div>);
    const game_num = this.props.game_num.replace('game','');
    const gameData = this.props.daily_data.g[game_num];
    if(gameData.p === 0 || gameData.p === null) return (<div>Game has not started.</div>);
    return (
      <div className='game-stats-tile'>
        <p>{`${gameData.h.tc} ${gameData.h.tn}`}</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>AST</th>
                <th>REB(DREB|OREB)</th>
                <th>TOV</th>
                <th>STL</th>
                <th>BLK</th>
                <th>PF</th>
                <th>+/-</th>
                <th>FG</th>
                <th>3PT</th>
                <th>FT</th>
              </tr>
            </thead>     
            {this.renderStats('home')}
          </table>
        </div>
        <p>{`${gameData.v.tc} ${gameData.v.tn}`}</p>
        <div>
          <table>
            <thead>
              <tr>
                <th>Player</th>
                <th>MIN</th>
                <th>PTS</th>
                <th>AST</th>
                <th>REB(DREB|OREB)</th>
                <th>TOV</th>
                <th>STL</th>
                <th>BLK</th>
                <th>PF</th>
                <th>+/-</th>
                <th>FG</th>
                <th>3PT</th>
                <th>FT</th>
              </tr>
            </thead>     
            {this.renderStats('visitor')}
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps({daily_data, game_details}) {
  return { daily_data, game_details };
}

export default connect(mapStateToProps, null)(GameStats);
