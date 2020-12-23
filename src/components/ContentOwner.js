import React, {useContext} from 'react'
import Table from './Table'
import Header from './Header'
import ListContext from '../context/ListContext'

export default function(props) {
    const context = useContext(ListContext);

    return (
        <div className="content">
            owner!
            <div className={"content__title"}>
                <div className="text">Danh sách nhà trọ</div>
                <div className="input--icon search">
                    <div className="icon icon--search"></div>
                    <input type="text" placeholder="Tìm kiếm"/>
                </div>
            </div>
            <div className="content__table">
                <Table onClick={context.setListAccom} data={context.listAccom.map((accom) => {
                    return {...accom,
                        address: props.formats.formatAddress(accom.city, accom.street, accom.number),
                        conveniences: props.formats.formatConveniences(accom),
                        price: props.formats.formatPrice(accom.price)
                    }
                })} content={[ //key:title
                    {
                        key: 'image',
                        title: 'Ảnh'
                    },
                    {
                        key: 'title',
                        title: 'Tiêu đề'
                    },
                    {
                        key: 'status',
                        title: 'Trạng thái'
                    },
                    {
                        key: 'price',
                        title: 'Giá'
                    },
                    {
                        key: 'address',
                        title: 'Địa chỉ'
                    },
                    {
                        key: 'conveniences',
                        title: 'Tiện nghi'
                    },
                ]}></Table>
            </div>
        </div>
    )
}