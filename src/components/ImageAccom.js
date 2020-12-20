import React, {Component} from 'react'

import '../css/common.css'

class ImageAccom extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="ImageAccom">
                    <br/><br/>
                    <div className="title"><h2>Làm cho nhà/phòng cho thuê thêm sống động nhờ ảnh chụp</h2></div>
                    <div className="subTitle">Chụp ảnh bằng điện thoại hoặc máy ảnh. Tải lên ít nhất một ảnh để 
                        đăng nhà/phòng cho thuê của bạn – bạn luôn có thể thêm ảnh hoặc chỉnh sửa sau.</div>
                    <br/><br/>
                    <input type="file" placeholder="1"/>
            </div>
        )
    }
}

export default ImageAccom;