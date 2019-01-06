import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class GameHeader extends Component {
  constructor(props){
    super(props);
    this.renderHeader = this.renderHeader.bind(this);
  }
  renderHeader(){
    if(this.props.scoreboard.length === 0) return (<div></div>);
    if(this.props.daily_data.length === 0) return (<div></div>);
    const game_num = this.props.game_num.replace('game','');
    const gameData = this.props.daily_data.g[game_num];
    const visitor = this.props.scoreboard[gameData.v.tid];
    const home = this.props.scoreboard[gameData.h.tid];
    return (
      <div className='game-header'>
        <div>
          <img alt={gameData.v.ta} src={'/logos/'+gameData.v.ta+'.svg'}/>
          <p>{visitor.TEAM_WINS_LOSSES}</p>
        </div>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
                <th>Q4</th>
                <th>Final</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{gameData.v.q1}</td>
                <td>{gameData.v.q2}</td>
                <td>{gameData.v.q3}</td>
                <td>{gameData.v.q4}</td>
                <td>{gameData.v.s}</td>
              </tr>
              <tr>
                <td>{gameData.h.q1}</td>
                <td>{gameData.h.q2}</td>
                <td>{gameData.h.q3}</td>
                <td>{gameData.h.q4}</td>
                <td>{gameData.h.s}</td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div>
          <img alt={gameData.h.ta} src={'/logos/'+gameData.h.ta+'.svg'}/>
          <p>{home.TEAM_WINS_LOSSES}</p>
        </div>
      </div>
    )
  }
  render(){
    return this.renderHeader();
  }
}

function mapStateToProps({daily_data, scoreboard, game_details}) {
  return { daily_data, scoreboard, game_details };
}

export default connect(mapStateToProps, null)(GameHeader);
