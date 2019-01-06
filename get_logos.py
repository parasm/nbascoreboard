import requests
from nba_api.stats.static import teams
import shutil

URL = 'https://stats.nba.com/media/img/teams/logos/season/2018-19/'
all_teams = teams.get_teams()
for team in all_teams:
     r = requests.get(URL+team['abbreviation']+'_logo.svg', stream=True)
     with open(team['abbreviation']+'.svg','wb') as f:
         r.raw.decode_content = True
         shutil.copyfileobj(r.raw, f)
