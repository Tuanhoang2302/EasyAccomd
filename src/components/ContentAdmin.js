import React, {useContext, useState} from 'react'
import Header from './Header'
import ListContext from '../context/ListContext'
import ContentAdminAccountTab from './ContentAdminAccountTab'
import ContentAdminPostTab from './ContentAdminPostTab'
import ContentAdminRequestTab from './ContentAdminRequestTab'
import ContentAdminStatisticalTab from './ContentAdminSatisticalTab'
import ContentAdminTopTab from './ContentAdminTopTab'

export default function(props) {
    const adminTabs = {
        STATISTICAL: 'statistical',
        POST: 'post',
        ACCOUNT: 'account',
        TOP: 'top',
        REQUEST: 'request'
    };
    const [currentTab, setCurrentTab] = useState(adminTabs.POST);
    return (
        <div>
            <Header currentTab={currentTab} adminTabs={adminTabs} onClick={(tabOnClick) => setCurrentTab(tabOnClick)}/>
            <div className="content">
                {
                    currentTab===adminTabs.STATISTICAL? <ContentAdminStatisticalTab formats={props.formats}/>:
                    currentTab===adminTabs.POST? <ContentAdminPostTab formats={props.formats}/>:
                    currentTab===adminTabs.ACCOUNT? <ContentAdminAccountTab formats={props.formats}/>:
                    currentTab===adminTabs.TOP? <ContentAdminTopTab formats={props.formats}/>:
                    currentTab===adminTabs.REQUEST? <ContentAdminRequestTab formats={props.formats}/>: 'ERROR'
                }
            </div>
        </div>
    )
}