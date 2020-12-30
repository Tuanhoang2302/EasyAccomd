import React from 'react';
import Body from './Body';
import Footer from './Footer';
import NavBar from './Navbar';
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'

const SearchPage = () => {
    const user = useSelector(state => state.user)
    if(user)
        return (
            <div>
                <NavBar/>
                <Body />
                {/* <Footer/> */}
            </div>
        );
    else 
        return (<Redirect to={{pathname: '/login'}} />)
};

export default SearchPage;