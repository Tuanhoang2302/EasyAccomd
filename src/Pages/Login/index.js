import React, {useState} from 'react';
import axios from 'axios'
import { useHistory } from "react-router-dom";
import {login} from '../../redux/action/action'
import {useDispatch} from 'react-redux'

const Login = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/find/login", {
            email: email
        }).then( (data) => {
            if(data.data.valid){
                dispatch(login(data.data.data))
                history.push({
                    pathname:"/inbox",
                })
            }else{
                console.log("fail");
            }
        })
    }

    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}> 
                <div> 
                <label htmlFor='email'>Email</label> 
                <input  
                    name='email'
                    placeholder='Email' 
                    value = {email} 
                    onChange={handleChange} 
                /> 
                </div>
                <div> 
                    <button>Login</button> 
                </div>  
            </form>
        </div>
    );
};

export default Login;