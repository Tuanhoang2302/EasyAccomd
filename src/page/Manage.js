import { common } from '@material-ui/core/colors'
import React, { useContext } from 'react'

import Footer from '../components/Footer'
import ContentAdmin from '../components/ManagerAdmin'
import ContentOwner from '../components/ManagerOwner'
import ContentRenter from '../components/ManagerRenter'
import { AppContext } from '../context/AppContext'
import ManageProvider from '../context/ManageContext'

import PVT_common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const {user, typeOfUsers} = useContext(AppContext);
    return (
        <ManageProvider>
            <div className={`${manage.Manage} ${PVT_common.common}`}>
                {user.type === typeOfUsers.RENTER && <ContentRenter />}
                {user.type === typeOfUsers.OWNER && <ContentOwner />}
                {user.type === typeOfUsers.ADMIN && <ContentAdmin />}
                <Footer />
            </div>
        </ManageProvider>
    )
}