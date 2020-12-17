import React from 'react';
import Body from './Body';
import NavBar from '../../Search Page/Navbar';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const AccomDetail = (props) => {
    const location = useLocation();
    return (
        <div>
            <NavBar/>
            <Body id={location.state.id}/>
        </div>
    );
};

export default AccomDetail;