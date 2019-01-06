import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';

class QuarterScoringTile extends Component {
  renderFinalScores(home, visitor){
    console.log(home);
    return (
      <div className='quarter-scoring-tile'>
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
              <td>{home.PTS_QTR1}</td>
              <td>{home.PTS_QTR2}</td>
              <td>{home.PTS_QTR3}</td>
              <td>{home.PTS_QTR4}</td>
              <td>{home.TOTAL_PTS}</td>
            </tr>
            <tr>
              <td>{visitor.PTS_QTR1}</td>
              <td>{visitor.PTS_QTR2}</td>
              <td>{visitor.PTS_QTR3}</td>
              <td>{visitor.PTS_QTR4}</td>
              <td>{visitor.TOTAL_PTS}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
  render(){
    if(this.props.view === 'prev' && this.props.prev_games[this.props.date] !== undefined){
        const home = this.props.prev_games[this.props.date][this.props.game_num];
        const visitor = this.props.prev_games[this.props.date][this.props.game_num+1];
        return this.renderFinalScores(home, visitor);
    }
    const game_data = this.props.daily_data.g[this.props.game_num];
    return (
      <div className='quarter-scoring-tile'>
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
              <td>{game_data.v.q1}</td>
              <td>{game_data.v.q2}</td>
              <td>{game_data.v.q3}</td>
              <td>{game_data.v.q4}</td>
              <td>{game_data.v.s}</td>
            </tr>
            <tr>
              <td>{game_data.h.q1}</td>
              <td>{game_data.h.q2}</td>
              <td>{game_data.h.q3}</td>
              <td>{game_data.h.q4}</td>
              <td>{game_data.h.s}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps({daily_data, prev_games}) {
  return {daily_data, prev_games};
}

export default connect(mapStateToProps, null)(QuarterScoringTile);
