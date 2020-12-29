
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
    const [isLoginValid, setIsLoginValid] = useState(true)
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [warningEmail, setWarningEmail] = useState(true)
    const [warningPassword, setWarningPassword] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()

    const validationForm = () => {
        var check=true;
        if(checkemailInput() === false) check=false;
        if(checkpasswordInput() === false) check=false;
        return check;
    }
    const checkemailInput = () =>{
        const regexEmail = /\S+@\S+\.\S+/;
        if (!regexEmail.test(emailInput) && emailInput.length === 0) {
            document.getElementsByClassName("wrong").innerText = "Địa chỉ email không hợp lệ!";
            setWarningEmail(false)
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            setWarningEmail(true)
            return true;
        }
    }
    const checkpasswordInput = () =>{
        const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if(!regexPass.test(passwordInput)){
            document.getElementsByClassName("wrong").innerText = "Mật khẩu phải hơn 8 ký tự, có chữ hoa, chữ thường, chữ số!";
            setWarningPassword(false)
            return false;
        }else{
            document.getElementsByClassName("wrong").innerText = "";
            setWarningPassword(true)
            return true;
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log("fdsf");
        
        await axios.post("http://localhost:3001/auth/login", {
            email: emailInput,
            password: passwordInput
        }).then((res) => {
            setIsLoginValid(true)
            dispatch(login(res.data.account, res.data.accessToken))
            history.push("/")
        }).catch((err) => {
            setIsLoginValid(false)
            console.log(err);
        })
        
    }
    
    return (
        <div className= "background-signup">
            <div style={{marginLeft: '200px', marginRight: '0px'}} className="back-titleHeader">
                    <span className="text-titleHeader">Bạn đang cần tìm trọ?</span>
                    <span className="text-titleHeader">Hay muốn chia sẻ những không gian tuyệt vời của bạn?</span>
                    <NavLink to="/registration"><span className="text-header">Tạo tài khoản</span></NavLink>
            </div>
            <div className="login">
                <div className="back-left">
                    <div className="back-right"></div>
                    <form className="sign-in" onSubmit={handleSubmit}>
                        <h1 style={{color: '#3463CC', textAlign: 'center', fontSize: '2rem', marginBottom: '20px'}}>WELCOME</h1>
                        <div className="form-group">
                                <label for="emailInput">Địa chỉ email</label>
                                <input onChange={(e) => (setEmailInput(e.target.value))} type="email" value={emailInput} class="sign-form-control" aria-describedby="emailHelp"/>
                                {/* {!warningEmail? <small className="wrong">Địa chỉ email không hợp lệ!</small>:null} */}
                        </div>
                        <div className="form-group">
                                <label for="passwordInput">Mật khẩu</label>
                                <input onChange={(e) => (setPasswordInput(e.target.value))} type="password" value={passwordInput} class="sign-form-control" aria-describedby="passwordHelp"/>
                                {isLoginValid == false ? <small className="wrong">Email hoặc Password không đúng!</small>:null}
                        </div>
                        <button style={{marginBottom:"50px", marginTop:"20px"}} type="submit" className="btn-main-directional">Đăng nhập</button>
                    </form>
                </div>
                
            </div>
        </div>
    );
};

export default Login;