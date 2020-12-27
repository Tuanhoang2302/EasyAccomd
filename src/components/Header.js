import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom"
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import {AppContext} from '../context/AppContext'

import header from '../css/components/header.module.css'

export default function({currentTab, tabs, onClick}) {
    const {user, typeOfUsers, listNotification} = useContext(AppContext);
    const [dialogAccount, setDialogAccount] = useState(false);
    const [dialogNoti, setDialogNoti] = useState(false);
    
    return (
        <div className={header.header}>
            <Link to="/"><div className={header.header__logo}></div></Link>
            {user.type!==typeOfUsers.ADMIN && <div className={header.header__title}><label>Quản lý</label></div>}
            {user.type===typeOfUsers.ADMIN && <div className={`${header.header__menu__item}  ${currentTab===tabs.STATISTICAL?  header.tabOnSelect:null}`} 
                onClick={()=>onClick(tabs.STATISTICAL)}>Thống kê</div>}
            {user.type===typeOfUsers.ADMIN && <div className={`${header.header__menu__item}  ${currentTab===tabs.POST?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.POST)}>Bài đăng</div>}
            {user.type===typeOfUsers.ADMIN && <div className={`${header.header__menu__item}  ${currentTab===tabs.ACCOUNT?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.ACCOUNT)}>Tài khoản</div>}
            {user.type===typeOfUsers.ADMIN && <div className={`${header.header__menu__item}  ${currentTab===tabs.TOP?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.TOP)}>Top</div>}
            {user.type===typeOfUsers.ADMIN && <div className={`${header.header__menu__item}  ${currentTab===tabs.REQUEST?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.REQUEST)}>Duyệt</div>}

            <ClickAwayListener onClickAway={()=>setDialogAccount(false)}>
                <div className={header.header__account} onClick={()=>setDialogAccount((prev) => !prev)}>
                    {dialogAccount && <div className={header.dialog}>
                        <div className={header.dialog__item}>Hồ sơ</div>
                        <div className={header.dialog__item}>Tài khoản</div>
                        <div className={header.dialog__item}>Hỗ trợ</div>
                        <div className={header.dialog__item}>Đăng xuất</div>
                    </div>}
                </div>
            </ClickAwayListener>

            <ClickAwayListener onClickAway={() => setDialogNoti(false)}>
                <div className={header.header__notification} onClick={()=>setDialogNoti((prev) => !prev)}>
                    {
                        dialogNoti && 
                        <div className={header.dialog}>
                            {listNotification.map((notification) => 
                                <div className={header.dialog__item}>
                                    {`${notification.user} đã ${notification.content} một bài viết của bạn.`}
                                </div>
                            )}
                        </div>
                    }
                </div>
            </ClickAwayListener>

            
            {
                user.type===typeOfUsers.OWNER &&
                    <div className={header.header__btnCreateAccom}>
                        <Link to="/createAccom"><button>Tạo mục cho thuê mới</button></Link>
                    </div>
            }
            
        </div>
    )
}