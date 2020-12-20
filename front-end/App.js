
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './Pages/Search Page/index';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import AccomDetail from './Pages/Detail An Accom/index';
import Chat from './Pages/Chat/index';
import Login from './Pages/Login/index';

function App() {
  return (
    <div className="App">
    <Switch>
      <Route exact path="/" component={SearchPage}/>
      <Route path="/accom-detail" component={AccomDetail}/>
      <Route path="/inbox" component={Chat}/>
      <Route path="/login" component={Login}/>
      </Switch>
    </div>
  );
}

export default App;
