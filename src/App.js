import React from 'react';
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Error from './page/Error';
import { AppProvider } from './context/AppContext';
import Manage from './page/Manage';
import CreateAccom from './page/CreateAccom'
import DetailsAccom from './page/DetailsAccom'

import './App.css';

export default function(props) {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <Switch>
            
            <Route exact path="/">
                <Manage />
            </Route>
            
            <Route exact path="/createAccom">
                <CreateAccom />
            </Route>

            <Route exact path="/createAccom/details">
                <DetailsAccom />
            </Route>

            <Route>
              <Error />
            </Route>

          </Switch>
        </div>
      </Router>
    </AppProvider>
  ) 
}
