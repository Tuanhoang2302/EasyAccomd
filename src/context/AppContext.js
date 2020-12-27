import React from 'react'

export const AppContext = React.createContext();

const typeOfUsers = {
    RENTER: 'renter',
    OWNER: 'owner',
    ADMIN: 'admin'
  }

export class AppProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accomSelect: null,
            setAccomSelect: this.setAccomSelect.bind(this),
            listAccom: [
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 1",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 1",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "100000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 2",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "aaaaaaaaa",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 3",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 4",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              },
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 1",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 1",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "100000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 2",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "aaaaaaaaa",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 3",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 4",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              },
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 1",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 1",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "100000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 2",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "aaaaaaaaa",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 3",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              }, 
              {
                status: "Đã cho thuê",
                image: "default.jpg",
                title: "Nhà số 4",
                description: "Nhà nguyên căn",
                city: "Hà Nội",
                district: "Cầu Giấy",
                village: "Dịch Vọng Hậu",
                street: "Phạm Văn Đồng",
                number: "Số 2",
                typeOfBathroom: "",
                waterHeater: true,
                airConditioner: true,
                balcony: false,
                electricAndWaterBill: "",
                otherConveniences: "",
                typeOfAccom: "",
                priceAccom: "200000",
                isSelect: false
              },
            ],
            setListAccom: this.setListAccom.bind(this),
            listNotification: [
              {
                user: "Thắng",
                content: "bình luận"
              },
              {
                user: "Thắng",
                content: "yêu thích"
              },
              {
                user: "Thắng",
                content: "yêu thích"
              },
              {
                user: "Thắng",
                content: "bình luận"
              },
              {
                user: "Thắng",
                content: "bình luận"
              }
            ],
            user: {
                type: typeOfUsers.OWNER
            },
            typeOfUsers: typeOfUsers,
            ListOwner: [
              {
                fullname: 'Phạm Việt Thắng'
      
              }
            ],
            setListOwner: this.setListOwner.bind(this)
        }
    }
    
    setListOwner(listOwner) {
        this.setState(state => {
        return {
            listOwner: [...listOwner]
        }
        })
    }

    setListAccom(listAccom) {
        this.setState(state => {
        return {
            listAccom: [...listAccom]
        }
        })
    }

    setAccomSelect(num) {
        this.setState(state => {
        return {
            accomSelect: num
        }
        })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}
