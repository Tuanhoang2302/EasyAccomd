import React, {useContext, useState} from 'react'
import Table from './Table'
import ViewDetailUser from './user/ViewDetailUser'
import {AppContext} from '../context/AppContext'
import {ManageContext} from '../context/ManageContext'
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const [openDialog, setOpenDialog] = useState(false); //new
    const [user_id, setUser_id] = useState(null); //new
    const [currentRow, setCurrentRow] = useState(null);
    const appContext = useContext(AppContext);
    const manageContext = useContext(ManageContext)
    var content = [ //key:title
        {
            key: 'image',
            title: 'Ảnh'
        },
        {
            key: 'title',
            title: 'Tiêu đề'
        },
        {
            key: 'owner',
            title: 'Chủ trọ'
        },
        {
            key: 'status',
            title: 'Trạng thái'
        },
        {
            key: 'price',
            title: 'Giá'
        },
        {
            key: 'address',
            title: 'Địa chỉ'
        },
        {
            key: 'postTime',
            title: 'Ngày đăng'
        },
        {
            key: 'expiredTime',
            title: 'Ngày hết hạn'
        }
    ];
    var data = appContext.listAccom.map((accom) => {
        return {...accom,
            address: manageContext.formatAddress(accom.city, accom.street, accom.number),
            price: manageContext.formatPrice(accom.priceAccom)
        }
    });
    function btnDeleteOnClick() {
        if (currentRow !== null)
            appContext.setListAccom([...appContext.listAccom.slice(0, currentRow), ...appContext.listAccom.slice(currentRow + 1)]);
    }
    function btnDetailOwner() {
        setOpenDialog(true);
        if (currentRow!==null) {
            setUser_id(appContext.listAccom[currentRow].user_id);
        }
        console.log(user_id);
    }
    return (
        <div className={manage.AdminRequestTab}>
            <div className={manage.content__header}>
                <div className={manage.text}>Yêu cầu:</div>
                <div className={`${common.inputIcon} ${manage.search}`}>
                    <div className={`${common.icon} ${manage.iconSearch}`}></div>
                    <input type="text" placeholder="Tìm kiếm"/>
                </div>
            </div>
            <div className={manage.content__data}>
                <Table data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow}>
                    <div className={manage.dialogRequest}>
                        <div className={`${manage.dialogRequest__item} ${manage.btnAccept}`} onClick={()=>btnDeleteOnClick()}>Chấp nhận</div>
                        <div className={manage.dialogRequest__item} onClick={()=>btnDeleteOnClick()}>Hủy</div>
                        <div className={manage.dialogRequest__item} onClick={()=>btnDetailOwner()}>Chủ trọ</div>
                        <div className={manage.dialogRequest__item}>Chi tiết</div>
                    </div>
                </Table>
            </div>
            <ViewDetailUser user_id={user_id} openDialog={openDialog} onClick={()=>setOpenDialog(false)}/>
        </div>
    )
}