import React from 'react';
import Body from './Body';
import Navbar from './Navbar';
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

const Chat = () => {
    const user = useSelector(state => state.user)
    if(user)
        return (
            <div>
                <Navbar/>
                <Body />
            </div>
        );
    else 
        return (<Redirect to={{pathname: '/login'}} />)
};

export default Chat;