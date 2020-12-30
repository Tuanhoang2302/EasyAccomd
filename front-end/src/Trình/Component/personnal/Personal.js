import React, { useState } from 'react';
// import {NavLink} from 'react-router-dom'
import styles from './Personal.module.css';
import {ObjSign} from '../registration/Registration'
import {Redirect} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { update_account } from '../../../redux/action/action';
import Footer from '../home/Footer';

const FormEdit = (props) =>{
    const [value, setValue] = useState("")
    const accountId = useSelector(state => state.user._id)
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const handleSubmit = async (e, typeSearch, field) =>{
        //props.setOnEdit(false)
        e.preventDefault()
        if(typeSearch == "account"){
            var newAccount = await axios.post("http://localhost:3001/find/modify/account", {
                accountId: accountId,
                newValue: value,
                field: field
            })
            dispatch(update_account(newAccount.data, state))
            props.setOnEdit(false)
        }
        else {
            var newAccount = await axios.post("http://localhost:3001/find/modify/user", {
                userId: state.user.userId,
                newValue: value,
                field: field
            })
            console.log(newAccount.data);
            dispatch(update_account(newAccount.data, state))
            props.setOnEdit(false)
        }
    }
    return(
        <form onSubmit={(e) => handleSubmit(e,props.props.typeSearch, props.props.field)}>
            {/* <ObjSign nameId={props.props.type+"Input"} helpId={props.props.type+"Help"} type={props.props.type}/> */}
            <div class="form-group">
                <label for={props.props.type+"Input"}></label>
                <input value={value} onChange={(e) => setValue(e.target.value)}
                type={props.props.type} class="sign-form-control" name={props.props.type+"Input"} aria-describedby={props.props.type+"Help"}></input>
                <small className="wrong"></small>
            </div>
            <button type="submit" className={styles.btn_save}>
                <span class={styles.save}>Lưu</span>
            </button>
        </form>
    );
}
const Info = (props) => {
    const [onEdit, setOnEdit]= useState(false);
    const [textEdit, setTextEdit]=useState("Chỉnh sửa")
    const handleClickEdit = () =>{
        if(!onEdit){
            setTextEdit("Hủy")
            setOnEdit(true);
        }
        else{
            setTextEdit("Chỉnh sửa")
            setOnEdit(false);
        }
    }
    return(
        <div className={styles.info}>
            <div style={{marginTop: '24px'}}>
                <div style={{display: 'table', width: '100%',borderSpacing: '0px'}}>
                    <div className={styles.content_info}>
                        <div className={styles.title_info}>{props.name}</div>
                        <div style={{marginTop:'8px', marginBottom:'24px'}}>
                            {!onEdit? <div class={styles.content}>{props.content}</div>:null}
                        </div>
                    </div>
                    {props.type !="typeUser" ?
                    <div style={{display: 'table-cell', verticalAlign: 'top', whiteSpace: 'nowrap'}}>
                        <div className={styles.edit} onClick={handleClickEdit}>
                            <button type="button" className={styles.btn_edit}>{textEdit}</button>
                        </div>
                    </div>
                    :null}
                </div>
                { onEdit? <FormEdit setOnEdit={setOnEdit} props={props}/> :null}
            </div>
        </div>
    );
}
const Personal = () => {
    const user = useSelector(state => state.user)
    if(user)
        return (
            <div className={styles.main_info}>
                <div className={styles.list_info}>
                    <div className={styles.title}>Thông tin cá nhân</div>
                    <Info name="Tên pháp lý" content={user.userId.fullname} type="name" field="fullname" typeSearch="user"/>
                    <Info name="Giới tính" content="Nam" type="gender" />
                    <Info name="Loại tài khoản" content={user.type} type="typeUser" />
                    <Info name="Địa chỉ email" content={user.email} propSearch="email" field="email" typeSearch="account"/>
                    <Info name="Số điện thoại" content={user.userId.phoneNumber} field="phoneNumber" typeSearch="user"/>
                    <Info name="Địa chỉ liên hệ" content={user.userId.address} type="userId.address" field="address" typeSearch="user"/>
                </div>
                
            </div>
        );
    else 
        return (<Redirect to={{pathname: '/login'}} />)
}
export default Personal;