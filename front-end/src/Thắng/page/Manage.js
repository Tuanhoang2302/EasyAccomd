import React, { useContext } from 'react'

import Footer from '../components/Footer'
import ContentAdmin from '../components/ManagerAdmin'
import ContentOwner from '../components/ManagerOwner'
import ContentRenter from '../components/ManagerRenter'
import { AppContext } from '../context/AppContext'
import ManageProvider from '../context/ManageContext'
import {useDispatch,useSelector} from 'react-redux'
import manage from '../css/pages/manage.module.css'
import PVT_common from '../css/common.module.css'
import {Redirect} from 'react-router-dom'
export default function(props) {
    const {user, typeOfUsers} = useContext(AppContext);
    const userRedux = useSelector(state => state.user)
    //console.log(userRedux.type);
    if(userRedux)
        return (
            <ManageProvider>
                <div className={`${manage.Manage} ${PVT_common.common}`}>
                    {userRedux.type === "renter" && <ContentRenter />}
                    {userRedux.type === "owner" && <ContentOwner setAccomSelect = {props.setAccomSelect} />}
                    {userRedux.type === "admin" && <ContentAdmin />}
                    
                </div>
            </ManageProvider>
        )
    else 
        return (<Redirect to={{pathname: '/login'}} />)
}