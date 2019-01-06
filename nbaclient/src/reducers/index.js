import { combineReducers } from 'redux';
import { GET_DAILY_BOARD, GET_DAILY_LEADERS, GET_SCOREBOARD, GET_PREV, GET_DAILY_LINEUPS, GET_GAME_DETAIL } from '../actions/index';

function DailyBoardReducer(state = [], action) {
  switch(action.type){
    case GET_DAILY_BOARD:
      if(action.payload.data === undefined) return state;
      return action.payload.data.gs;
    default:
      return state;
  }
}

function DailyLeaderReducer(state = [], action) {
  switch(action.type){
    case GET_DAILY_LEADERS:
      return action.payload.data;
    default:
      return state;
  }
}

function DailyLineupReducer(state = [], action) {
  switch(action.type){
    case GET_DAILY_LINEUPS:
      return action.payload.data;
    default:
      return state;
  }
}

function Scoreboard(state = [], action) {
  switch(action.type){
    case GET_SCOREBOARD:
      return action.payload.data;
    default:
      return state;
  }
}

function PrevGames(state = {}, action) {
  switch(action.type){
    case GET_PREV:
      const res = action.payload.data;
      return {...state, [res.date]: res.prev};
    default:
      return state;
  }
}

function GameDetails(state = {}, action){
  switch (action.type) {
    case GET_GAME_DETAIL:
      const gid = action.payload.data.g.gid;
      return {...state, [gid]: action.payload.data.g};
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  daily_data: DailyBoardReducer,
  daily_leaders: DailyLeaderReducer,
  scoreboard: Scoreboard,
  daily_lineups: DailyLineupReducer,
  game_details: GameDetails,
  prev_games: PrevGames
});

export default rootReducer;
