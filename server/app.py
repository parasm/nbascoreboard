from flask import Flask, render_template, request, redirect, jsonify
import jinja2
import os
import numpy
import pandas as pd
import json
import requests
from datetime import datetime
from flask_cors import CORS
from nba_api.stats.endpoints import scoreboard, scoreboardv2


app = Flask(__name__)
CORS(app)

SCORES_URL = 'https://data.nba.com/data/5s/v2015/json/mobile_teams/nba/2018/scores/00_todays_scores.json'
PLAY_BY_BY_URL = 'https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2018/scores/pbp/{game_id}_full_pbp.json'
GAME_DETAIL_URL = 'https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2018/scores/gamedetail/{game_id}_gamedetail.json'
SCORING_LEADERS_URL = 'https://stats.nba.com/js/data/widgets/scores_leaders.json'
DAILY_LINEUP_URL = 'https://stats.nba.com/js/data/widgets/daily_lineups_{date}.json'

@app.route('/')
def hello():
	r = requests.get(SCORES_URL)
	return jsonify(r.json())

@app.route('/daily_leaders')
def leaders():
	r = requests.get(SCORING_LEADERS_URL)
	raw_data = r.json()
	return jsonify(raw_data['items'][0]['items'][0]['playergametats'])

@app.route('/scoreboard')
def linescores():
	current_date = datetime.today().strftime('%Y-%m-%d')
	game_date = request.args.get('game_date')
	if game_date != 'undefined' and game_date is not None:
		current_date = game_date
	print(current_date)
	board = scoreboard.Scoreboard(game_date=current_date)
	line_score = board.line_score.get_data_frame()
	game_header = board.game_header.get_data_frame()
	#last_meeting = board.last_meeting.get_data_frame()
	current_games = line_score.merge(game_header, on='GAME_ID').set_index('TEAM_ID')#.merge(last_meeting, on='GAME_ID')
	return current_games.to_json(orient='index')

@app.route('/scoreboardv2')
def scoreboard2():
	current_date = datetime.today().strftime('%Y-%m-%d')
	game_date = request.args.get('game_date')
	if game_date != 'undefined' and game_date is not None:
		current_date = game_date
	board = scoreboardv2.ScoreboardV2(game_date=current_date)
	team_leaders = board.team_leaders.get_data_frame().drop(['GAME_ID','TEAM_ID','TEAM_CITY','TEAM_NICKNAME','TEAM_ABBREVIATION'], axis=1)
	scores = board.line_score.get_data_frame().rename(columns={'PTS': 'TOTAL_PTS', 'AST': 'TOTAL_AST', 'REB': 'TOTAL_REB'})
	current_games = pd.concat([team_leaders, scores], axis=1)
	return jsonify({'date': current_date, 'prev': current_games.to_dict(orient='records')})

@app.route('/daily_lineups')
def lineups():
	current_date = datetime.today().strftime('%Y%m%d')
	r = requests.get(DAILY_LINEUP_URL.format(date=current_date))
	raw_data = r.json()
	return jsonify(raw_data['results'])

@app.route('/gamedetail')
def game_detail():
	game_id = request.args.get('game')
	if game_id is None:
		return 'error'
	r = requests.get(GAME_DETAIL_URL.format(game_id=game_id))
	raw_data = r.json()
	return jsonify(raw_data)
if __name__ == '__main__':
	port = int(os.environ.get('PORT', 8000))
	app.run(host='0.0.0.0', port=port,debug=True)
