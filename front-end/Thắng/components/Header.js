import React, { Component } from 'react'
import {
    Link
  } from "react-router-dom";

import ListContext from '../context/ListContext'

import '../css/common.css'
import '../css/components/header.css'

class Home extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            showing: ""
        }
    }

    accountOnClick() {
        this.setState(state => {
            if (state.showing === "account") {
                return {
                    showing: ""
                }
            }
            return {
                showing: "account"
            }
        })
    }

    notificationOnClick() {
        this.setState(state => {
            if (state.showing === "notification") {
                return {
                    showing: ""
                }
            }
            return {
                showing: "notification"
            }
        })
    }

    render() {
        var self = this;
        return (
            <ListContext.Consumer>
                {({listNotification}) => 
                    <div className="header">
                        <Link to="/">
                            <div className="header__logo"></div>
                        </Link>
                        <div className="header__title">
                            <label>Quản lý</label>
                        </div>
                        <div className="header__account" onClick={self.accountOnClick.bind(self)}>
                            <div className={"dialog" + (self.state.showing==="account"? "":" hidden")}>
                                <div className="dialog__item">Hồ sơ</div>
                                <div className="dialog__item">Tài khoản</div>
                                <div className="dialog__item">Hỗ trợ</div>
                                <div className="dialog__item">Đăng xuất</div>
                            </div>
                        </div>
                        <div className="header__notification" onClick={self.notificationOnClick.bind(self)}>
                            <div className={"dialog" + (self.state.showing==="notification"? "":" hidden")}>
                                {listNotification.map((notification, index) => 
                                    <div className="dialog__item">
                                        {`${notification.user} đã ${notification.content} một bài viết của bạn.`}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="header__btnCreateAccom">
                            <Link to="/createAccom"><button>Tạo mục cho thuê mới</button></Link>
                        </div>
                    </div>
                }
            </ListContext.Consumer>
        )
    }
}

export default Home;