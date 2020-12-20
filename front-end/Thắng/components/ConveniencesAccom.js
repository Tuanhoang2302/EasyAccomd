import React, {Component} from 'react'

import '../css/common.css'

class ConveniencesAccom extends Component {
    constructor(props) {
        super(props);
    }

    inputOnChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.props.setAccom(name, value);
    }
    
    render() {
        return (
            <div className="DetailsAccom">
                    <br/><br/>
                    <div className="title"><h2>Bạn cung cấp những tiện nghi gì?</h2></div>
                    <div className="subTitle">Đây chỉ là những tiện nghi mà khách thường mong đợi, 
                        nhưng bạn cũng có thể bổ sung các tiện nghi khác nữa sau khi đăng tải.</div>
                    <br/><br/>
                    <div>
                        <label>Kiểu phòng tắm</label><br/>
                        <input type="text" name="typeOfBathroom" value={this.props.accom.typeOfBathroom} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="waterHeater" checked={this.props.accom.waterHeater} onChange={this.inputOnChange.bind(this)}/>
                        <label>Bình nước nóng</label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="airConditioner" checked={this.props.accom.airConditioner} onChange={this.inputOnChange.bind(this)}/>
                        <label>Máy điều hòa</label>
                    </div><br/>
                    <div>
                        <input type="checkbox" name="balcony" checked={this.props.accom.balcony} onChange={this.inputOnChange.bind(this)}/>
                        <label>Ban công</label>
                    </div><br/>
                    <div>
                        <label>Hóa đơn điện, nước</label><br/>
                        <input type="text" name="electricAndWaterBill" value={this.props.accom.electricAndWaterBill} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <label>Tiện nghi khác</label><br/>
                        <input type="text" name="otherConveniences" value={this.props.accom.otherConveniences} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
            </div>
        )
    }
}

export default ConveniencesAccom;