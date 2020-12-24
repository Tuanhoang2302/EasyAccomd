import React, {useState} from 'react'
import Header from './Header'
import AdminAccountTab from './AdminAccountTab'
import AdminPostTab from './AdminPostTab'
import AdminRequestTab from './AdminRequestTab'
import AdminStatisticalTab from './AdminStatisticalTab'
import AdminTopTab from './AdminTopTab'

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
        <div className="ManagerAdmin">
            <Header currentTab={currentTab} tabs={tabs} onClick={(tab) => setCurrentTab(tab)}/>
            <div className="content">
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