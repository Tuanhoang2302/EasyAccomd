
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './Pages/Search Page/index';
import {
  Switch,
  Route,
  Link
} from "react-router-dom";

import Error from './Thắng/page/Error'
import ListContext from './Thắng/context/ListContext';
import Manage from './Thắng/page/Manage';
import CreateAccom from './Thắng/page/CreateAccom'
import DetailsAccom from './Thắng/page/DetailsAccom'
import {listAccomData, listNotificationData} from './Thắng/constant'

import AccomDetail from './Pages/Detail An Accom/index';
import Chat from './Pages/Chat/index';
import Login from './Pages/Login/index';

function App() {
  const [accomSelect, setAccomSelect] = useState(-2)
  const [listAccom, setListAccom] = useState(listAccomData)
  const [listNotification, setListNotification] = useState(listNotificationData)

  return (
    <ListContext.Provider value={{
      accomSelect: accomSelect,
      setAccomSelect: setAccomSelect,
      listAccom: listAccom,
      setListAccom: setListAccom,
      listNotification: listNotification
    }}>
      <div className="App">
      <Switch>
        <Route exact path="/" component={SearchPage}/>
        <Route path="/accom-detail" component={AccomDetail}/>
        <Route path="/inbox" component={Chat}/>
        <Route path="/login" component={Login}/>

        <Route path="/user/manage">
            <Manage />
        </Route>
        <Route exact path="/createAccom">
            <CreateAccom setIndex={setAccomSelect} index={accomSelect}/>
        </Route>
        <Route exact path="/createAccom/details">
            <DetailsAccom accom={accomSelect>=0? {...listAccom[accomSelect]}:{}} />
        </Route>
        <Route>
          <Error />
        </Route>
        </Switch>
      </div>
    </ListContext.Provider>
  );
}

export default App;
