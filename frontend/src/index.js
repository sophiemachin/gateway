import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';

import App from './App';
import List from './List.js'


import usersConfig from './configs/Users.js'
import patientsConfig from "./configs/Patients";
import samplesConfig from "./configs/Samples.js";
import variantsConfig from "./configs/Variants.js";


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
                   <List {...routeProps} tableData={usersConfig} />
                 )}
          />
          <Route path="/users/:userId/patients/" exact
                 render={(routeProps) => (
                   <List {...routeProps}
                         userId={routeProps.match.params.userId}
                         tableData={patientsConfig}/>
                 )} />
          <Route path="/users/:userId/patients/:patiendId/samples/" exact
                 render={(routeProps) => (
                   <List {...routeProps}
                         userId={routeProps.match.params.userId}
                         patientId={routeProps.match.params.patientId}
                         tableData={samplesConfig}
                   />
                 )} />
          <Route path="/variants/" exact
                 render={(routeProps) => (
                   <List {...routeProps} tableData={variantsConfig}/>
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
