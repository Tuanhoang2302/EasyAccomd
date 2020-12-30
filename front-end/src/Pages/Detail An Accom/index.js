import React from 'react';
import Body from './Body';
import NavBar from '../Search Page/Navbar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

const AccomDetail = (props) => {
    const user = useSelector(state => state.user)
    const location = useLocation();
    if(user)
        return (
            <div>
                <NavBar/>
                <Body id={location.state.id}/>
            </div>
        );
    else 
        return (<Redirect to={{pathname: '/login'}} />)
};

export default AccomDetail;