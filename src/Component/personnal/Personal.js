import React, { useState } from 'react';
// import {NavLink} from 'react-router-dom'
import styles from './Personal.module.css';
import {ObjSign} from '../registration/Registration'

const FormEdit = (props) =>{
    const handleSubmit =() =>{
        alert("update completed")
    }
    return(
        <form onSubmit={handleSubmit}>
            <ObjSign nameId={props.type+"Input"} helpId={props.type+"Help"} type="props.type"/>
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
                    <div style={{display: 'table-cell', verticalAlign: 'top', whiteSpace: 'nowrap'}}>
                        <div className={styles.edit} onClick={handleClickEdit}>
                            <button type="button" className={styles.btn_edit}>{textEdit}</button>
                        </div>
                    </div>
                </div>
                { onEdit? <FormEdit props={props}/> :null}
            </div>
        </div>
    );
}
const Personal = () => {
    return (
        <div className={styles.main_info}>
            <div style={{margin: 'auto'}}>
                <div style={{marginTop: '100px', marginBottom: '48px'}}>
                        <div style={{marginTop: '40px', marginBottom: '40px'}}>
                            <div className={styles.title}>Thông tin cá nhân</div>
                        </div>
                        <div className={styles.list_info}>
                            <Info name="Tên pháp lý" content="Nguyễn Tiến Trình" type="name"/>
                            <Info name="Giới tính" content="Nam" type="gender"/>
                            <Info name="Ngày sinh" content="14 tháng 01 năm 2000" type="date"/>
                            <Info name="Địa chỉ email" content="Nguyentrinhs2000@gmail.com" type="email"/>
                            <Info name="Số điện thoại" content="0934655724" type="phone"/>
                            <Info name="Địa chỉ liên hệ" content="Mễ Trì Thượng, Nam Từ Liêm, Hà Nội" type="address"/>
                        </div>
                </div>
            </div>
        </div>
    );
}
export default Personal;