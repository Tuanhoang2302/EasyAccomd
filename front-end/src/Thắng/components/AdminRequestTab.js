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
import ViewDetailUser from './user/ViewDetailUser'
import Pagination from '@material-ui/lab/Pagination';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
});
export default function(props) {
    const tabs = {
        ACCOM: 'Duyệt nhà ở',
        COMMENT: 'Duyệt bình luận'
    }
    const [openDialog, setOpenDialog] = useState(false); //new
    const [userSelect, setUserSelect] = useState(null);
    const user = useSelector(state => state.user)
    const fieldSearchForAccom = ["type", "price", "address", "account", "postTime"]
    const fieldSearchForComment = ["content", "account", "accomId"]
    const [fieldForSearch, setFieldForSearch] = useState(fieldSearchForAccom)
    const [currentTab, setCurrentTab] = useState(tabs.ACCOM);
    const [currentRow, setCurrentRow] = useState(null);
    const [pageIndex, setPageIndex] = useState(1)
    const [searchValue, setSearchValue] = useState("")
    const handleInputChange = (e) => {
        setSearchValue(e.target.value)
    }
    const appContext = useContext(AppContext);
    const manageContext = useContext(ManageContext)
    var contentAccom = [ //key:title
        {
            key: 'image',
            title: 'Ảnh'
        },
        {
            key:"account",
            title:"Mã số chủ nhà"
        },
        {
            key: 'title',
            title: 'Tiêu đề'
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
            key: 'address',
            title: 'Địa chỉ'
        },
        {
            key: 'postTime',
            title: 'Ngày dăng'
        },
    ];
    var contentComment = [
        {
            key: "content",
            title :"Nội dung tin nhắn" 
        },
        {
            key: "account",
            title :"Email chủ nhà" 
        },
        {
            key: "accomId",
            title :"Mã số nhà ở" 
        },
        {
            key: "postTime",
            title :"Ngày gửi" 
        },
    ]
    const [content, setContent] = useState(contentAccom)
    var listTab = [];
    for (var key in tabs) {
        listTab.push(tabs[key]);
    }

    const [data, setData] = useState(null)
    const [dataModify, setDataModify]= useState(null)
    const [totalResult, setTotalResult] = useState(null)

    async function btnOnClick(e, accom, adminReply) {
        if (currentRow !== null){
            setData([...data.slice(0, currentRow), ...data.slice(currentRow + 1)]);
            await axios.get("http://localhost:3001/adminManage/update/accomStatus", {
                params : {
                    accomId: accom._id,
                    adminReply: adminReply
                }
            })
            socket.emit("client send notification", {
                account: user._id,
                type: adminReply == 1 ? "chấp nhận bài đăng nhà ở của bạn" : "từ chối bài đăng nhà ở của bạn",
                accom: accom._id, 
                senderEmail: accom.accountId.email,
                receiverId: accom.accountId._id,
            })
            
        }
    }
    async function btnDetailOwner(e, accom) {
        setOpenDialog(true);
        if (currentRow!==null) {
            console.log(accom.accountId._id);
            setUserSelect(accom.accountId._id)
            
        }
        
    }

    const setPagnitionIndex = (e, value) =>{
        setPageIndex(value)
    }
    useEffect(() => {
        var fetchData = async () => {
            if(currentTab === tabs.ACCOM){
                var fetchResult = await axios.get("http://localhost:3001/adminManage/notChecked/accom/" + pageIndex)
                
                const listAccom = fetchResult.data.accom
                setDataModify(listAccom)
                setTotalResult(fetchResult.data.totalResult)
                
                var formatArrayData = []
                for(let i = 0; i < listAccom.length; i++){
                    var postTimeString, expiredTimeString
                    if(listAccom[i].postingTime == null){
                        postTimeString = ""
                    }else{
                        const postTime = new Date(listAccom[i].createdAt)
                        postTimeString = postTime.getDate() + "/" + (postTime.getMonth()+ 1) + "/" + postTime.getFullYear()
                    }
                    const city = listAccom[i].address.city
                    const district = listAccom[i].address.district
                    const village = listAccom[i].address.village
                    var accom = {
                        image: listAccom[i].images[0],
                        type: listAccom[i].type,
                        address: `${village}, ${district}, ${city}`,
                        price: listAccom[i].price,
                        account: listAccom[i].accountId.email,
                        postTime: postTimeString,
                        title: listAccom[i].title
                    }
                    formatArrayData.push(accom)
                }
                setData(formatArrayData)
            } else {
                var fetchResult = await axios.get("http://localhost:3001/adminManage/notChecked/comment/" + pageIndex)
                
                const listComment = fetchResult.data.comment
                setTotalResult(fetchResult.data.totalResult)
                
                var formatArrayData = []
                for(let i = 0; i < listComment.length; i++){
                    var postTimeString, expiredTimeString
                    if(listComment[i].postingTime == null){
                        postTimeString = ""
                    }else{
                        const postTime = new Date(listComment[i].createdAt)
                        postTimeString = postTime.getDate() + "/" + (postTime.getMonth()+ 1) + "/" + postTime.getFullYear()
                    }
                    
                    var comment = {
                        content: listComment[i].comment,
                        account: listComment[i].accountId.email,
                        accomId: listComment[i].accomId._id,
                        postTime: postTimeString,
                    }
                    formatArrayData.push(comment)
                }
                setData(formatArrayData)
            }
        }
        fetchData()
    }, [currentTab, pageIndex])
    return (
        <div className={manage.AdminRequestTab}>
            <div className={manage.content__header}>
                <div className={manage.contentOptionTab}>
                    {
                    listTab.map((tab) => 
                        <div className={`${manage.itemTab} ${currentTab===tab? manage.tabOnSelect:null}`} onClick={()=>{
                            setCurrentTab(tab) 
                            if(tab == tabs.ACCOM){
                                setContent(contentAccom)
                                setFieldForSearch(fieldSearchForAccom)
                            }
                            else {
                                setContent(contentComment)
                                setFieldForSearch(fieldSearchForComment)
                            }}}>
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
                    <div className={manage.dialogRequest}>
                        <div className={`${manage.dialogRequest__item} ${manage.btnAccept}`} 
                        onClick={(e)=>btnOnClick(e, dataModify[currentRow], 1)}>Chấp nhận</div>
                        <div className={manage.dialogRequest__item} 
                        onClick={(e)=>btnOnClick(e, dataModify[currentRow], 0)}>Hủy</div>
                        <div className={manage.dialogRequest__item}
                        onClick={(e)=>btnDetailOwner(e, dataModify[currentRow])}>Chủ trọ</div>
                    </div>
                </Table>
                :null}
            </div>
            {userSelect?
                <ViewDetailUser user_id={userSelect} openDialog={openDialog} onClick={()=>setOpenDialog(false)}/>
            :null}
            {totalResult ?
                <div style={{textAlign:"center"}}>
                    <Pagination style={{display:"inline-block"}} count={Math.floor(totalResult/15) + 1} onChange={setPagnitionIndex}/>
                </div>
            : null}
        </div>
    )
}