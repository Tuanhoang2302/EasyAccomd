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
    const tabs = {
        VIEW: 'Xem nhiều nhất',
        FOLLOW: 'Được qua tâm nhất'
    }
    const [currentTab, setCurrentTab] = useState(tabs.VIEW);
    const [currentRow, setCurrentRow] = useState(null);
    const [pageIndex, setPageIndex] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    }
    const appContext = useContext(AppContext);  
    const manageContext = useContext(ManageContext)
    var contentView = [ //key:title
        {
            key: 'image',
            title: 'Ảnh'
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
            key: 'status',
            title: 'Trạng thái'
        },
        {
            key: 'type',
            title: 'Loại nhà ở'
        },
        {
            key: 'price',
            title: 'Giá'
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
    var contentFavorite= [ //key:title
        {
            key: 'image',
            title: 'Ảnh'
        },
        {
            key: 'favorite',
            title: 'Lượt thích'
        },
        {
            key: 'view',
            title: 'Lượt xem'
        },
        {
            key: 'status',
            title: 'Trạng thái'
        },
        {
            key: 'type',
            title: 'Loại nhà ở'
        },
        {
            key: 'price',
            title: 'Giá'
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
    const [content, setContent] = useState(contentView)
    var listTab = [];
    for (var key in tabs) {
        listTab.push(tabs[key]);
    }
    function btnDeleteOnClick() {
        if (currentRow !== null)
            setData([...data.slice(0, currentRow), ...data.slice(currentRow + 1)]);
    }
    const [data, setData] = useState(null)
    const [totalResult, setTotalResult] = useState(null)
    useEffect(() => {
        var fetchData = async () => {
            var typeOfSearch
            if(currentTab === tabs.VIEW){
                typeOfSearch="view"
            }else{
                typeOfSearch="favorite"
            }

            var fetchResult = await axios.get("http://localhost:3001/adminManage/get/topAccom/" + pageIndex, {
                params: {
                    typeOfSearch: typeOfSearch
                }
            })
            
            const listAccom = fetchResult.data.accom
            setTotalResult(fetchResult.data.totalResult)
            var formatArrayData = []
            for(let i = 0; i < listAccom.length; i++){
                var postTimeString, expiredTimeString
                if(listAccom[i].postingTime == null){
                    postTimeString = ""
                }else{
                    const postTime = new Date(listAccom[i].postingTime)
                    postTimeString = postTime.getDate() + "/" + (postTime.getMonth()+ 1) + "/" + postTime.getFullYear()
                }
                
                if(listAccom[i].expiredTime == null){
                    expiredTimeString=""
                } else {
                    const expiredTime = new Date(listAccom[i].expiredTime)
                    expiredTimeString = expiredTime.getDate() + "/" + (expiredTime.getMonth() + 1) + "/" + expiredTime.getFullYear()
                }
            
                var accom = {
                    image: listAccom[i].images[0],
                    type: listAccom[i].type,
                    status: listAccom[i].isDisplay == true ? "Chưa cho thuê" : "Đã cho thuê",
                    price: listAccom[i].price,
                    view: listAccom[i].view,
                    favorite: listAccom[i].favorite,
                    postTime: postTimeString,
                    expiredTime: expiredTimeString
                }
                formatArrayData.push(accom)
            }
            setData(formatArrayData)
        }
        fetchData()
    }, [currentTab, pageIndex])

    const setPagnitionIndex = (e, value) =>{
        setPageIndex(value)
    }
    var fieldForSearch = ["type", "status", "price", "view", "favorite", "postTime","expiredTime"]
    return (
        <div className={manage.AdminTopTab}>
            
            <div className={manage.content__header}>
                <div className={manage.contentOptionTab}>
                    {
                        listTab.map((tab) => 
                            <div className={`${manage.itemTab} ${currentTab===tab? manage.tabOnSelect:null}`} onClick={()=>{
                                setCurrentTab(tab) 
                                if(tab == tabs.VIEW) setContent(contentView)
                                else setContent(contentFavorite)}}>
                                <div>{tab}</div>
                            </div>)
                    }
                </div>
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
                            <Link to="/"><div className={manage.dialog__item}>Vô hiệu hóa</div></Link>
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