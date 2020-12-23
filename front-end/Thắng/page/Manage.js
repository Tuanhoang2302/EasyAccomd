import React, { Component } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import ListContext from '../context/ListContext'

import '../css/common.css'
import '../css/pages/manage.css'

class Manage extends Component {
    constructor(prop) {
        super(prop);
        this.state = {
            listRowSelect: []
        }
    }
   
    formatPrice(price) {
        var count = 0;
        var strPrice = "";
        var num = price;
        while(num > 0) {
            count ++;
            let temp = num%10;
            num = Math.floor(num/10);
            strPrice = temp + strPrice;
            if (count === 3 && num > 0) {
                strPrice = '.' + strPrice;
                count = 0;
            }
        }
        return strPrice;
    }

    trOnClick(index) {
        this.setState(state => {
            var list = [...state.listRowSelect];
            var flag = false;
            for (let i = 0; i < list.length; ++i) {
                if (index === list[i]) {
                    list = [...list.slice(0, i), ...list.slice(i + 1)]
                    flag = true;
                }
            }
            if (!flag) {
                list.push(index);
            }
            return {
                listRowSelect: [...list]
            }
        })
    }

    checkRowSelect(self, index) {
        for (let i = 0; i < self.state.listRowSelect.length; ++i) {
            if (self.state.listRowSelect[i] === index) {
                return true;
            }
        }
        return false;
    }

    btnCancelOnClick() {
        this.setState(state => {
            return {
                listRowSelect: []
            }
        })
    }

    btnDeleteOnClick(listAccom, setListAccom) {
        var list = [...listAccom];
        var listRowSelect = this.state.listRowSelect;
        listRowSelect.sort(function(a, b) {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        });
        for (let i = this.state.listRowSelect.length - 1; i >= 0 ; --i) {
            list = [...list.slice(0, this.state.listRowSelect[i]), ...list.slice(this.state.listRowSelect[i] + 1)]
        }
        this.setState(state => {
            return {
                listRowSelect: []
            }
        })
        setListAccom(list);
    }

    render() {
        var self = this;
        return (
            <div className="Manage">
                <Header />
                <ListContext.Consumer>
                    {({listAccom, setListAccom}) =>
                        <div className="content">
                            <div className={(self.state.listRowSelect.length>0)? "content__title hidden":"content__title"}>
                                <div className="text">Danh sách nhà trọ</div>
                                <div className="input--icon search">
                                    <div className="icon icon--search"></div>
                                    <input type="text" placeholder="Tìm kiếm"/>
                                </div>
                            </div>
                            <div className={(self.state.listRowSelect.length>0)? "content__option":"content__option hidden"}>
                                <div className="text">Đã chọn {self.state.listRowSelect.length}/{listAccom.length} nhà trọ</div>
                                <div className="button"><button className="button--second" onClick={self.btnCancelOnClick.bind(self)}>Hủy</button></div>
                                <div className="button"><button className="button--second" onClick={self.btnDeleteOnClick.bind(self, listAccom, setListAccom)}>Xóa</button></div>
                            </div>
                            <div className="content__table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Ảnh</th>
                                            <th>Tiêu đề</th>
                                            <th>Trạng thái</th>
                                            <th>Giá</th>
                                            <th>Địa chỉ</th>
                                            <th>Tiện nghi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listAccom.map((accom, index) => 
                                            <tr className={(self.checkRowSelect(self, index))? "trOnSelect":""} 
                                                onClick={self.trOnClick.bind(self, index)}>
                                                <td><img src={"../image/" + accom.image} alt="" width="120" height="80" /></td>
                                                <td>{accom.title}</td>
                                                <td>{accom.status}</td>
                                                <td>{self.formatPrice(accom.price)}</td>
                                                <td>{accom.number + " " + accom.street + ", " + accom.city}</td>
                                                <td><div className="text">{
                                                    (accom.waterHeater? " - Bình nóng lạnh":"") +
                                                    (accom.airConditioner? " - Điều hòa":"") +
                                                    (accom.balcony? " - Ban công":"")+
                                                    ((accom.otherConveniences !== "")? " - "+accom.otherConveniences:"")
                                                }</div></td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                </ListContext.Consumer>
            
            </div>
        )
    }
}

export default Manage;