import React, { Component, useState, useEffect, useContext } from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header Owner'
import Table from '../components/Table'

import axios from 'axios'
import {useHistory} from 'react-router-dom'

const Manage = (props) => {
    const [listAccom, setListAccom] = useState(null)
    const [listRowSelect, setListRowSelect] = useState([])
    const history = useHistory()
    
    useEffect(() => {
        const fetchData = async () => {
            var result = await axios.get("http://localhost:3001/accomodation/get/userManage")
            setListAccom(result.data)
          };
        fetchData();
    }, [])
    const formatPrice = (price) => {
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

    const trOnClick = (index) => {
        
        var list = [...listRowSelect];
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
        setListRowSelect([...list])
    }

    const checkRowSelect = (index) =>{
        for (let i = 0; i < listRowSelect.length; ++i) {
            if (listRowSelect[i] === index) {
                return true;
            }
        }
        return false;
    }

    const btnCancelOnClick = () => {
        setListRowSelect([])
    }

    // const btnDeleteOnClick = () => {
    //     var list = [...listAccom];
    //     listRowSelect.sort(function(a, b) {
    //         if (a > b) return 1;
    //         if (a < b) return -1;
    //         return 0;
    //     });
    //     for (let i = listRowSelect.length - 1; i >= 0 ; --i) {
    //         list = [...list.slice(0, listRowSelect[i]), ...list.slice(listRowSelect[i] + 1)]
    //     }
    //     setListRowSelect([])
    //     setListAccom(list)
    // }

    const modifyAccom = (e, accom) => {
        console.log(accom);
        props.setAccomSelect({
            accountId: accom.accountId,
            fridge: accom.conveniences.isHaveFridge,
            waterHeater: accom.conveniences.isHaveWaterHeater,
            airConditioner: accom.conveniences.isHaveAirConditioner,
            balcony: accom.conveniences.isHaveBalcony,
            wifi: accom.conveniences.isHaveWifi,
            kitchen: accom.conveniences.isHaveKitchen,
            electricBill: accom.conveniences.electricBill,
            waterBill: accom.conveniences.waterBill,
            numberOfRooms: accom.conveniences.numberOfRooms,
            typeOfBathroom: accom.conveniences.typeOfBathroom,
            images: accom.images,

            city: accom.address.city,
            district:  accom.address.district,
            village: accom.address.village,
            street: accom.address.street,
            number: accom.address.numberAddress,

            description: accom.description,        
            price: accom.price,
            title: accom.title,
            typeOfAccom: accom.type,
            square: accom.square,
            
            week: accom.displayTime.week,
            month: accom.displayTime.month,
            year: accom.displayTime.year,
        })
        history.push('/createAccom/details')
    }

    

    return (
        <div className="Manage">
                <Header />
                {listAccom ?
                <div className="content">
                    <div className={(listRowSelect.length>0)? "content__title hidden":"content__title"}>
                        <div className="text">Danh sách nhà trọ</div>
                        <div className="input--icon search">
                            <div className="icon icon--search"></div>
                            <input type="text" placeholder="Tìm kiếm"/>
                        </div>
                    </div>
                    {/* <div className={(listRowSelect.length>0)? "content__option":"content__option hidden"}>
                        <div className="button"><button className="button--second" onClick={btnCancelOnClick}>Hủy</button></div>
                        <div className="button"><button className="button--second" onClick={btnDeleteOnClick}>Xóa</button></div>
                    </div> */}
                    {/* <div className="content__table">
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
                                {listAccom.map((accom, index) => {
                                    return <tr className={(checkRowSelect(index))? "trOnSelect":""} 
                                        onClick={(e) => modifyAccom(e, accom)}
                                        >
                                        <td><img src={"../image/" + accom.image} alt="" width="120" height="80" /></td>
                                        <td>{accom.title}</td>
                                        <td>{accom.isAccepted}</td>
                                        <td>{formatPrice(accom.price)}</td>
                                        <td>{accom.number + " " + accom.street + ", " + accom.city}</td>
                                        <td><div className="text">{
                                            (accom.waterHeater? " - Bình nóng lạnh":"") +
                                            (accom.airConditioner? " - Điều hòa":"") +
                                            (accom.balcony? " - Ban công":"")
                                        }</div></td>
                                    </tr>
                                }
                                )}
                            </tbody>
                        </table>
                    </div> */}
                </div>   
                :null}
            </div>

    );
};

export default Manage;