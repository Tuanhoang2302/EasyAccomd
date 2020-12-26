import React, {useContext, useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useDispatch,useSelector} from 'react-redux'

import {AppContext} from '../context/AppContext'
import header from '../css/components/header.module.css'
import socketIOClient from "socket.io-client";
import axios from 'axios'
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
});

export default function({currentTab, tabs, onClick}) {
    const {user, typeOfUsers, listNotification} = useContext(AppContext);
    const [dialogAccount, setDialogAccount] = useState(false);
    const [dialogNoti, setDialogNoti] = useState(false);
    const userRedux = useSelector(state => state.user)
    const [notisList, setNotisList] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            await socket.emit("first time", {
                email: userRedux.email
            })
            await socket.on("server send notification to admin", (data) => {
                console.log(data);
                setNotisList(state => [...state, data])
             });
          };
        fetchData();
    }, [ENDPOINT]);

    useEffect(() => {
        const fetchData = async () => {
            var noties = await axios.get("http://localhost:3001/notification/getAll", {
                params: {
                    receiverId: userRedux._id
                }
            })
            setNotisList(noties.data)
          };
        fetchData();
    }, [])
    return (
        <div className={header.header}>
            <Link to="/"><div className={header.header__logo}></div></Link>
            
            {userRedux.type!=="admin" && <div className={header.header__title}><label>Quản lý</label></div>}
            {userRedux.type==="admin" && <div className={`${header.header__menu__item}  ${currentTab===tabs.STATISTICAL?  header.tabOnSelect:null}`} 
                onClick={()=>onClick(tabs.STATISTICAL)}>Thống kê</div>}
            {userRedux.type==="admin" && <div className={`${header.header__menu__item}  ${currentTab===tabs.POST?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.POST)}>Bài đăng</div>}
            {userRedux.type==="admin" && <div className={`${header.header__menu__item}  ${currentTab===tabs.ACCOUNT?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.ACCOUNT)}>Tài khoản</div>}
            {userRedux.type==="admin" && <div className={`${header.header__menu__item}  ${currentTab===tabs.TOP?  header.tabOnSelect:null}`}
                onClick={()=>onClick(tabs.TOP)}>Top</div>}
            {userRedux.type==="admin" && <div className={`${header.header__menu__item}  ${currentTab===tabs.REQUEST?  header.tabOnSelect:null}`}
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
                {notisList.length > 0 ? 
                    <div style ={{top: "0px", position:"absolute", color:"red"}}>{notisList.length}</div>
                :null}
                    {
                        dialogNoti && 
                        <div className={header.dialog}>
                        {(notisList && userRedux.type =="admin") ? 
                            <div>
                                {notisList.map((notification, index) => 
                                    <div className={header.dialog__item}>
                                        {`${notification.senderId} request một ${notification.type} cho bạn.`}
                                    </div>
                                )}
                            </div>
                        :null}
                        </div>
                    }
                </div>
            </ClickAwayListener>

            
            {
                userRedux.type==="owner" &&
                <div>
                    <div className={header.header__btnCreateAccom}>
                        <Link to="/createAccom"><button>Tạo mục cho thuê mới</button></Link>
                    </div>
                    <div className={header.header__btnCreateAccom}>
                        <Link to="/createAccom"><button>Tạo thông báo ưu đãi</button></Link>
                    </div>
                </div>
            }
            
        </div>
    )
}