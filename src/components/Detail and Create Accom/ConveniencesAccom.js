import React, {Component, useState, useEffect} from 'react'

import common from '../../css/common.module.css'
import detailsAccom from '../../css/pages/detailsAccom.module.css'

const ConveniencesAccom = (props) => {
    const check = (value, name) => {
        if(typeof value == "string"){
            if(value.length > 0) {
                props.setAccom(name, value);
            } else {
                props.setAccom(name, null);
            }
        } else if(typeof value == "number"){
            if(value > 0) {
                props.setAccom(name, value);
            } else {
                props.setAccom(name, null);
            }
        }
    
    }
    const inputOnChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        if(value === 'checkbox'){
            props.setAccom(name, value);
        } else {
            check(value, name)
        }
    }
    
    return (
        <div className={detailsAccom.ConveniencesAccom}>
            <br/><br/>
            <div className={detailsAccom.title}><h2>Bạn cung cấp những tiện nghi gì?</h2></div>
            <div className={detailsAccom.subTitle}>Đây chỉ là những tiện nghi mà khách thường mong đợi, 
                nhưng bạn cũng có thể bổ sung các tiện nghi khác nữa sau khi đăng tải.</div>
            <br/><br/>
            <div>
                <label>Kiểu phòng tắm</label><br/>
                <input type={detailsAccom.text} name="typeOfBathroom" value={props.accom.typeOfBathroom} onChange={inputOnChange}/>
                {props.accom.typeOfBathroom == null ? 
                <div>invalid</div>
                :null}
            </div><br/>
            <div>
                <label>Số lượng phòng</label><br/>
                <input type="number" name="numberOfRooms" value={props.accom.numberOfRooms} onChange={inputOnChange}/>
                {props.accom.numberOfRooms == null ? 
                <div>invalid</div>
                :null}
            </div><br/>
            <div>
                <label>Diện tích</label><br/>
                <input type="number" name="square" value={props.accom.square} onChange={inputOnChange}/>
                {props.accom.square == null ? 
                <div>invalid</div>
                :null}
            </div><br/>

            <div style={{display:"flex"}}>
                <div>
                    <div>
                        <input type="checkbox" name="waterHeater" checked={props.accom.waterHeater} onChange={inputOnChange}/>
                        <label>Bình nước nóng</label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="airConditioner" checked={props.accom.airConditioner} onChange={inputOnChange}/>
                        <label>Máy điều hòa</label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="balcony" checked={props.accom.balcony} onChange={inputOnChange}/>
                        <label>Ban công</label>
                    </div><br/>
                </div>

                <div>
                    <div>
                        <input type="checkbox" name="wifi" checked={props.accom.wifi} onChange={inputOnChange}/>
                        <label>Wifi</label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="kitchen" checked={props.accom.kitchen} onChange={inputOnChange}/>
                        <label>Phòng bếp </label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="fridge" checked={props.accom.fridge} onChange={inputOnChange}/>
                        <label>Tủ lạnh</label>
                    </div><br/>
                </div>
            </div>

            <div>
                <label>Hóa đơn tiền điện</label><br/>
                <input type="number" name="electricBill" value={props.accom.electricBill} onChange={inputOnChange}/>
            </div><br/>
            <div>
                <label>Hóa đơn tiền nước</label><br/>
                <input type="number" name="waterBill" value={props.accom.waterBill} onChange={inputOnChange}/>
            </div><br/>
            {/* <div>
                <label>Tiện nghi khác</label><br/>
                <input type="text" name="otherConveniences" value={props.accom.otherConveniences} onChange={inputOnChange}/>
            </div><br/> */}
            </div>
    );
};


export default ConveniencesAccom;