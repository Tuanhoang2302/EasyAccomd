import React, { Component } from 'react'

import Footer from '../components/Footer'
import ContentAdmin from '../components/ContentAdmin'
import ContentOwner from '../components/ContentOwner'
import ContentRenter from '../components/ContentRenter'
import ListContext from '../context/ListContext'

import '../css/common.css'
import '../css/pages/manage.css'

class Manage extends Component {
    constructor(prop) {
        super(prop);
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

    formatAddress(city, street, houseNumber) {
        return '' + houseNumber + ' ' + street + ', ' + city;
    }

    formatConveniences(accom) {
        var str = '';
        if (accom.waterHeater) str += 'Bình nước nóng';
        if (accom.airConditioner) {
            if (str.length > 0) str += ', ';
            str += 'Điều hòa';
        }
        if (accom.balcony) {
            if (str.length > 0) str += ', ';
            str += 'Ban công';
        }
        if (accom.otherConveniences !== '') {
            if (str.length > 0) str += ', ';
            str += accom.otherConveniences;
        } 
        return str;
    }

    render() {
        var self = this;
        return (
            <div className="Manage">
                <ListContext.Consumer>
                    {({typeOfUsers, typeOfUser}) =>
                        <div>
                            {
                                typeOfUser === typeOfUsers.ADMIN ? <ContentAdmin formats={{
                                    "formatPrice": self.formatPrice, 
                                    "formatAddress": self.formatAddress,
                                    "formatConveniences": self.formatConveniences}}/>:
                                typeOfUser === typeOfUsers.OWNER ? <ContentOwner formats={{
                                    "formatPrice": self.formatPrice, 
                                    "formatAddress": self.formatAddress,
                                    "formatConveniences": self.formatConveniences}}/>:
                                <ContentRenter formats={{
                                    "formatPrice": self.formatPrice, 
                                    "formatAddress": self.formatAddress,
                                    "formatConveniences": self.formatConveniences}}/>
                            }
                        </div>
                    }
                </ListContext.Consumer>
                <Footer />
            </div>
        )
    }
}

export default Manage;