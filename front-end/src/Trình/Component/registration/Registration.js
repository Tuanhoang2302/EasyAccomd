import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const ObjSign = (props) => {
    return (
        <div class="form-group">
            <label for={props.nameId}>{props.name}</label>
            <input onChange={props.handleChange}
            type={props.type} class="sign-form-control" id={props.nameId} aria-describedby={props.helpId}/>
        </div>
    );
};

const Registration = () => {
    var state = {
        email: null,
        password: null,
        type: null,
        fullname: null,
        address: null,
        phoneNumber:null
    }
    const [account, setAccount] = useState(state)
    const [open, setOpen] = useState(false)
    const history = useHistory()
    console.log(account);
    const handleSubmit = async (event) =>{
        event.preventDefault();
        console.log(account);
        
        await axios.post("http://localhost:3001/auth/register", {
            email: account.email,
            password: account.password,
            type: account.type,
            fullname: account.fullname,
            address: account.address,
            phoneNumber:account.phoneNumber
        }).then((res) => {
            console.log("fds");
            setOpen(true)
        }).catch((err) =>{
            console.log(err);
        })
    }
  
    const handleChange = (e, key) => {
        setAccount({...account, [key]: e.target.value})
    }

    const handleChangeSelect = (e) => {
        setAccount({...account, ["type"]: e.target.value})
    }
    const handleClose = () =>{
        setOpen(false)
        console.log("Hello");
    }
    const handleClick = () => {
        history.push('/login')
    }
    return (
        <div className="background-signup">
            <div className="registration">
                <div className="back-left">
                    <form class="sign-up" onSubmit={handleSubmit}>
                        <h2 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG KÝ</h2>
                        <ObjSign account={account} handleChange={(e) => handleChange(e, "fullname")}
                        name="Họ và tên" nameId="usernameInput" helpId="usernameHelp" type="text"/>
                        
                        <ObjSign account={account} handleChange={(e) => handleChange(e, "email")}
                        name="Địa chỉ email" nameId="emailInput" helpId="emailHelp" type="email"/>

                        <ObjSign account={account} handleChange={(e) => handleChange(e, "phoneNumber")}
                        name="Số điện thoại" nameId="phoneNumberInput" helpId="phoneNumberHelp" type="text"/>

                        <ObjSign account={account} handleChange={(e) => handleChange(e, "address")}
                        name="Địa chỉ" nameId="addressInput" helpId="addressHelp" type="text"/>

                        <div style={{marginLeft: '20px', marginBottom: '0.5rem'}}>
                            <label for="typeAccount" className="form-label">Loại tài khoản:</label>
                            <select onChange={handleChangeSelect} className="sign-form-control" id="typeAccountInput" style={{width: '90%'}}>
                                <option value="renter">Người thuê trọ</option>
                                <option value="owner">Chủ nhà trọ</option>
                            </select>
                        </div>

                        <ObjSign account={account} handleChange={(e) => handleChange(e, "password")}
                        name="Mật khẩu" nameId="passwordInput" helpId="passwordHelp" type="password"></ObjSign>

                        <ObjSign account={account} handleChange={(e) => handleChange(e, "re-password")}
                        name="Nhập lại mật khẩu" nameId="re-passwordInput" helpId="re-passwordHelp" type="password"></ObjSign>
                        <button type="submit" class="btn-main-directional">Đăng ký</button>
                    </form>
                </div>

                <div className="back-right">
                    <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
                        <NavLink className="link-list" to="/login">Đăng nhập</NavLink>
                    </button>
                    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                        <DialogTitle id="simple-dialog-title">Bạn đã đăng ký thành công</DialogTitle>
                        <button onClick={handleClick}>Chuyển tới trang đăng nhập</button>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export {Registration, ObjSign};