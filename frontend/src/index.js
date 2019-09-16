import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import App from './App';

import PatientsList from "./PatientsList";
import SamplesList from "./SamplesList";
import VariantsList from "./VariantsList";
import DoctorsModal from "./DoctorsModal"



const theme = createMuiTheme({
  palette: {
    text: {
      primary: "rgba(0, 0, 0, 0.67)",
      tertiary : "rgba(255, 255, 255, 0.85)",
    }
  },
});



const history = createBrowserHistory();

const routing = (
  <div>
    <MuiThemeProvider theme={theme}>

      <Router history={history}>
        <Switch>
          <Route path="/" exact component={App}/>
          <Route
            path="/users/" exact
            render={(routeProps) => (
              <DoctorsModal {...routeProps} ids={{}}/>
              )}
          />
          <Route
            path="/users/:userId/patients/"
            exact
            render={(routeProps) => (
              <PatientsList
                {...routeProps}
                ids={{userId: routeProps.match.params.userId}}
              />
              )}
          />
          <Route
            path="/users/:userId/patients/:patientId/samples/"
            exact
            render={(routeProps) => (
              <SamplesList
                {...routeProps}
                ids={{
                  userId: routeProps.match.params.userId,
                  patientId: routeProps.match.params.patientId,
                }}
              />
              )}
          />
          <Route
            path="/users/:userId/patients/:patientId/samples/:sampleId/variants/"
            exact
            render={(routeProps) => (
              <VariantsList
                {...routeProps}
                ids={{
                  userId: routeProps.match.params.userId,
                  patientId: routeProps.match.params.patientId,
                  sampleId: routeProps.match.params.sampleId,
                }}
              />
              )}
          />
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
