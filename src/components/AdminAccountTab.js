import React, {useContext, useState} from 'react'
import Table from './Table'
import ViewDetailUser from './user/ViewDetailUser'
import {AppContext} from '../context/AppContext'
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const [currentRow, setCurrentRow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false); //new
    const [user_id, setUser_id] = useState(null); //new
    const appContext = useContext(AppContext);
    var content = [ //key:title
        {
            key: 'image',
            title: 'Ảnh'
        },
        {
            key: 'fullName',
            title: 'Họ và tên'
        },
        {
            key: 'email',
            title: 'Email'
        },
        {
            key: 'phoneNumber',
            title: 'Số điện thoại'
        },
        {
            key: 'address',
            title: 'Địa chỉ'
        }
    ];
    var data = [...appContext.listOwner];
    function btnDeleteOnClick() {
        if (currentRow !== null)
            appContext.setListOwner([...appContext.listOwner.slice(0, currentRow), ...appContext.listOwner.slice(currentRow + 1)]);
    }
    return (
        <div className={manage.AdminAccountTab}>
            <div className={manage.content__header}>
                <div className={manage.text}>Danh sách chủ trọ:</div>
                <div className={`${common.inputIcon} ${manage.search}`}>
                    <div className={`${common.icon} ${manage.iconSearch}`}></div>
                    <input type="text" placeholder="Tìm kiếm"/>
                </div>
            </div>
            <div className={manage.content__data}>
                <Table data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow} openDialog={openDialog} setOpenDialog={()=>setOpenDialog()}>
                    <div className={manage.dialog}>
                        <div className={manage.dialog__item} onClick={()=>btnDeleteOnClick()}>Xóa</div>
                        <div className={manage.dialog__item} onClick={()=>{setOpenDialog(true); setUser_id(currentRow)}}>Chi tiết</div>
                    </div>
                </Table>
            </div>
            <ViewDetailUser user_id={user_id} openDialog={openDialog} onClick={()=>setOpenDialog(false)}/>
        </div>
    )
}