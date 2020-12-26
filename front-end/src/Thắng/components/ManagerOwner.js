import React, {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Table from './Table'
import Header from './Header'
import {AppContext} from '../context/AppContext'
import {ManageContext} from '../context/ManageContext'
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function(props) {
    const [currentRow, setCurrentRow] = useState(null);
    const appContext = useContext(AppContext);
    const history = useHistory()
    const manageContext = useContext(ManageContext)
    const [searchValue, setSearchValue] = useState("")
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    }
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
            key: 'status',
            title: 'Trạng thái'
        },
        {
            key: 'price',
            title: 'Giá'
        },
        {
            key: 'view',
            title: 'Lượt xem'
        },
        {
            key: 'favorite',
            title: 'Lượt thích'
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
    const [data, setData] = useState(null)
    const [dataModify, setDataModify]= useState(null)
    const user = useSelector(state => state.user)

    useEffect(() => {
        var fetchData = async () => {
            var fetchResult = await axios.get("http://localhost:3001/usermanage/get/accom", {
                params: {
                    accountId: user._id
                }
            })
            const listAccom = fetchResult.data
            setDataModify(listAccom)
            var formatArrayData = []
            for(let i = 0; i < listAccom.length; i++){
                const postTime = new Date(listAccom[i].accom.postingTime)
                
                var expiredTime = new Date()
                var displayTime = listAccom[i].accom.displayTime
                expiredTime.setDate(postTime.getDate() + (displayTime.year * 365) )
                var accom = {
                    image: listAccom[i].accom.images[0],
                    title: listAccom[i].accom.title,
                    status: listAccom[i].accom.isDisplay == true ? "Chưa cho thuê" : "Đã cho thuê",
                    price: listAccom[i].accom.price,
                    view: listAccom[i].accom.view,
                    favorite: listAccom[i].countFav,
                    postTime: postTime.getDay() + "/" + postTime.getMonth() + "/" + postTime.getFullYear(),
                    expiredTime: expiredTime.getDate() + "/" + expiredTime.getMonth() + "/" + expiredTime.getFullYear()
                }
                formatArrayData.push(accom)
            }
            
            setData(formatArrayData)
        }
        fetchData()
    }, [])
    
    // var data = appContext.listAccom.map((accom) => {
    //     return {...accom,
    //         address: manageContext.formatAddress(accom.city, accom.street, accom.number),
    //         price: manageContext.formatPrice(accom.priceAccom)
    //     }
    // });
    function btnDisableOnClick() {
        if (currentRow !== null){
        
            setData([...data.slice(0, currentRow), ...data.slice(currentRow + 1)]);
        }
    }

    const goToDetailAccom = (e, accomId) => {
        history.push({
            pathname: `/accom-detail/id=${accomId}`,
            state: {
                id: accomId
            }
        })
    }
    
    const modifyAccom = (e, accomData) => {
        console.log(accomData);
        props.setAccomSelect({
            accountId: accomData.accom.accountId,
            fridge: accomData.accom.conveniences.isHaveFridge,
            waterHeater: accomData.accom.conveniences.isHaveWaterHeater,
            airConditioner: accomData.accom.conveniences.isHaveAirConditioner,
            balcony: accomData.accom.conveniences.isHaveBalcony,
            wifi: accomData.accom.conveniences.isHaveWifi,
            kitchen: accomData.accom.conveniences.isHaveKitchen,
            electricBill: accomData.accom.conveniences.electricBill,
            waterBill: accomData.accom.conveniences.waterBill,
            numberOfRooms: accomData.accom.conveniences.numberOfRooms,
            typeOfBathroom: accomData.accom.conveniences.typeOfBathroom,
            images: accomData.accom.images,

            city: accomData.accom.address.city,
            district:  accomData.accom.address.district,
            village: accomData.accom.address.village,
            street: accomData.accom.address.street,
            number: accomData.accom.address.numberAddress,

            description: accomData.accom.description,        
            price: accomData.accom.price,
            title: accomData.accom.title,
            typeOfAccom: accomData.accom.type,
            square: accomData.accom.square,
            
            week: accomData.accom.displayTime.week,
            month: accomData.accom.displayTime.month,
            year: accomData.accom.displayTime.year,
        })
        history.push('/createAccom/details')
    }
    var fieldForSearch = ["title", "status", "price", "view", "favorite", "postTime","expiredTime"]
    return (
        <div className={manage.ManagerOwner}>
            <Header />
            <div className={manage.content}>
                <div className={manage.content__header}>
                    <div className={manage.text}>Danh sách bài đăng:</div>
                    <div className={`${common.inputIcon} ${manage.search}`}>
                        <div className={`${common.icon} ${manage.iconSearch}`}></div>
                        <input value={searchValue} onChange={handleInputChange} type="text" placeholder="Tìm kiếm"/>
                    </div>
                </div>
                <div className={manage.content__data}>
                    {data ?
                    <Table searchValue={searchValue} fieldForSearch={fieldForSearch}
                    data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow}>
                        <div className={manage.dialog}>
                            <div onClick={(e) => modifyAccom(e, dataModify[currentRow])} className={manage.dialog__item}>Sửa</div>
                            <div className={manage.dialog__item} onClick={()=>btnDisableOnClick()}>vô hiệu hóa</div>
                            <div onClick={(e) => goToDetailAccom(e, dataModify[currentRow].accom._id)} className={manage.dialog__item}>Chi tiết</div>
                        </div>
                    </Table>
                    : null}
                </div>
            </div>
        </div>
    )
}