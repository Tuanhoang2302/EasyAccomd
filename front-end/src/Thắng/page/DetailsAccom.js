import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import MenuDetailAccom from '../components/Detail and Create Accom/MenuDetailAccom';
import AddressAccom from '../components/Detail and Create Accom/AddressAccom';
import ConveniencesAccom from '../components/Detail and Create Accom/ConveniencesAccom';
import ImageAccom from '../components/Detail and Create Accom/ImageAccom';
import TitleAccom from '../components/Detail and Create Accom/TitleAccom';
import PriceAccom from '../components/Detail and Create Accom/PriceAccom';
import ListContext from '../context/ListContext'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import {Redirect} from 'react-router-dom'
import iconBar from '../image/icon-bar.svg';
import PVT_common from '../css/common.module.css'
import detailsAccom from '../css/pages/detailsAccom.module.css'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001";
const socket = socketIOClient(ENDPOINT, {
    withCredentials: true,
});
const tabs = {
    MENU: 'menu',
    ADDRESS: 'address',
    CONVENIENCES: "conveniences",
    IMAGE: 'image',
    TITLE: 'title',
    PRICE: 'price'
}

class DetailsAccom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: tabs.MENU,
            setTab: this.setTab.bind(this),
            accom: this.props.accom,
            setAccom: this.setAccom.bind(this),
        }
    }

    setTab(tab) {
        this.setState(state => {
            return {
                tab: tab
            }
        })
    }

    setAccom(key, value) {
        this.setState(state => {
            return {
                accom: {...this.state.accom, [key]: value}
            }
        })
    }

    iconBarOnClick() {
        this.setTab(tabs.MENU);
    }

    async btnSaveOnClick(listAccom, setListAccom, accomSelect) {
        console.log(this.state.accom);
        //console.log(this.state.accom.accomId);
        var imagePath
        if(this.state.accom.images) {
            imagePath = this.state.accom.images
        } else {
            var fetchImagePath = await axios.post("http://localhost:3001/accomodation/upload/image", this.state.accom.imagesFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            imagePath = fetchImagePath.data
        }
        var accom = {
            accomId: this.state.accom.accomId,
            accountId: this.props.accountId,
            isHaveFridge: this.state.accom.fridge != null ? true : false,
            isHaveWaterHeater: this.state.accom.waterHeater != null ? true : false,
            isHaveAirConditioner: this.state.accom.airConditioner != null ? true : false,
            isHaveBalcony: this.state.accom.balcony != null ? true : false,
            isHaveWifi: this.state.accom.wifi != null ? true : false,
            isHaveKitchen: this.state.accom.kitchen != null ? true : false,
            electricBill: this.state.accom.electricBill,
            waterBill: this.state.accom.waterBill,
            numberOfRooms: this.state.accom.numberOfRooms,
            typeOfBathroom: this.state.accom.typeOfBathroom,
            images: imagePath,

            city: this.state.accom.city,
            district:  this.state.accom.district,
            village: this.state.accom.village,
            street: this.state.accom.street,
            numberAddress: this.state.accom.number,

            description: this.state.accom.description,        
            price: this.state.accom.price,
            title: this.state.accom.title,
            type: this.state.accom.typeOfAccom,
            square: this.state.accom.square,
            
            week: this.state.accom.week,
            month: this.state.accom.month,
            year: this.state.accom.year,
        }
        
        accomSelect === -1 ? setListAccom([...listAccom, this.state.accom]):
        setListAccom([...listAccom.slice(0, accomSelect), this.state.accom, ...listAccom.slice(accomSelect + 1)])
        
        
        var accom = await axios.post("http://localhost:3001/accomodation/create", accom, {
            headers: {
              "auth-token": this.props.token
            }
           })
        console.log(accom);
        socket.emit("client send notification", {
            account: this.props.user,
            type:"gửi đề nghị duyệt nhà ở",
            accom: accom.data._id, 
            senderEmail: "admin@gmail.com",
            receiverId:"5fe34ab502c2b55488620374"
        })
        

        
    }

    btnNextOnClick() {
        var accom = this.state.accom
        switch (this.state.tab) {
            case tabs.ADDRESS:
                if(accom.village != null && accom.city != null &&
                accom.district != null && accom.street != null && accom.number != null){
                    this.setTab(tabs.CONVENIENCES);
                }
                break;
            case tabs.CONVENIENCES:
                if((accom.numberOfRooms != null) 
                && accom.typeOfBathroom != null
                && accom.square != null){
                    this.setTab(tabs.IMAGE);
                }
                break;
            case tabs.IMAGE:
                if(accom.imagesFormData != null){
                    this.setTab(tabs.TITLE);
                }
                break;
            case tabs.TITLE:
                this.setTab(tabs.PRICE);
                break;
            case tabs.PRICE:
                this.setTab(tabs.MENU);
                break;
        }
    }

    btnBackOnClick() {
        switch (this.state.tab) {
            case tabs.ADDRESS:
                this.setTab(tabs.MENU);
                break;
            case tabs.CONVENIENCES:
                this.setTab(tabs.ADDRESS);
                break;
            case tabs.IMAGE:
                this.setTab(tabs.CONVENIENCES);
                break;
            case tabs.TITLE:
                this.setTab(tabs.IMAGE);
                break;
            case tabs.PRICE:
                this.setTab(tabs.TITLE);
                break;
        }
    }

    render() {
        var self = this;
        if(this.props.user)
            return (
                <ListContext.Consumer>
                    {({listAccom, setListAccom, accomSelect}) => 
                        <div className={`${detailsAccom.DetailsAccom} ${PVT_common.common}`}>
                            {
                                self.state.tab === tabs.MENU? 
                                    "":<div className={detailsAccom.DetailAccom__header}>
                                        <img src={iconBar} width="25" onClick={self.iconBarOnClick.bind(self)}></img>
                                        <div className={detailsAccom.title}>
                                            {
                                                self.state.tab === tabs.ADDRESS? 'Địa chỉ':
                                                self.state.tab === tabs.PRICE? 'Định giá':
                                                self.state.tab === tabs.CONVENIENCES? 'Tiện nghi':
                                                self.state.tab === tabs.IMAGE? 'Ảnh':
                                                self.state.tab === tabs.TITLE? 'Tiêu đề':''
                                            }
                                        </div>
                                        <Link to="/createAccom"><button className={detailsAccom.right}>Thoát</button></Link>
                                    </div>
                            }
                            <div className={detailsAccom.DetailAccom__content}>
                                {
                                    self.state.tab === tabs.ADDRESS? <AddressAccom accom={self.state.accom} setAccom={self.state.setAccom}/>:
                                    self.state.tab === tabs.PRICE? <PriceAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                    self.state.tab === tabs.CONVENIENCES? <ConveniencesAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                    self.state.tab === tabs.IMAGE? <ImageAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                    self.state.tab === tabs.TITLE? <TitleAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                    <MenuDetailAccom tabs={tabs} setTab={self.state.setTab} />
                                }
                            </div>
                            <div className={detailsAccom.DetailAccom__footer}>
                                {
                                    self.state.tab === tabs.MENU? <Link to="/createAccom"><button  className={detailsAccom.right} 
                                        onClick={self.btnSaveOnClick.bind(self, listAccom, setListAccom, accomSelect)}>Lưu và thoát</button></Link>:
                                    self.state.tab === tabs.PRICE? <button className={detailsAccom.right} onClick={self.btnNextOnClick.bind(self)}>Hoàn thành</button>:
                                    <button className={detailsAccom.right} onClick={self.btnNextOnClick.bind(self)}>Tiếp tục</button>
                                }
                                {
                                    self.state.tab === tabs.MENU? <Link to="/createAccom"><button>Huỷ</button></Link>:
                                    <button onClick={self.btnBackOnClick.bind(self)}>Quay lại</button>
                                }
                            </div>

                        </div>
                    }
                </ListContext.Consumer>
            )
        else 
            return (<Redirect to={{pathname: '/login'}} />)
    }
}

export default DetailsAccom;