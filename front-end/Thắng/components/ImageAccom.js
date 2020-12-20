import React, {Component} from 'react'

import '../css/common.css'

class ImageAccom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null
        };
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(event) {
        console.log(event.target.files);
        this.setState({
          //file: URL.createObjectURL(event.target.files[0])
          file: event.target.files[0]
        })
    }
    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          //console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }
    render() {
        // if(this.state.file){
        //     console.log("Hello");
        //     this.getBase64(this.state.file)
        // }
        return (
            <div className="ImageAccom">
                    <br/><br/>
                    <div className="title"><h2>Làm cho nhà/phòng cho thuê thêm sống động nhờ ảnh chụp</h2></div>
                    <div className="subTitle">Chụp ảnh bằng điện thoại hoặc máy ảnh. Tải lên ít nhất một ảnh để 
                        đăng nhà/phòng cho thuê của bạn – bạn luôn có thể thêm ảnh hoặc chỉnh sửa sau.</div>
                    <br/><br/>
                    <input multiple type="file" placeholder="" onChange={this.handleChange}/>
                    <br/>
                    {this.state.file ?
                    <img style={{width:"200px", height: "200px", objectFit:"cover"}} src={this.state.file}/>
                    : null}
            </div>
        )
    }
}

export default ImageAccom;