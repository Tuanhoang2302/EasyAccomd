import React, {useState} from 'react'
import Header from './Header'
import AdminAccountTab from './AdminAccountTab'
import AdminPostTab from './AdminPostTab'
import AdminRequestTab from './AdminRequestTab'
import AdminStatisticalTab from './AdminStatisticalTab'
import AdminTopTab from './AdminTopTab'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const tabs = {
        STATISTICAL: 'statistical',
        POST: 'post',
        ACCOUNT: 'account',
        TOP: 'top',
        REQUEST: 'request'
    };
    const [currentTab, setCurrentTab] = useState(tabs.POST);
    return (
        <div className={manage.ManagerAdmin}>
            <Header currentTab={currentTab} tabs={tabs} onClick={(tab) => setCurrentTab(tab)}/>
            <div className={manage.content}>
                {
                    currentTab===tabs.STATISTICAL? <AdminStatisticalTab/>:
                    currentTab===tabs.POST? <AdminPostTab/>:
                    currentTab===tabs.ACCOUNT? <AdminAccountTab/>:
                    currentTab===tabs.TOP? <AdminTopTab/>:
                    currentTab===tabs.REQUEST? <AdminRequestTab/>: 'ERROR tab'
                }
            </div>
        </div>
    )
}