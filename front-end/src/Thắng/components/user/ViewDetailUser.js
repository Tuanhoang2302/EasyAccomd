import React, { useContext, useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'
import axios from 'axios'
import {AppContext} from '../../context/AppContext'

import viewDetailUser from '../../css/components/viewDetailUser.module.css'
import common from '../../css/common.module.css'

export default function(props) {
    const appContext = useContext(AppContext);
    const [data, setData] = useState(null)
    
    useEffect(() => {
        const fetchData = async (req, res) => {
            var fetchResult = await axios.get("http://localhost:3001/accomodation/get/userDetail", {
                params: {
                    userId: props.user_id
                }
            })
            setData(fetchResult.data)
            console.log(fetchResult.data);
        }
        fetchData()
    }, [props.user_id])
    return (
        <Dialog className={`${viewDetailUser.ViewDetailUser} ${common.common}`} 
                open={props.openDialog} 
                onClose={props.onClick}
                maxWidth={"xl"}>
            {data ?
            <div className={viewDetailUser.dialog}>
                <div className={viewDetailUser.title}>Thông tin người dùng</div>
                <div className={viewDetailUser.content}>
                    <div className={viewDetailUser.content__left}>
                        <div className={`${viewDetailUser.image} ${viewDetailUser.item}`}>
                            <img style={{borderRadius:"50%", width: 180, height:180}} src={`data:image/jpg;base64,${data.user.avatar}`}></img> 
                        </div>
                        <div className={`${viewDetailUser.fullName} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Họ và tên:</div>
                            <div>{data.user.userId.fullname}</div>
                        </div>
                        <div className={`${viewDetailUser.email} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Email:</div>
                            <div>{data.user.email}</div>
                        </div>
                        <div className={`${viewDetailUser.phoneNumber} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Số điện thoại:</div>
                            <div>{data.user.userId.phoneNumber}</div>
                        </div>
                        <div className={`${viewDetailUser.address} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Địa chỉ:</div>
                            <div>{data.user.userId.address}</div>
                        </div>
                    </div>
                    <div className={viewDetailUser.content__right}>
                        <div className={`${viewDetailUser.port} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Số bài viết đã đăng:</div>
                            <div>Tài khoản này đã đăng {data.totalPostedAccom} bài viết.</div>
                        </div>
                        <div className={`${viewDetailUser.view} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Tổng số lượt xem:</div>
                            <div>Có {data.totalView} lượt xem trên tổng số bài viết.</div>
                        </div>
                        <div className={`${viewDetailUser.like} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Tổng số lượt yêu thích:</div>
                            <div>Nhận được {data.totalFavorite} lượt yêu thích trên tổng số bài viết.</div>
                        </div>
                        <div style={{marginTop:23}} className={`${viewDetailUser.report} ${viewDetailUser.item}`}>
                            <div style={{fontWeight:700}}>Tổng số lượt bị báo cáo:</div>
                            <div>Đã bị báo cáo {0} lần.</div>
                        </div>
                        <div className={`${viewDetailUser.item} ${viewDetailUser.button}`}>
                            <Link to="/"><button className={common.button}>Nhắn tin</button></Link>
                        </div>
                    </div>        
                </div>
            </div>
            :null}
        </Dialog>
    )
}