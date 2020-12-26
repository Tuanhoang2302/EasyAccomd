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
    const manageContext = useContext(ManageContext);
    const history = useHistory()
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
            key: 'owner',
            title: 'Chủ trọ'
        },
        {
            key: 'type',
            title: 'Loại phòng'
        },
        {
            key: 'price',
            title: 'Giá'
        },
        {
            key: 'square',
            title: 'Diện tích'
        },
        {
            key: 'address',
            title: 'Địa chỉ'
        },
        
    ];
    const [data, setData] = useState(null)
    const user = useSelector(state => state.user)
    const [dataModify, setDataModify]= useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const fetchResult = await axios.get("http://localhost:3001/rentermanage/get/favoriteAccom", {
                params: {
                    accountId: user._id
                }
            })
            const listAccom = fetchResult.data
            setDataModify(listAccom)
            var formatArray = []
            for(let i =0 ; i < listAccom.length; i++){
                const city = listAccom[i].accom.address.city
                const district = listAccom[i].accom.address.district
                const village = listAccom[i].accom.address.village
                var accom = {
                    image: listAccom[i].accom.images[0],
                    title: listAccom[i].accom.title,
                    owner: listAccom[i].owner.fullname,
                    price: listAccom[i].accom.price,
                    square: listAccom[i].accom.square,
                    type: listAccom[i].accom.type,
                    address: `${village}, ${district}, ${city}`
                }
                formatArray.push(accom)
            }
            setData(formatArray)
        }
        fetchData()
    }, [])

    const btnUnfollowOnClick = async (e, accomData) => {
        if (currentRow !== null){
            //console.log(accomData._id);
            await axios.get("http://localhost:3001/favorite/delete", {
                params: {
                    accomId: accomData._id,
                    accountId: user._id
                }
            })
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
    var fieldForSearch = ["title", "owner", "price", "square", "type", "address"]
    return (
        <div className={manage.ManagerRenter}>
            <Header />
            <div className={manage.content}>
                <div className={manage.content__header}>
                    <div className={manage.text}>Nhà trọ đang theo dõi:</div>
                    <div className={`${common.inputIcon} ${manage.search}`}>
                        <div className={`${common.icon} ${manage.iconSearch}`}></div>
                        <input type="text" value={searchValue} onChange={handleInputChange} placeholder="Tìm kiếm"/>
                    </div>
                </div>
                <div className={manage.content__data}>
                    {data ?
                    <Table searchValue={searchValue} fieldForSearch={fieldForSearch}
                    data={data} content={content} currentRow={currentRow} setCurrentRow={setCurrentRow}>
                        <div className={manage.dialog}>
                            <div className={manage.dialog__item} onClick={(e)=>btnUnfollowOnClick(e, dataModify[currentRow].accom)}>Bỏ theo dõi</div>
                            <div onClick={(e) => goToDetailAccom(e, dataModify[currentRow].accom._id)} className={manage.dialog__item}>Chi tiết</div>
                        </div>
                    </Table>
                    : null}
                </div>
            </div>
        </div>
    )
}