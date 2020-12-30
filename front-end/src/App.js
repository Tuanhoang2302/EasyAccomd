
import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchPage from './Pages/Search Page/index';
import {
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Error from './Thắng/page/Error'
import ListContext from './Thắng/context/ListContext';
import Manage from './Thắng/page/Manage';
import CreateAccom from './Thắng/page/CreateAccom'
import DetailsAccom from './Thắng/page/DetailsAccom'
import {listAccomData, listNotificationData} from './Thắng/constant'

import AccomDetail from './Pages/Detail An Accom/index';
import Chat from './Pages/Chat/index';
import LoginFake from './Pages/Login/index';

import './Trình/index.css'
import {Header, FirtHeader} from './Trình/Component/home/Header';
import Main from './Trình/Component/home/Main';
import Footer from './Trình/Component/home/Footer';
import Login from './Trình/Component/login/Login'
import {Registration} from './Trình/Component/registration/Registration';
import Personal from './Trình/Component/personnal/Personal';
import {useDispatch,useSelector} from 'react-redux'
import { AppProvider } from './Thắng/context/AppContext';

function App() {
  const [accomSelect, setAccomSelect] = useState({})
  const [listAccom, setListAccom] = useState(listAccomData)
  const [listNotification, setListNotification] = useState(listNotificationData)
  const user = useSelector(state => state.user)
  const token = useSelector(state => state.token)
  var accountId = null
  if(user != null){
    accountId = user._id
  }
  return (
    <ListContext.Provider value={{
      accomSelect: accomSelect,
      setAccomSelect: setAccomSelect,
      listAccom: listAccom,
      setListAccom: setListAccom,
      listNotification: listNotification
    }}>
      <AppProvider>
      <div className="App">
        <Switch>
          <Route path="/search" component={SearchPage}/>
          <Route path="/accom-detail" component={AccomDetail}/>
          <Route path="/inbox" component={Chat}/>
          <Route path="/fakelogin" component={LoginFake}/>

          <Route path="/user/manage">
              <Manage setAccomSelect={setAccomSelect}/>
          </Route>
          <Route exact path="/createAccom">
              <CreateAccom user={user} setIndex={setAccomSelect} index={accomSelect} token={token}/>
          </Route>
          <Route exact path="/createAccom/details">
              <DetailsAccom accountId={accountId} user={user} token={token}
              accom={accomSelect} />
          </Route>
          <Route path='/error'>
            <Error />
          </Route>

        </Switch>

        <div id='header'>
          <Switch>
            <Route exact path="/" component={Header} />
            <Route path="/registration" component={FirtHeader} />
            <Route path="/login" component={FirtHeader} />
            <Route path="/personal" component={FirtHeader} />
          </Switch>
        </div>
        <div id='container'>
            <Switch>
              <Route exact path="/" component={Main} />
              <Route path="/registration" component={Registration} />
              <Route path="/login" component={Login} />
              <Route path="/personal" component={Personal} />
            </Switch>
          </div>
          {/* <div id='footer'>
            <Footer/>
          </div> */}

      </div>
      </AppProvider>
    </ListContext.Provider>
  );
}

export default App;
