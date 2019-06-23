import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider, makeStyles} from '@material-ui/core/styles';
import { Typography as T } from '@material-ui/core';
import { createBrowserHistory } from 'history';

import App from './App';
import List from './List.js'


import usersConfig from './configs/Users.js'
import patientsConfig from "./configs/Patients";
import samplesConfig from "./configs/Samples.js";
import variantsConfig from "./configs/Variants.js";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";


const theme = createMuiTheme({
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.67)",
      tertiary : "rgba(255, 255, 255, 0.85)",
    }
  },
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: 'black'
  }
}));


const HeaderBar = () => {
  const classes=useStyles();
  return <div className={classes.root}>
  <AppBar position="static" >
    <Toolbar className={classes.toolbar}>
      <T variant="h6" className={classes.title}>
        Gateway
      </T>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
  </div>
};

const history = createBrowserHistory();

const routing = (
  <div>
    <MuiThemeProvider theme={theme}>
      <HeaderBar />
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App}/>
          <Route path="/users/" exact
                 render={(routeProps) => (
                   <List {...routeProps} tableData={usersConfig}
                         ids={{}}/>
                 )}
          />
          <Route path="/users/:userId/patients/" exact
                 render={(routeProps) => (
                   <List {...routeProps}
                         ids={{
                           userId: routeProps.match.params.userId,
                         }}
                         tableData={patientsConfig}/>
                 )}/>
          <Route path="/users/:userId/patients/:patientId/samples/" exact
                 render={(routeProps) => (
                   <List {...routeProps}
                         ids={{
                           userId: routeProps.match.params.userId,
                           patientId: routeProps.match.params.patientId,
                         }}

                         tableData={samplesConfig}
                   />
                 )}/>
          <Route path="/users/:userId/patients/:patientId/samples/:sampleId/variants/" exact
                 render={(routeProps) => (
                   <List {...routeProps}
                         ids={{
                           userId: routeProps.match.params.userId,
                           patientId: routeProps.match.params.patientId,
                           sampleId: routeProps.match.params.sampleId,
                         }}

                         tableData={variantsConfig}
                   />
                 )}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  </div>
)


ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
