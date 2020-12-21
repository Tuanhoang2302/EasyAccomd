import React from 'react';
import {NavLink} from 'react-router-dom'
import {ObjSign} from './Registration';

class Login extends React.Component {
  handleSubmit(event){
    event.preventDefault();
    alert('hello');
  }
  render(){
    return(
        <div>
            <div className="login">
                <div className="back-right">
                    <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
                        <NavLink className="link-list" to="/registration">Đăng ký</NavLink>
                    </button>
                </div>
                <div className="back-left">
                    <form class="sign-in" onSubmit={this.handleSubmit}>
                        <h1 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG NHẬP</h1>
                        <ObjSign name="Địa chỉ email" nameId="emailInput" helpId="emailHelp" type="email"></ObjSign>
                        <ObjSign name="Mật khẩu" nameId="passwordInput" helpId="passwordHelp" type="password"></ObjSign>
                        <button type="submit" class="btn-main-directional">Đăng nhập</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
  }
}
export default Login;
