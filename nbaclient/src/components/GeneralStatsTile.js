import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class GeneralStatsTile extends Component {
  constructor(props){
    super(props);
    this.renderStats = this.renderStats.bind(this);
    this.renderFinalStats = this.renderFinalStats.bind(this);
  }
  renderFinalStats(home, visitor){
    return (
      <div className='general-stats-tile'>
        <Table>
          <thead>
            <tr>
              <th>FG%</th>
              <th>FG3%</th>
              <th>FT%</th>
              <th>AST</th>
              <th>REB</th>
              <th>TOV</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{Math.round(home.FG_PCT * 100)}%</td>
              <td>{Math.round(home.FG3_PCT * 100)}%</td>
              <td>{Math.round(home.FT_PCT * 100)}%</td>
              <td>{home.TOTAL_AST}</td>
              <td>{home.TOTAL_REB}</td>
              <td>{home.TOV}</td>
            </tr>
            <tr>
              <td>{Math.round(visitor.FG_PCT*100)}%</td>
              <td>{Math.round(visitor.FG3_PCT*100)}%</td>
              <td>{Math.round(visitor.FT_PCT*100)}%</td>
              <td>{visitor.TOTAL_AST}</td>
              <td>{visitor.TOTAL_REB}</td>
              <td>{visitor.TOV}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  renderStats(homeId, visitorId){
    if(this.props.scoreboard.length === 0) return;
    const visitor = this.props.scoreboard[visitorId];
    const home = this.props.scoreboard[homeId];
    return (
      <Table>
        <thead>
          <tr>
            <th>FG%</th>
            <th>FG3%</th>
            <th>FT%</th>
            <th>AST</th>
            <th>REB</th>
            <th>TOV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Math.round(home.FG_PCT * 100)}%</td>
            <td>{Math.round(home.FG3_PCT * 100)}%</td>
            <td>{Math.round(home.FT_PCT * 100)}%</td>
            <td>{home.AST}</td>
            <td>{home.REB}</td>
            <td>{home.TOV}</td>
          </tr>
          <tr>
            <td>{Math.round(visitor.FG_PCT*100)}%</td>
            <td>{Math.round(visitor.FG3_PCT*100)}%</td>
            <td>{Math.round(visitor.FT_PCT*100)}%</td>
            <td>{visitor.AST}</td>
            <td>{visitor.REB}</td>
            <td>{visitor.TOV}</td>
          </tr>
        </tbody>
      </Table>
    );
  }
  render(){
    if(this.props.view === 'prev' && this.props.prev_games[this.props.date] !== undefined){
      const home = this.props.prev_games[this.props.date][this.props.game_num];
      const visitor = this.props.prev_games[this.props.date][this.props.game_num+1];
      return this.renderFinalStats(home, visitor);
    }
    const gameData = this.props.daily_data[this.props.game_num];
    return (
      <div className='general-stats-tile'>
        {this.renderStats(gameData.h.tid, gameData.v.tid)}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { daily_data: state.daily_data.g, scoreboard: state.scoreboard, prev_games: state.prev_games };
}


export default connect(mapStateToProps, null)(GeneralStatsTile);
