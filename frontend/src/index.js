import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import App from './App';
import List from './List.js'


import users from './data/users.json';
import patients from './data/patients.json';

const theme = createMuiTheme({
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.67)",
      tertiary : "rgba(255, 255, 255, 0.85)",
    }
  },
});



const routing = (
  <div style={{'marginTop': '60px'}}>
    <MuiThemeProvider theme={theme}>

      <Router>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/users/" exact
                 render={(routeProps) => (
                   <List {...routeProps} rows={users} />
                 )}
          />
          <Route path="/patients/" exact
                 render={(routeProps) => (
                  <List {...routeProps} rows={patients} />
          )} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </div>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
