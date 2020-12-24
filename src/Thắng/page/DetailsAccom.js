import React, {Component} from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import MenuDetailAccom from '../components/MenuDetailAccom';
import AddressAccom from '../components/AddressAccom';
import ConveniencesAccom from '../components/ConveniencesAccom';
import ImageAccom from '../components/ImageAccom';
import TitleAccom from '../components/TitleAccom';
import PriceAccom from '../components/PriceAccom';
import ListContext from '../context/ListContext'
import axios from 'axios'
import {useDispatch,useSelector} from 'react-redux'
import iconBar from '../image/icon-bar.svg';
import '../css/common.css'
import '../css/pages/detailsAccom.css'
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
        accomSelect === -1 ? setListAccom([...listAccom, this.state.accom]):
        setListAccom([...listAccom.slice(0, accomSelect), this.state.accom, ...listAccom.slice(accomSelect + 1)])
        var fetchImagePath = await axios.post("http://localhost:3001/accomodation/upload/image", this.state.accom.imagesFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        var imagePath = fetchImagePath.data
        
        var accom = await axios.post("http://localhost:3001/accomodation/create", {
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
        })
        
        socket.emit("client send notification", {
            account: this.props.user,
            type:"accom",
            accom: accom.data._id
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
                if(accom.numberOfRooms != null && accom.typeOfBathroom != null
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
        return (
            <ListContext.Consumer>
                {({listAccom, setListAccom, accomSelect}) => 
                    <div className="DetailsAccom">
                        {
                            self.state.tab === tabs.MENU? 
                                "":<div className="DetailAccom__header">
                                    <img src={iconBar} width="25" onClick={self.iconBarOnClick.bind(self)}></img>
                                    <div className="title">
                                        {
                                            self.state.tab === tabs.ADDRESS? 'Địa chỉ':
                                            self.state.tab === tabs.PRICE? 'Định giá':
                                            self.state.tab === tabs.CONVENIENCES? 'Tiện nghi':
                                            self.state.tab === tabs.IMAGE? 'Ảnh':
                                            self.state.tab === tabs.TITLE? 'Tiêu đề':''
                                        }
                                    </div>
                                    <Link to="/createAccom"><button className="right" onClick={self.btnSaveOnClick.bind(self, listAccom, setListAccom, accomSelect)}>Lưu và thoát</button></Link>
                                </div>
                        }
                        <div className="DetailAccom__content">
                            {
                                self.state.tab === tabs.ADDRESS? <AddressAccom accom={self.state.accom} setAccom={self.state.setAccom}/>:
                                self.state.tab === tabs.PRICE? <PriceAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                self.state.tab === tabs.CONVENIENCES? <ConveniencesAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                self.state.tab === tabs.IMAGE? <ImageAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                self.state.tab === tabs.TITLE? <TitleAccom accom={self.state.accom} setAccom={self.state.setAccom} />:
                                <MenuDetailAccom tabs={tabs} setTab={self.state.setTab} />
                            }
                        </div>
                        <div className="DetailAccom__footer">
                            {
                                self.state.tab === tabs.MENU? <Link to="/createAccom"><button className="right" 
                                    onClick={self.btnSaveOnClick.bind(self, listAccom, setListAccom, accomSelect)}>Lưu và thoát</button></Link>:
                                self.state.tab === tabs.PRICE? <button className="right" onClick={self.btnNextOnClick.bind(self)}>Hoàn thành</button>:
                                <button className="right" onClick={self.btnNextOnClick.bind(self)}>Tiếp tục</button>
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
    }
}

export default DetailsAccom;