import React from 'react';
import {Header} from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import HeaderRegister from './HeaderRegister';
import {Registration} from './Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div id="header">
            <Switch>
              <Route exact path="/" component={Header} />
              <Route path="/registration" component={HeaderRegister} />
              <Route path="/login" component={HeaderRegister} />
            </Switch>
          </div>
          <div id="container">
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
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