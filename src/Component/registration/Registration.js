import React from 'react';
// import {NavLink} from 'react-router-dom'

class ObjSign extends React.Component {
    render(){
        return(
            <div class="form-group">
                <label for={this.props.nameId}>{this.props.name}</label>
                <input type={this.props.type} class="sign-form-control" name={this.props.nameId} aria-describedby={this.props.helpId}></input>
                <small className="wrong"></small>
            </div>
        );
    }
}
class Registration extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            usernameInput : '',
            emailInput : '',
            phoneNumberInput : '',
            addressInput : '',
            passwordInput : '',
            rePasswordInput : '',
            checkValidation: false,
            warningFullname: true,
            warningPhone: true,
            warningEmail: true,
            warningPassword: true,
            warningCfPassword: true,
            warningAddress: true
        };
        this.onHandleChange=this.onHandleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }
    onHandleChange(event){
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name] : value
        });
    }

    //xử lý sự kiện khi ấn btn register
    validationForm(){
        var check=true;
        if(this.checkusernameInput() === false) check=false;
        if(this.checkemailInput() === false) check=false;
        if(this.checkphoneNumberInput() === false) check=false;
        if(this.checkaddressInput() === false) check=false;
        if(this.checkpasswordInput() === false) check=false;
        if(this.checkrePasswordInput() === false) check=false;
        return check;
    }

    //kiem tra fullname
    checkusernameInput(){
        const {usernameInput} = this.state;
        if(usernameInput.length === 0){
            document.getElementsByClassName("wrong").innerText = "Vui lòng nhập họ và tên!";
            this.setState({
                warningFullname: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningFullname: true
            })
            return true;
        }
    }
    //kiem tra email
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

    //kiểm tra địa chỉ
    checkaddressInput(){
        const {addressInput} = this.state;
        console.log(addressInput);
        if(addressInput.length === 0){
            document.getElementsByClassName("wrong").innerText = "Vui lòng nhập địa chỉ!";
            this.setState({
                warningAddress: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningAddress: true
            })
            return true;
        }
    }

    //kiểm tra phone
    checkphoneNumberInput(){
        const {phoneNumberInput} = this.state;
        const regexPhone = /^[0-9]{10}$/;
        if(phoneNumberInput.length !== 10 && !regexPhone.test(phoneNumberInput)){
            document.getElementsByClassName("wrong").innerText = "Số điện thoại phải đúng 10 số!";
            this.setState({
                warningPhone: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningPhone: true
            })
            return true;
        }
    }

    //kiểm tra mk
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

    //kiểm tra cf mk
    checkrePasswordInput(){
        const {passwordInput, rePasswordInput} = this.state;
        if(passwordInput !== rePasswordInput){
            document.getElementsByClassName("wrong").innerText = "Mật khẩu không trùng khớp!";
            this.setState({
                warningCfPassword: false
            })
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            this.setState({
                warningCfPassword: true
            })
            return true;
        }
    }
    handleSubmit(event){
        event.preventDefault();
        const validation = this.validationForm();
        if(validation) alert("complete")
    }
    render(){
        return(
            <div className="background-signup">
                <div className="registration">
                    <div className="back-left">
                        <form class="sign-up" onSubmit={this.handleSubmit}>
                            <h2 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG KÝ</h2>
                            <div class="form-group">
                                <label for="usernameInput">Họ và tên</label>
                                <input onChange={this.onHandleChange} type="text" value={this.state.usernameInput} class="sign-form-control" name="usernameInput" aria-describedby="usernameHelp"/>
                                {!this.state.warningFullname? <small class="wrong">Vui lòng nhập họ và tên!</small>:null}
                            </div>
                            <div class="form-group">
                                <label for="emailInput">Địa chỉ email</label>
                                <input onChange={this.onHandleChange} type="email" value={this.state.emailInput} class="sign-form-control" name="emailInput" aria-describedby="emailHelp"/>
                                {!this.state.warningEmail? <small class="wrong">Địa chỉ email không hợp lệ!</small>:null}
                            </div>
                            <div class="form-group">
                                <label for="phoneNumberInput">Số điện thoại</label>
                                <input onChange={this.onHandleChange} type="text" value={this.state.phoneNumberInput} class="sign-form-control" name="phoneNumberInput" aria-describedby="phoneNumberHelp"/>
                                {!this.state.warningPhone? <small class="wrong">Số điện thoại phải đúng 10 số!</small>:null}
                            </div>
                            <div class="form-group">
                                <label for="addressInput">Địa chỉ</label>
                                <input onChange={this.onHandleChange} type="text" value={this.state.addressInput} class="sign-form-control" name="addressInput" aria-describedby="addressHelp"/>
                                {!this.state.warningAddress? <small class="wrong">Vui lòng nhập địa chỉ!</small>:null}
                            </div>
                            <div style={{marginBottom: '0.5rem'}}>
                                <label for="typeAccount" className="form-label">Loại tài khoản:</label>
                                <select className="sign-form-control" name="typeAccountInput">
                                    <option value="renter">Người thuê trọ</option>
                                    <option value="owner">Chủ nhà trọ</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="passwordInput">Mật khẩu</label>
                                <input onChange={this.onHandleChange} type="password" value={this.state.passwordInput} class="sign-form-control" name="passwordInput" aria-describedby="passwordHelp"/>
                                {!this.state.warningPassword? <small class="wrong">Mật khẩu phải hơn 8 ký tự, có chữ hoa, chữ thường, chữ số!</small>:null}
                            </div>
                            <div class="form-group">
                                <label for="passwordInput">Nhập lại mật khẩu</label>
                                <input onChange={this.onHandleChange} type="password" value={this.state.rePasswordInput} class="sign-form-control" name="rePasswordInput" aria-describedby="rePasswordHelp"/>
                                {!this.state.warningCfPassword? <small className="wrong">Mật khẩu không trùng khớp!</small>:null}
                            </div>
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