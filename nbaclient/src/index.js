import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import Boxscore from './components/Boxscore';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';
import * as serviceWorker from './serviceWorker';
import reducers from './reducers';
import 'bootstrap/dist/css/bootstrap.min.css';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/:date/:game_num" component={Boxscore}/>
    </div>
    </Router>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
