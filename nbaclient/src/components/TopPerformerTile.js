import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class TopPerformerTile extends Component {
  constructor(props){
    super(props);
    this.renderLeaders = this.renderLeaders.bind(this);
    this.renderLineups = this.renderLineups.bind(this);
  }
  renderFinalLeaders(home, visitor){
    return (
      <div className='top-performer-tile'>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>{visitor.TEAM_NAME}</th>
              <th></th>
              <th>{home.TEAM_NAME}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>PTS</th>
              <td>{visitor.PTS_PLAYER_NAME}</td>
              <td>{visitor.PTS}</td>
              <td>{home.PTS_PLAYER_NAME}</td>
              <td>{home.PTS}</td>
            </tr>
            <tr>
              <th>AST</th>
              <td>{visitor.AST_PLAYER_NAME}</td>
              <td>{visitor.AST}</td>
              <td>{home.AST_PLAYER_NAME}</td>
              <td>{home.AST}</td>
            </tr>
            <tr>
              <th>REB</th>
              <td>{visitor.REB_PLAYER_NAME}</td>
              <td>{visitor.REB}</td>
              <td>{home.REB_PLAYER_NAME}</td>
              <td>{home.REB}</td>
            </tr>
            </tbody>
        </Table>
      </div>
    );
  }
  renderLeaders(gid, visitor_id){
    const leaders = this.props.daily_leaders.filter(item => {
      return item.GAME_ID === gid;
    });
    if(leaders.length === 0) return;
    const visitor = leaders[0].TEAM_ID === visitor_id ? leaders[0]: leaders[1];
    const home = visitor === leaders[0] ? leaders[1]: leaders[0];
    return (
      <tbody>
        <tr>
          <th>PTS</th>
          <td>{visitor.PTS_PLAYER_NAME}</td>
          <td>{visitor.PTS}</td>
          <td>{home.PTS_PLAYER_NAME}</td>
          <td>{home.PTS}</td>
        </tr>
        <tr>
          <th>AST</th>
          <td>{visitor.AST_PLAYER_NAME}</td>
          <td>{visitor.AST}</td>
          <td>{home.AST_PLAYER_NAME}</td>
          <td>{home.AST}</td>
        </tr>
        <tr>
          <th>REB</th>
          <td>{visitor.REB_PLAYER_NAME}</td>
          <td>{visitor.REB}</td>
          <td>{home.REB_PLAYER_NAME}</td>
          <td>{home.REB}</td>
        </tr>
      </tbody>
    );
  }
  renderLineups(gid,visitor_abr,home_abr){
    const lineups = this.props.daily_lineups.find(item => {
      return item.GameID === gid;
    });
    if(lineups === undefined) return;
    const visitor = lineups[visitor_abr];
    const home = lineups[home_abr];
    const players = [];
    for(let i = 0; i < 5; i++){
      players.push((
        <tr key={visitor[i].pos}>
          <th>{visitor[i].pos}</th>
          <td>{visitor[i].firstName + ' '+visitor[i].lastName}</td>
          <td></td>
          <td>{home[i].firstName + ' '+home[i].lastName}</td>
          <td></td>
        </tr>));
    }
    return (
      <tbody>
        {players}
      </tbody>
    );
  }
  render(){
    if(this.props.view === 'prev'){
      const home = this.props.prev_games[this.props.date][this.props.game_num];
      const visitor = this.props.prev_games[this.props.date][this.props.game_num+1];
      return this.renderFinalLeaders(home, visitor);
    }
    const game_data = this.props.daily_data.g[this.props.game_num];
    const tileData = (game_data.p === 0 || game_data.p === null) ? this.renderLineups(game_data.gid, game_data.v.ta, game_data.h.ta) :
     this.renderLeaders(game_data.gid, game_data.v.tid);
    return (
      <div className='top-performer-tile'>
        <Table>
          <thead>
            <tr>
              <th></th>
              <th>{game_data.v.ta}</th>
              <th></th>
              <th>{game_data.h.ta}</th>
              <th></th>
            </tr>
          </thead>
          {tileData}
        </Table>
      </div>
    );
  }
}
function mapStateToProps({daily_data, daily_leaders, daily_lineups, prev_games}) {
  return { daily_data, daily_leaders, daily_lineups, prev_games };
}

export default connect(mapStateToProps, null)(TopPerformerTile);
