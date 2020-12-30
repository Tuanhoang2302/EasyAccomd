import React, {Component, useState, useEffect} from 'react'

//import '../../css/common.css'

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
        <div className="DetailsAccom">
            <br/><br/>
            <div className="title"><h2>Bạn cung cấp những tiện nghi gì?</h2></div>
            <div className="subTitle">Đây chỉ là những tiện nghi mà khách thường mong đợi, 
                nhưng bạn cũng có thể bổ sung các tiện nghi khác nữa sau khi đăng tải.</div>
            <br/><br/>
            <div>
                <label>Kiểu phòng tắm</label><br/>
                <input type="text" name="typeOfBathroom" value={props.accom.typeOfBathroom} onChange={inputOnChange}/>
                {props.accom.typeOfBathroom == null ? 
                    <div style={{color:"red", marginTop: 5, fontSize: 13}}>Ô phải điền</div>
                :null}
            </div><br/>
            <div>
                <label>Số lượng phòng</label><br/>
                <input type="number" min={1} name="numberOfRooms" value={props.accom.numberOfRooms} onChange={inputOnChange}/>
                {props.accom.numberOfRooms == null ? 
                    <div style={{color:"red", marginTop: 5, fontSize: 13}}>Ô phải điền</div>
                :null}
            </div><br/>
            <div>
                <label>Diện tích</label><br/>
                <input type="number" min={1} name="square" value={props.accom.square} onChange={inputOnChange}/>
                {props.accom.square == null ? 
                    <div style={{color:"red", marginTop: 5, fontSize: 13}}>Ô phải điền</div>
                :null}
            </div><br/>

            <div style={{display:"flex"}}>
                <div style={{marginRight: 40}}>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="waterHeater" checked={props.accom.waterHeater} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Bình nước nóng</label>
                    </div><br/>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="airConditioner" checked={props.accom.airConditioner} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Máy điều hòa</label>
                    </div><br/>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="balcony" checked={props.accom.balcony} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Ban công</label>
                    </div><br/>
                </div>

                <div>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="wifi" checked={props.accom.wifi} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Wifi</label>
                    </div><br/>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="kitchen" checked={props.accom.kitchen} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Phòng bếp </label>
                    </div><br/>
                    <div style={{display:"flex"}}>
                        <input type="checkbox" name="fridge" checked={props.accom.fridge} onChange={inputOnChange}/>
                        <label style={{marginLeft:5}}>Tủ lạnh</label>
                    </div><br/>
                </div>
            </div>

            <div>
                <label>Hóa đơn tiền điện</label><br/>
                <input type="number" min={0} name="electricBill" value={props.accom.electricBill} onChange={inputOnChange}/>
            </div><br/>
            <div>
                <label>Hóa đơn tiền nước</label><br/>
                <input type="number" min={0} name="waterBill" value={props.accom.waterBill} onChange={inputOnChange}/>
            </div><br/>
            {/* <div>
                <label>Tiện nghi khác</label><br/>
                <input type="text" name="otherConveniences" value={props.accom.otherConveniences} onChange={inputOnChange}/>
            </div><br/> */}
            </div>
    );
};

const helper =  {
    display: "inline-block",
    height: "100%",
    verticalAlign: "middle"
}

export default ConveniencesAccom;