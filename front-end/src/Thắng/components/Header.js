import React, {useContext, useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {useDispatch,useSelector} from 'react-redux'
import { useHistory } from "react-router-dom";
import {AppContext} from '../context/AppContext'
import header from '../css/components/header.module.css'
import { IoMdNotifications } from "react-icons/io";
import Badge from '@material-ui/core/Badge';
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
    const [numberNotiDisplay, setNumberNotiDisplay] = useState(0)
    // if(notisList.length > 0){
    //     for(let i = 0 ; i < notisList.length; i++){
    //         if(notisList[i].isChecked == false){
    //             uncheckedNoti.push(notisList[i])
    //         }
    //     }
    // }
    const history = useHistory()
    useEffect(() => {
        const fetchData = async () => {
            await socket.emit("first time", {
                email: userRedux.email
            })
            await socket.on("server send notification to admin", (data) => {
                setNumberNotiDisplay(notisList.length + 1)
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
            var counter = 0
            for(let i = 0 ; i < noties.data.length; i++){
                if(noties.data[i].isChecked == false){
                    counter++
                }
            }
            setNumberNotiDisplay(counter)
            setNotisList(noties.data)
          };
        fetchData();
    }, [])

    const goToDetailAccom = async (e, noti) => {
        await axios.get("http://localhost:3001/notification/update/seenNoti", {params: {
            notiId: noti._id
        }})
        history.push({
            pathname: `/accom-detail/id=${noti.accomId}`,
            state: {
                id: noti.accomId
            }
        })
    }
    return (
        <div className={header.header}>
            <Link to="/"><div className={header.header__logo}></div></Link>
            
            {userRedux.type!=="admin" && <div className={header.header__title}><div>Quản lý</div></div>}
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
                    <Badge badgeContent={numberNotiDisplay} color="error">
                        <IoMdNotifications style={{width:35, height:35}} />
                    </Badge>
                    {
                        dialogNoti && 
                        <div className={header.dialog}>
                        {(notisList && userRedux.type =="admin") ? 
                            <div>
                                {notisList.map((notification, index) => {
                                    var colorText
                                    if(notification.isChecked){
                                        colorText = "grey"
                                    } else {
                                        colorText = "black"
                                    }
                                    return <div style={{color:colorText}} onClick={(e) => goToDetailAccom(e, notification)} className={header.dialog__item}>
                                        {`Một người dùng đã ${notification.type} cho bạn.`}
                                    </div>
                                }
                                )}
                            </div>
                        :(notisList && userRedux.type !="admin") ?
                            <div>
                                {notisList.map((notification, index) => {
                                    var colorText
                                    if(notification.isChecked){
                                        colorText = "grey"
                                    } else {
                                        colorText = "black"
                                    }
                                    return <div style={{color:colorText}} onClick={(e) => goToDetailAccom(e, notification)} className={header.dialog__item}>
                                        {`admin đã ${notification.type}.`}
                                    </div>
                                    }
                                )}
                            </div>
                        : null}
                        </div>
                    }
                </div>
            </ClickAwayListener>

            
            {
                userRedux.type==="owner" &&
               
                <div className={header.header__btnCreateAccom}>
                    <Link to="/createAccom"><div style={{backgroundColor:"#008489", padding:10, color:"white", borderRadius:8}}>
                    Tạo mục cho thuê mới</div></Link>
                </div>

               
            }
            
        </div>
    )
}