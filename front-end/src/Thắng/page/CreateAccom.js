import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import ItemAccom from '../components/Detail and Create Accom/ItemAccom';
import ListContext from '../context/ListContext'
import DetailsAccom from '../page/DetailsAccom'

//import '../css/common.css'
import '../css/pages/createAccom.css';

class CreateAccom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accomSelected: -2
        }
        this.props.setIndex(-2);
    }

    itemOnClick(index) {
        return (event) => {
            this.props.setIndex(index);
            this.setState(state => {
                return {
                    accomSelected: index
                }
            })
        }
    }

    btnNextOnClick() {
        console.log("next")
    }

    btnCloneOnClick(listAccom, setListAccom) {
        setListAccom([...listAccom, listAccom[this.state.accomSelected]])
    }

    render() {
        var self = this;
        return (
            <ListContext.Consumer>
                {({listAccom, setListAccom}) =>
                    <div className="CreateAccom">
                        <div className="CreateAccom__header" onClick={self.itemOnClick}>
                            <h2>Bạn muốn bắt đầu như thế nào?</h2>
                        </div>
                        <br/><br/>
                        <div className="CreateAccom__content">
                            <ItemAccom onClick={self.itemOnClick(-1)} key={-1} accomSelected={self.state.accomSelected} index={-1} self={self} 
                                item={{title: "Tạo mục cho thuê mới"}}/>
                            <br/>
                            {
                                listAccom.length>0? <h3>Hoàn thành mục cho thuê đang xử lý</h3>:""
                            }
                            {
                                listAccom.map((item, index) => 
                                    <ItemAccom onClick={this.itemOnClick(index)} key={index} index={index} item={item} self={self} accomSelected={this.state.accomSelected} />)
                            }
                        </div>
                        <div className="CreateAccom__footer">
                            <Link to="/user/manage"><button>Quay lại</button></Link>
                            <Link to="/createAccom/details"><button className="right" onClick={self.btnNextOnClick} 
                                disabled={self.state.accomSelected===-2? true:false}>Tiếp theo</button></Link>
                            <button className="right" onClick={self.btnCloneOnClick.bind(self, listAccom, setListAccom)} disabled={self.state.accomSelected<0? true:false}>Sao chép</button>
                        </div>
                    </div>
                }
           
            </ListContext.Consumer>
        )
    }
}

export default CreateAccom;