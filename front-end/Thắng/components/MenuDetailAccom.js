import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import '../css/pages/detailsAccom.css';
import '../css/common.css'

class MenuDetailAccom extends Component {
    constructor(props) {
        super(props);
    }

    click(setTab, tab) {
        setTab(tab);
    }

    render() {
        return (
            <div className="MenuDetailAccom">
                <div className="title"><h2>Hoàn tất mục cho thuê của bạn để bắt đầu kiếm tiền</h2></div>
                <div className="subTitle">Bạn luôn có thể chỉnh sửa mục cho thuê của mình sau khi đăng.</div>
                <br/><br/>
                <ul>
                    <li onClick={this.click.bind(this, this.props.setTab, this.props.tabs.ADDRESS)}>Địa chỉ</li>
                    <li onClick={this.click.bind(this, this.props.setTab, this.props.tabs.CONVENIENCES)}>Tiện nghỉ</li>
                    <li onClick={this.click.bind(this, this.props.setTab, this.props.tabs.IMAGE)}>Ảnh</li>
                    <li onClick={this.click.bind(this, this.props.setTab, this.props.tabs.TITLE)}>Tiêu đề và mô tả</li>
                    <li onClick={this.click.bind(this, this.props.setTab, this.props.tabs.PRICE)}>Định giá</li>
                </ul>
            </div>
        )
    }
}

export default MenuDetailAccom;