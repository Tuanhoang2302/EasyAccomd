import React, {useContext, useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import Table from './Table'
import {AppContext} from '../context/AppContext'
import {ManageContext} from '../context/ManageContext'
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
export default function(props) {
    const [currentRow, setCurrentRow] = useState(null);
    const appContext = useContext(AppContext);
    const manageContext = useContext(ManageContext)
    const [pageIndex, setPageIndex] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    }
    var content = [ //key:title
        {
            key: 'name',
            title: 'Họ và tên'
        },
        {
            key: 'email',
            title: 'Email liên lạc'
        },
        {
            key: 'type',
            title: 'Loại người dùng'
        },
        {
            key: 'phone',
            title: 'Điện thoại'
        },
        {
            key: 'address',
            title: 'Địa chỉ'
        },
        {
            key: 'totalPostedAccom',
            title: 'Tổng số bài đăng'
        },
        {
            key: 'totalFavorite',
            title: 'Tổng số lượt thích'
        }
    ];
    const [data, setData] = useState(null)
    const [totalResult, setTotalResult] = useState(null)
    const setPagnitionIndex = (e, value) =>{
        setPageIndex(value)
    }
    useEffect(() => {
        var fetchData = async () => {
        
            var fetchResult = await axios.get("http://localhost:3001/adminManage/get/allUser/" + pageIndex)
            
            const listUserData = fetchResult.data.result
            
            setTotalResult(fetchResult.data.totalNumberResult)
            var formatArrayData = []
            for(let i = 0; i < listUserData.length; i++){
                var accom = {
                    name: listUserData[i].user.userId.fullname,
                    email: listUserData[i].user.email,
                    type: listUserData[i].user.type,
                    phone: listUserData[i].user.userId.phoneNumber,
                    address: listUserData[i].user.userId.address,
                    totalPostedAccom: listUserData[i].totalNumberAccom,
                    totalFavorite: listUserData[i].totalNumberFavorite
                }
                formatArrayData.push(accom)
            }
            console.log(formatArrayData);
            setData(formatArrayData)
        }
        fetchData()
    }, [pageIndex])
    function btnDeleteOnClick() {
        if (currentRow !== null)
            setData([...data.slice(0, currentRow), ...data.slice(currentRow + 1)]);
    }
    var fieldForSearch = ["name", "email", "type", "phone", "address", "totalPostedAccom","totalFavorite"]
    return (
        <div className={manage.AdminAccountTab}>
            <div className={manage.content__header}>
                <div className={manage.text}>Danh sách chủ trọ:</div>
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
                        <div className={manage.dialog__item} onClick={()=>btnDeleteOnClick()}>Xóa</div>
                        <Link to="/"><div className={manage.dialog__item}>Chi tiết</div></Link>
                    </div>
                </Table>
                :null}
            </div>
            {totalResult ?
                <div style={{textAlign:"center"}}>
                    <Pagination style={{display:"inline-block"}} count={Math.floor(totalResult/15) + 1} onChange={setPagnitionIndex}/>
                </div>
            : null}
        </div>
    )
}