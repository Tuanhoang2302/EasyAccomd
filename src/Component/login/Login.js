import React from 'react';
import {NavLink} from 'react-router-dom'
import {ObjSign} from '../registration/Registration';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.onHandleChange=this.onHandleChange.bind(this);
        this.state={
            emailInput : '',
            passwordInput : '',
            warningEmail: true,
            warningPassword: true
        };
    }
    onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }
    validationForm(){
        var check=true;
        if(this.checkemailInput() === false) check=false;
        if(this.checkpasswordInput() === false) check=false;
        return check;
    }
    checkemailInput(){
        const {emailInput} = this.state;
        const regexEmail = /\S+@\S+\.\S+/;
        if (!regexEmail.test(emailInput) && emailInput.length === 0) {
            document.getElementsByClassName("wrong").innerText = "Địa chỉ email không hợp lệ!";
            this.setState({
                warningEmail: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningEmail: true
            })
            return true;
        }
    }
    checkpasswordInput(){
        const {passwordInput} = this.state;
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!regexPass.test(passwordInput)){
            document.getElementsByClassName("wrong").innerText = "Mật khẩu phải hơn 8 ký tự, có chữ hoa, chữ thường, chữ số!";
            this.setState({
                warningPassword: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningPassword: true
            })
            return true;
        }
    }
  handleSubmit(event){
    event.preventDefault();
    const validation = this.validationForm();
    if(validation) alert('complete');
  }
  render(){
    return(
        <div className= "background-signup">
            <div className="login">
                <div className="back-right">
                    <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
                        <NavLink className="link-list" to="/registration">Đăng ký</NavLink>
                    </button>
                </div>
                <div className="back-left">
                    <form class="sign-in" onSubmit={this.handleSubmit}>
                        <h1 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG NHẬP</h1>
                        <div class="form-group">
                                <label for="emailInput">Địa chỉ email</label>
                                <input onChange={this.onHandleChange} type="email" value={this.state.emailInput} class="sign-form-control" name="emailInput" aria-describedby="emailHelp"/>
                                {!this.state.warningEmail? <small class="wrong">Địa chỉ email không hợp lệ!</small>:null}
                        </div>
                        <div class="form-group">
                                <label for="passwordInput">Mật khẩu</label>
                                <input onChange={this.onHandleChange} type="password" value={this.state.passwordInput} class="sign-form-control" name="passwordInput" aria-describedby="passwordHelp"/>
                                {!this.state.warningPassword? <small class="wrong">Mật khẩu phải hơn 8 ký tự, có chữ hoa, chữ thường, chữ số!</small>:null}
                        </div>
                        <button type="submit" class="btn-main-directional">Đăng nhập</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
  }
}
export default Login;