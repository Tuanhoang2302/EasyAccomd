import React, {Component} from 'react'

import common from '../../css/common.module.css'
import detailsAccom from '../../css/pages/detailsAccom.module.css'

class TitleAccom extends Component {
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
            <div className={detailsAccom.TitleAccom}>
                <br/><br/>
                <div className={detailsAccom.title}><h2>Tạo tiêu đề và liên lạc cho nhà/phòng cho thuê của bạn</h2></div>
                <div className={detailsAccom.subTitle}>Thu hút sự chú ý của khách với tiêu đề mục cho thuê sao cho làm 
                    nổi bật được những điểm đặc biệt của nhà/phòng cho thuê.</div>
                <br/><br/>
                <div>
                    <label>Tiêu đề</label><br/>
                    <input type="text" name="title" value={this.props.accom.title} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
                <div>
                    <label>Loại nhà</label><br/>
                    <input type="text" name="typeOfAccom" value={this.props.accom.typeOfAccom} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
                <div>
                    <label>Mô tả thêm về nhà của bạn</label><br/>
                    <input type="text" name="description" value={this.props.accom.description} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
                <div>
                    <label>Email liên lạc</label><br/>
                    <input type="text" name="email" value={this.props.accom.email} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
                <div>
                    <label>Số điện thoại liên lạc</label><br/>
                    <input type="text" name="phone" value={this.props.accom.phone} onChange={this.inputOnChange.bind(this)}/>
                </div><br/>
            </div>
        )
    }
}

export default TitleAccom;