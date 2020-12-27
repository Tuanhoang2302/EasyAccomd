import React, {Component} from 'react'

import common from '../../css/common.module.css'
import detailsAccom from '../../css/pages/detailsAccom.module.css'

class PriceAccom extends Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this)
    }

    check = (value, name) => {    
        if(value > 0) {
            this.props.setAccom(name, value);
        } else {
            this.props.setAccom(name, null);
        }
        
    }
    inputOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.check(value, name)
    }
    
    render() {
        return (
            <div className={detailsAccom.PriceAccom}>
                <br/><br/>
                <div className={detailsAccom.title}><h2>Định giá và thời hạn đăng bài của bạn</h2></div>
                <div className={detailsAccom.subTitle}>
                    <p>Đưa ra mức giá hợp lý để thu hút khách hàng.</p>
                </div>
                <br/><br/>
                <div>
                    <label>Định giá (Đơn vị tiền tệ: VNĐ)</label><br/>
                    <input type="number" name="price" value={this.props.accom.price} onChange={this.inputOnChange.bind(this)}/>
                    {this.props.accom.price == null ?
                        <div>invalid</div>
                    : null}
                </div><br/>
                <div>Thời gian đăng bài hiển thị</div><br/>
                <div style={{display: 'flex'}}>
                    <input type="number" name="year" value={this.props.accom.year} onChange={this.inputOnChange.bind(this)}/>
                    <div>năm</div>
                </div><br/>
                <div style={{display: 'flex'}}>
                    <input type="number" name="month" value={this.props.accom.month} onChange={this.inputOnChange.bind(this)}/>
                    <div>tháng</div>
                </div><br/>
                <div style={{display: 'flex'}}>
                    <input type="number" name="week" value={this.props.accom.week} onChange={this.inputOnChange.bind(this)}/>
                    <div>tuần</div>
                </div><br/>
                {(this.props.accom.month == null 
                && this.props.accom.year == null
                && this.props.accom.week == null) ?
                    <div>invalid</div>
                : null}
            </div>
        )
    }
}

export default PriceAccom;