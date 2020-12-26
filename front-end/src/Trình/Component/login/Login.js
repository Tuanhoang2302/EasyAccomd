
import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import {ObjSign} from '../registration/Registration';
import Cookies from 'universal-cookie';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import { login } from '../../../redux/action/action';
import {useDispatch,useSelector} from 'react-redux'
const cookies = new Cookies();

const Login = () => {
    const [accountLogin, setAccountLogin] = useState(null)
    const [isLoginValid, setIsLoginValid] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.post("http://localhost:3001/auth/login", {
            email: accountLogin.email,
            password: accountLogin.password
        }).then((res) => {
            console.log(res);
            //cookies.set('token', res.data.accessToken)
            dispatch(login(res.data.account, res.data.accessToken))
            history.push("/")
        }).catch((err) => {
            setIsLoginValid(false)
            console.log(err);
        })
    }
    const handleChange = (e, key) => {
        setAccountLogin({...accountLogin, [key]: e.target.value})
    }
    
    return (
        <div className= "background-signup">
            <div className="login">
                <div className="back-right">
                    <button type="button" className="btn-main-directional" style={{marginLeft: '105px', marginTop: '300px'}}>
                        <NavLink className="link-list" to="/registration">Đăng ký</NavLink>
                    </button>
                </div>
                <div className="back-left">
                    <form className="sign-in" onSubmit={handleSubmit}>
                        <h1 style={{color: '#3463CC', textAlign: 'center'}}>ĐĂNG NHẬP</h1>
                        <ObjSign account={accountLogin} handleChange={(e) => handleChange(e, "email")}
                        name="Địa chỉ email" nameId="emailInput" helpId="emailHelp" type="email"></ObjSign>
                        <ObjSign account={accountLogin} handleChange={(e) => handleChange(e, "password")}
                        name="Mật khẩu" nameId="passwordInput" helpId="passwordHelp" type="password"></ObjSign>
                        <button type="submit" className="btn-main-directional">Đăng nhập</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default Login;