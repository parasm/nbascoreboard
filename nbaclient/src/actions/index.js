import axios from 'axios';

const URL = 'http://localhost:8000';

export const GET_DAILY_BOARD = 'GET_DAILY_BOARD';
export const GET_DAILY_LEADERS = 'GET_DAILY_LEADERS';
export const GET_SCOREBOARD = 'GET_SCOREBOARD';
export const GET_DAILY_LINEUPS = 'GET_DAILY_LINEUPS';
export const GET_GAME_DETAIL = 'GET_GAME_DETAIL';
export const GET_PREV = 'GET_PREV';

export function getDailyBoard(){
  const req = axios.get(URL);
  return {
    type: GET_DAILY_BOARD,
    payload: req
  };
}

export function getDailyLeaders(){
  const req = axios.get(`${URL}/daily_leaders`);
  return {
    type: GET_DAILY_LEADERS,
    payload: req
  }
}

export function getScoreboard(date){
  const req = axios.get(`${URL}/scoreboard?game_date=${date}`);
  return {
    type: GET_SCOREBOARD,
    payload: req
  }
}

export function getPrevGameData(date){
  const req = axios.get(`${URL}/scoreboardv2?game_date=${date}`);
  return {
    type: GET_PREV,
    payload: req
  }
}

export function getDailyLineups(){
  const req = axios.get(`${URL}/daily_lineups`);
  return {
    type: GET_DAILY_LINEUPS,
    payload: req
  }
}

export function getGameDetail(gameId){
  const req = axios.get(`${URL}/gamedetail?game=${gameId}`);
  return {
    type: GET_GAME_DETAIL,
    payload: req
  }
}
