import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import Table from './Table'
import Header from './Header'
import {AppContext} from '../context/AppContext'
import {ManageContext} from '../context/ManageContext'
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const [currentRow, setCurrentRow] = useState(null);
    const appContext = useContext(AppContext);
    const manageContext = useContext(ManageContext);
    var content = [ //key:title
        {
            key: 'image',
            title: 'Ảnh aaaa aaaaaaaa aaaaaaaaaaaa aaaaaaaa aaaa'
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
    function btnUnfollowOnClick() {
        if (currentRow !== null)
            appContext.setListAccom([...appContext.listAccom.slice(0, currentRow), ...appContext.listAccom.slice(currentRow + 1)]);
    }
    return (
        <div className={manage.ManagerRenter}>
            <Header />
            <div className={manage.content}>
                <div className={manage.content__header}>
                    <div className={manage.text}>Nhà trọ đang theo dõi:</div>
                    <div className={`${common.inputIcon} ${manage.search}`}>
                        <div className={`${common.icon} ${manage.iconSearch}`}></div>
                        <input type="text" placeholder="Tìm kiếm"/>
                    </div>
                </div>
                <div className={manage.content__data}>
                    <Table data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow}>
                        <div className={manage.dialog}>
                            <div className={manage.dialog__item} onClick={()=>btnUnfollowOnClick()}>Bỏ theo dõi</div>
                            <Link to="/"><div className={manage.dialog__item}>Chi tiết</div></Link>
                        </div>
                    </Table>
                </div>
            </div>
        </div>
    )
}