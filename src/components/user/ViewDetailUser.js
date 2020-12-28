import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog'

import {AppContext} from '../../context/AppContext'

import viewDetailUser from '../../css/components/viewDetailUser.module.css'
import common from '../../css/common.module.css'

export default function(props) {
    const appContext = useContext(AppContext);
    var user = {};
    if (props.user_id!==null && props.user_id>=0) {
        user = appContext.listOwner[props.user_id];
    }
    console.log(props.user_id);
    return (
        <Dialog className={`${viewDetailUser.ViewDetailUser} ${common.common}`} 
                open={props.openDialog} 
                onClose={props.onClick}
                maxWidth={"xl"}>
            <div className={viewDetailUser.dialog}>
                <div className={viewDetailUser.title}>Thông tin người dùng</div>
                <div className={viewDetailUser.content}>
                    <div className={viewDetailUser.content__left}>
                        <div className={`${viewDetailUser.image} ${viewDetailUser.item}`}>
                            <div></div>
                        </div>
                        <div className={`${viewDetailUser.fullName} ${viewDetailUser.item}`}>
                            <label>Họ và tên:</label>
                            <div>{user.fullName}</div>
                        </div>
                        <div className={`${viewDetailUser.email} ${viewDetailUser.item}`}>
                            <label>Email:</label>
                            <div>{user.email}</div>
                        </div>
                        <div className={`${viewDetailUser.phoneNumber} ${viewDetailUser.item}`}>
                            <label>Số điện thoại:</label>
                            <div>{user.phoneNumber}</div>
                        </div>
                        <div className={`${viewDetailUser.address} ${viewDetailUser.item}`}>
                            <label>Địa chỉ:</label>
                            <div>{user.address}</div>
                        </div>
                    </div>
                    {user.active? <div className={viewDetailUser.content__right}>
                            <div className={`${viewDetailUser.port} ${viewDetailUser.item}`}>
                                <label>Số bài viết đã đăng:</label>
                                <div>Tài khoản này đã đăng {user.post} bài viết.</div>
                            </div>
                            <div className={`${viewDetailUser.view} ${viewDetailUser.item}`}>
                                <label>Tổng số lượt xem:</label>
                                <div>Có {user.view} lượt xem trên tổng số bài viết.</div>
                            </div>
                            <div className={`${viewDetailUser.like} ${viewDetailUser.item}`}>
                                <label>Tổng số lượt yêu thích:</label>
                                <div>Nhận được {user.like} lượt yêu thích trên tổng số bài viết.</div>
                            </div>
                            <div className={`${viewDetailUser.report} ${viewDetailUser.item}`}>
                                <label>Tổng số lượt báo cáo:</label>
                                <div>Đã bị báo cáo {user.report} lần.</div>
                            </div>
                            <div className={`${viewDetailUser.item} ${viewDetailUser.button}`}>
                                <Link to="/"><button className={common.button}>Nhắn tin</button></Link>
                            </div>
                        </div>:
                        <div className={viewDetailUser.content__right}>
                            <div className={`${viewDetailUser.report} ${viewDetailUser.item}`}>
                                <label>Đang chờ phê duyệt</label>
                                <div>chú ý: xác nhận đúng thông tin chủ trọ trước khi phê duyệt.</div>
                            </div>
                            <div className={`${viewDetailUser.item} ${viewDetailUser.button}`}>
                                <button className={common.button}>Chấp nhận</button>
                                <button className={common.buttonSecond}>Xóa</button>
                            </div>
                            <div className={`${viewDetailUser.item}`}></div>
                        </div>
                    }
                </div>
            </div>
        </Dialog>
    )
}