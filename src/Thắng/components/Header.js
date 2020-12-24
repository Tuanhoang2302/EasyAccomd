import React, {useEffect, useState, Component } from 'react'
import {
    Link
  } from "react-router-dom";

import ListContext from '../context/ListContext'
import socketIOClient from "socket.io-client";
import '../css/common.css'
import '../css/components/header.css'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
});

const Home = () => {
    const [showing, setShowing] = useState("")
    const [notisList, setNotisList] = useState([])
    const user = useSelector(state => state.user)
    useEffect(() => {
        const fetchData = async () => {
            await socket.emit("first time", {
                email: user.email
            })
            await socket.on("server send notification to admin", (data) => {
                setNotisList(state => [...state, data])
             });
          };
        fetchData();
    }, [ENDPOINT]);

    useEffect(() => {
        const fetchData = async () => {
            var noties = await axios.get("http://localhost:3001/notification/getAll")
            setNotisList(noties.data)
          };
        fetchData();
    }, [])

    const accountOnClick = () => {
        if(showing == "account") {
            setShowing("")
        } else {
            setShowing("account")
        }
    }

    const notificationOnClick = () => {
        if(showing == "notification") {
            setShowing("")
        } else {
            setShowing("notification")
        }
    }
    return (
        <div className="header">
            <Link to="/">
                <div className="header__logo"></div>
            </Link>
            <div className="header__title">
                <label>Quản lý</label>
            </div>
            <div className="header__account" onClick={accountOnClick}>
                <div className={"dialog" + (showing==="account"? "":" hidden")}>
                    <div className="dialog__item">Hồ sơ</div>
                    <div className="dialog__item">Tài khoản</div>
                    <div className="dialog__item">Hỗ trợ</div>
                    <div className="dialog__item">Đăng xuất</div>
                </div>
            </div>
            
            <div className="header__notification" onClick={notificationOnClick}>
            {(notisList && user.type=="admin") ?
            <div style={{position:"absolute", top:"0px", color:"red"}}>{notisList.length}</div>
            : null}
                <div className={"dialog" + (showing==="notification"? "":" hidden")}>
                    {(notisList && user.type=="admin") ? 
                    <div>
                        {notisList.map((notification, index) => 
                            <div className="dialog__item">
                                {`${notification.accountId} request một ${notification.type} cho bạn.`}
                            </div>
                        )}
                    </div>
                    :null}
                </div>
            </div>
            <div className="header__btnCreateAccom">
                <Link to="/createAccom"><button>Tạo mục cho thuê mới</button></Link>
            </div>
        </div>
    );
};

export default Home;