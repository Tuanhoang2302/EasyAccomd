import React, {Component} from 'react'
//import '../../css/common.css'
import axios from 'axios'

class ImageAccom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            existedFilePath: props.accom.images,
            numberOfImages:props.accom.images ? props.accom.images.length : 0,
            base64ImageList: []
        };
        this.handleChange = this.handleChange.bind(this)
        //this.callback = this.callback.bind(this)
    }
    async handleChange(event) {
        let formData = new FormData()
        var files = event.target.files
        for (let i = 0; i < event.target.files.length; i++) {
            let file = event.target.files[i]
            formData.append('photos', file)
          }
        if(files == null){
            this.props.setAccom("imagesFormData", null)
        } else {
            if(files.length >= 5) {
                this.props.setAccom("imagesFormData", formData)
            } else {
                this.props.setAccom("imagesFormData", null)
            }
        }
        
        this.setState({
            file: event.target.files,
            existedFilePath: null
        })
        
    }
    getBase64(file, callback) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = callback
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
    }
    render() {
    
        var checkNumberImages 
        if(this.state.file == null){
            checkNumberImages = false
        } else {
            if(this.state.file.length < 5){
                checkNumberImages = false
            } else
                checkNumberImages = true
        }
        return (
            <div className="ImageAccom">
                    <br/><br/>
                    <div className="title"><h2>Làm cho nhà/phòng cho thuê thêm sống động nhờ ảnh chụp</h2></div>
                    <div className="subTitle">Chụp ảnh bằng điện thoại hoặc máy ảnh. Tải lên ít nhất một ảnh để 
                        đăng nhà/phòng cho thuê của bạn – bạn luôn có thể thêm ảnh hoặc chỉnh sửa sau.</div>
                    <br/><br/>
                    {/* <input multiple type="file" placeholder="" onChange={this.handleChange}/> */}

                    <input multiple type="file" name="photos" onChange={this.handleChange}/>
                    <br/>
                    {this.state.existedFilePath ? 
                        <div/>
                    :checkNumberImages == false ? 
                        <div>Ban phai dang 5 anh</div>
                    :null}
                    
                    {(() => {
                    
                        var imageList = []
                         if(this.state.existedFilePath){
                            for(let i = 0; i < this.state.existedFilePath.length; i++){
                                imageList.push(
                                    <img key={i} style={{width:"200px", height: "200px", objectFit:"cover"}} 
                                    src={this.state.existedFilePath[i]}/>
                                )
                            }
                            return imageList
                        } else {
                            if(this.state.file){
                                for(let i = 0; i < this.state.file.length; i++){
                                    imageList.push(
                                        <img key={i} style={{width:"200px", height: "200px", objectFit:"cover"}} 
                                        src={URL.createObjectURL(this.state.file[i])}/>
                                        //src={this.state.existedFilePath[0]}/>
                                    )
                                }
                                return imageList 
                            } else{
                                return null
                            }
                        }
                         
                    })()}
            </div>
        )
    }
}

export default ImageAccom;