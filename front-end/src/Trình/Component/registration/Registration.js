// import React, {useState} from 'react';
// import {NavLink} from 'react-router-dom'
// import axios from 'axios'
// import { useHistory } from "react-router-dom";
// import DialogTitle from '@material-ui/core/DialogTitle';
// import Dialog from '@material-ui/core/Dialog';

// const ObjSign = (props) => {
//     return (
//         <div class="form-group">
//             <label for={props.nameId}>{props.name}</label>
//             <input onChange={props.handleChange}
//             type={props.type} class="sign-form-control" id={props.nameId} aria-describedby={props.helpId}/>
//         </div>
//     );
// };

// const Registration = () => {
//     var state = {
//         email: null,
//         password: null,
//         type: null,
//         fullname: null,
//         address: null,
//         phoneNumber:null
//     }
//     const [account, setAccount] = useState(state)
//     const [open, setOpen] = useState(false)
//     const history = useHistory()
//     console.log(account);
//     const handleSubmit = async (event) =>{
//         event.preventDefault();
//         console.log(account);
        
        // await axios.post("http://localhost:3001/auth/register", {
        //     email: account.email,
        //     password: account.password,
        //     type: account.type,
        //     fullname: account.fullname,
        //     address: account.address,
        //     phoneNumber:account.phoneNumber
        // }).then((res) => {
        //     console.log("fds");
        //     setOpen(true)
        // }).catch((err) =>{
        //     console.log(err);
        // })
//     }
  
//     const handleChange = (e, key) => {
//         setAccount({...account, [key]: e.target.value})
//     }

//     const handleChangeSelect = (e) => {
//         setAccount({...account, ["type"]: e.target.value})
//     }
//     const handleClose = () =>{
//         setOpen(false)
//         console.log("Hello");
//     }
//     const handleClick = () => {
//         history.push('/login')
//     }
//     return (
//         <div className="background-signup">
//             <div className="registration">
//                 <div className="back-left">
//                     <form class="sign-up" onSubmit={handleSubmit}>
//                         <h2 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG KÝ</h2>
//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "fullname")}
//                         name="Họ và tên" nameId="usernameInput" helpId="usernameHelp" type="text"/>
                        
//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "email")}
//                         name="Địa chỉ email" nameId="emailInput" helpId="emailHelp" type="email"/>

//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "phoneNumber")}
//                         name="Số điện thoại" nameId="phoneNumberInput" helpId="phoneNumberHelp" type="text"/>

//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "address")}
//                         name="Địa chỉ" nameId="addressInput" helpId="addressHelp" type="text"/>

//                         <div style={{marginLeft: '20px', marginBottom: '0.5rem'}}>
//                             <label for="typeAccount" className="form-label">Loại tài khoản:</label>
//                             <select onChange={handleChangeSelect} className="sign-form-control" id="typeAccountInput" style={{width: '90%'}}>
//                                 <option value="renter">Người thuê trọ</option>
//                                 <option value="owner">Chủ nhà trọ</option>
//                             </select>
//                         </div>

//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "password")}
//                         name="Mật khẩu" nameId="passwordInput" helpId="passwordHelp" type="password"></ObjSign>

//                         <ObjSign account={account} handleChange={(e) => handleChange(e, "re-password")}
//                         name="Nhập lại mật khẩu" nameId="re-passwordInput" helpId="re-passwordHelp" type="password"></ObjSign>
//                         <button type="submit" class="btn-main-directional">Đăng ký</button>
//                     </form>
//                 </div>

//                 <div className="back-right">
//                     <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
//                         <NavLink className="link-list" to="/login">Đăng nhập</NavLink>
//                     </button>
                    // <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                    //     <DialogTitle id="simple-dialog-title">Bạn đã đăng ký thành công</DialogTitle>
                    //     <button onClick={handleClick}>Chuyển tới trang đăng nhập</button>
                    // </Dialog>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export {Registration, ObjSign};

import React from 'react';
import axios from 'axios'
import { NavLink } from 'react-router-dom';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

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
            type:"renter",
            checkValidation: false,
            warningFullname: true,
            warningPhone: true,
            warningEmail: true,
            warningExistingEmail:false,
            warningPassword: true,
            warningCfPassword: true,
            warningAddress: true,
            isOpen:false
        };
        this.onHandleChange=this.onHandleChange.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
        this.handleClose= this.handleClose.bind(this);
        //this.handleClick= this.handleClick.bind(this);
        this.handleChangeSelect= this.handleChangeSelect.bind(this);

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
    async handleSubmit(event){
        event.preventDefault();
        const validation = this.validationForm();
        if(validation) {
            await axios.post("http://localhost:3001/auth/register", {
                email: this.state.emailInput,
                password: this.state.passwordInput,
                type: this.state.type,
                fullname: this.state.usernameInput,
                address: this.state.addressInput,
                phoneNumber:this.state.phoneNumberInput
            }).then((res) => {
                this.setState({
                    isOpen: true
                })
                this.setState({
                    warningExistingEmail: false
                })
            }).catch((err) =>{
                this.setState({
                    warningExistingEmail: true
                })
                console.log( err.response.data)
            })
        }
    }
    handleChangeSelect(e){
        console.log(e.target.value);
        this.setState({
            type: e.target.value
        })
    }
    handleClose(){
        this.setState({
            isOpen: false
        })
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
                                {this.state.warningExistingEmail ? <small class="wrong">Địa chỉ email đã có người sử dụng!</small>:null}
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
                            <div style={{marginBottom: '0.6rem'}}>
                                <label for="typeAccount" className="form-label">Loại tài khoản:</label>
                                <select value={this.state.type}
                                onChange={this.handleChangeSelect} className="sign-form-control" name="typeAccountInput">
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
                            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" open={this.state.isOpen}>
                                <DialogTitle id="simple-dialog-title">Bạn đã đăng ký thành công</DialogTitle>
                                <NavLink to="/login"><button>Chuyển tới trang đăng nhập</button></NavLink>
                            </Dialog>
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