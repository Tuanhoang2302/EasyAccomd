import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom"
import Table from './Table'
import Header from './Header'
import {AppContext} from '../context/AppContext'
import {ManageContext} from '../context/ManageContext'

export default function(props) {
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
    function btnDisableOnClick() {
        if (currentRow !== null)
            appContext.setListAccom([...appContext.listAccom.slice(0, currentRow), ...appContext.listAccom.slice(currentRow + 1)]);
    }

    return (
        <div className='ManagerOwner'>
            <Header />
            <div className="content">
                renter!
                <div className={"content__title"}>
                    <div className="text">Danh sách bài đăng:</div>
                    <div className="input--icon search">
                        <div className="icon icon--search"></div>
                        <input type="text" placeholder="Tìm kiếm"/>
                    </div>
                </div>
                <div className="content__table">
                    <Table data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow}>
                        <div className="dialog">
                            <Link to="/"><div className="dialog__item">Sửa</div></Link>
                            <div className="dialog__item" onClick={()=>btnDisableOnClick()}>vô hiệu hóa</div>
                            <Link to="/"><div className="dialog__item">Chi tiết</div></Link>
                        </div>
                    </Table>
                </div>
            </div>
        </div>
    )
}