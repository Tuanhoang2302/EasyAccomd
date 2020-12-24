import React from 'react';
import {FirtHeader, Header} from './Component/home/Header';
import Main from './Component/home/Main';
import Footer from './Component/home/Footer';
import Login from './Component/login/Login'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import {Registration} from './Component/registration/Registration';
import Personal from './Component/personnal/Personal';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div id="header">
            <Switch>
              <Route exact path="/" component={Header} />
              <Route path="/registration" component={FirtHeader} />
              <Route path="/login" component={FirtHeader} />
              <Route path="/personal" component={FirtHeader} />
            </Switch>
          </div>
          <div id="container">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/personal" component={Personal} />
            </Switch>
          </div>
          <div id="footer">
            <Footer/>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;