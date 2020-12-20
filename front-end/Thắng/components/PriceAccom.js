import React, {Component} from 'react'

import '../css/common.css'

class PriceAccom extends Component {
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
            <div className="PriceAccom">
                <br/><br/>
                <div className="title"><h2>Định giá chỗ ở của bạn</h2></div>
                <div className="subTitle">
                    <p>Đưa ra mức giá hợp lý để thu hút khách hàng.</p>
                </div>
                <br/><br/>
                <div>
                    <label>Định giá (Đơn vị tiền tệ: VNĐ)</label><br/>
                    <input type="number" name="price" value={this.props.accom.price} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
                <div>
                    <label>Chu kỳ/thời hạn cho thuê</label><br/>
                    <input type="text" value="tháng"/>
                    
                </div><br/>
            </div>
        )
    }
}

export default PriceAccom;