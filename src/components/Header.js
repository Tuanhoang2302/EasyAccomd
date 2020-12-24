import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


import {AppContext} from '../context/AppContext'

import '../css/common.css'
import '../css/components/header.css'

export default function({currentTab, tabs, onClick}) {
    const {user, typeOfUsers, listNotification} = useContext(AppContext);
    const [dialogAccount, setDialogAccount] = useState(false);
    const [dialogNoti, setDialogNoti] = useState(false);
    
    return (
        <div className="header">
            <Link to="/"><div className="header__logo"></div></Link>
            {user.type!==typeOfUsers.ADMIN && <div className="header__title"><label>Quản lý</label></div>}
            {user.type===typeOfUsers.ADMIN && <div className={currentTab===tabs.STATISTICAL? "header__menu__item tabOnSelect":"header__menu__item"} 
                onClick={()=>onClick(tabs.STATISTICAL)}>Thống kê</div>}
            {user.type===typeOfUsers.ADMIN && <div className={currentTab===tabs.POST? "header__menu__item tabOnSelect":"header__menu__item"}
                onClick={()=>onClick(tabs.POST)}>Bài đăng</div>}
            {user.type===typeOfUsers.ADMIN && <div className={currentTab===tabs.ACCOUNT? "header__menu__item tabOnSelect":"header__menu__item"}
                onClick={()=>onClick(tabs.ACCOUNT)}>Tài khoản</div>}
            {user.type===typeOfUsers.ADMIN && <div className={currentTab===tabs.TOP? "header__menu__item tabOnSelect":"header__menu__item"}
                onClick={()=>onClick(tabs.TOP)}>Top</div>}
            {user.type===typeOfUsers.ADMIN && <div className={currentTab===tabs.REQUEST? "header__menu__item tabOnSelect":"header__menu__item"}
                onClick={()=>onClick(tabs.REQUEST)}>Duyệt</div>}

            <ClickAwayListener onClickAway={()=>setDialogAccount(false)}>
                <div className="header__account" onClick={()=>setDialogAccount((prev) => !prev)}>
                    {dialogAccount && <div className="dialog">
                        <div className="dialog__item">Hồ sơ</div>
                        <div className="dialog__item">Tài khoản</div>
                        <div className="dialog__item">Hỗ trợ</div>
                        <div className="dialog__item">Đăng xuất</div>
                    </div>}
                </div>
            </ClickAwayListener>

            <ClickAwayListener onClickAway={() => setDialogNoti(false)}>
                <div className="header__notification" onClick={()=>setDialogNoti((prev) => !prev)}>
                    {
                        dialogNoti && 
                        <div className={"dialog"}>
                            {listNotification.map((notification, index) => 
                                <div className="dialog__item">
                                    {`${notification.user} đã ${notification.content} một bài viết của bạn.`}
                                </div>
                            )}
                        </div>
                    }
                </div>
            </ClickAwayListener>

            
            {
                user.type===typeOfUsers.OWNER &&
                    <div className="header__btnCreateAccom">
                        <Link to="/createAccom"><button>Tạo mục cho thuê mới</button></Link>
                    </div>
            }
            
        </div>
    )
}