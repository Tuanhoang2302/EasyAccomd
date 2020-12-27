import React from 'react'

export const ManageContext = React.createContext();

const listView = {
    NONE: 'none',
    ACCOUNT: 'account',
    NOTIFICATION: 'notification',
    OPTION: 'option'
}

export default class ManageProvider extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            formatPrice: this.formatPrice,
            formatAddress: this.formatAddress,
            formatConveniences: this.formatConveniences,
            currentView: listView.NONE,
            setCurrentView: this.setCurrentView.bind(this),
            views: listView

        }
    }

    setCurrentView(view) {
        this.setState(state => {
            return {
                currentView: view
            }
        })
    }
    
    formatPrice(price) {
        var count = 0;
        var strPrice = "";
        for (var i = price.length-1; i >= 0; --i) {
            count ++;
            strPrice = price[i] + strPrice;
            if (count === 3 && i !== 0) {
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
        return (
            <ManageContext.Provider value={this.state}>
                {this.props.children}
            </ManageContext.Provider>
        )
    }
}