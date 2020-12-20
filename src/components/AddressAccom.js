import React, {Component} from 'react'

import '../css/common.css'

class AddressAccom extends Component {
    constructor(props) {
        super(props);
    }

    inputOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        
        this.props.setAccom(name, value);
    }

    render() {
        return (
            <div className="AddressAccom">
                    <br/><br/>
                    <div className="title"><h2>Nhà/phòng cho thuê của bạn ở đâu?</h2></div>
                    <div className="subTitle">Khách sẽ chỉ nhận được địa chỉ chính xác của bạn sau khi hoàn tất đặt phòng.</div>
                    <br/><br/>
                    <div>
                        <label>Thành phố</label><br/>
                        <input type="text" name="city" value={this.props.accom.city} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <label>Quận/Huyện</label><br/>
                        <input type="text" name="district" value={this.props.accom.district} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <label>Xã/Phường</label><br/>
                        <input type="text" name="village" value={this.props.accom.village} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <label>Địa chỉ đường/phố</label><br/>
                        <input type="text" name="street" value={this.props.accom.street} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
                    <div>
                        <label>Số nhà</label><br/>
                        <input type="text" name="number" value={this.props.accom.number} onChange={this.inputOnChange.bind(this)}/>
                    </div><br/>
            </div>
        )
    }
}

export default AddressAccom;