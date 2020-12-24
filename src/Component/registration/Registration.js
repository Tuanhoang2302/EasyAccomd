import React from 'react';
import {NavLink} from 'react-router-dom'

class ObjSign extends React.Component {
    render(){
        return(
            <div class="form-group">
                <label for={this.props.nameId}>{this.props.name}</label>
                <input type={this.props.type} class="sign-form-control" id={this.props.nameId} aria-describedby={this.props.helpId}></input>
            </div>
        );
    }
}
class Registration extends React.Component {
    handleSubmit(event){
        event.preventDefault();
        alert('hello');
    }
    render(){
        return(
            <div className="background-signup">
                <div className="registration">
                    <div className="back-left">
                        <form class="sign-up" onSubmit={this.handleSubmit}>
                            <h2 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG KÝ</h2>
                            <ObjSign name="Họ và tên" nameId="usernameInput" helpId="usernameHelp" type="text"></ObjSign>
                            <ObjSign name="Địa chỉ email" nameId="emailInput" helpId="emailHelp" type="email"></ObjSign>
                            <ObjSign name="Số điện thoại" nameId="phoneNumberInput" helpId="phoneNumberHelp" type="text"></ObjSign>
                            <ObjSign name="Địa chỉ" nameId="addressInput" helpId="addressHelp" type="text"></ObjSign>
                            <div style={{marginBottom: '0.5rem'}}>
                                <label for="typeAccount" className="form-label">Loại tài khoản:</label>
                                <select className="sign-form-control" id="typeAccountInput">
                                    <option value="renter">Người thuê trọ</option>
                                    <option value="owner">Chủ nhà trọ</option>
                                </select>
                            </div>
                            <ObjSign name="Mật khẩu" nameId="passwordInput" helpId="passwordHelp" type="password"></ObjSign>
                            <ObjSign name="Nhập lại mật khẩu" nameId="re-passwordInput" helpId="re-passwordHelp" type="password"></ObjSign>
                            <button type="submit" class="btn-main-directional">Đăng ký</button>
                        </form>
                    </div>
                    {/* <div className="back-right">
                        <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
                            <NavLink className="link-list" to="/login">Đăng nhập</NavLink>
                        </button>
                    </div> */}
                </div>
            </div>
        );
    }
}
export {Registration, ObjSign};