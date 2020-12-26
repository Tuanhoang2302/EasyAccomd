import React, {Component} from 'react';

import '../../css/pages/createAccom.css'
//import '../../css/common.css'
import imgDefault from '../../image/default.jpg'
import checked from '../../image/checked.svg'
import unChecked from '../../image/unChecked.svg'

class ItemAccom extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ItemAccom" onClick={this.props.onClick}>
                <img src={(this.props.accomSelected === this.props.index)? checked:unChecked} alt="" width="16" height="16" />
                <img src={imgDefault} alt="" width="100" height="70"/>
                <div className="description">
                    <h4>{this.props.item.title}</h4>
                    <div>{this.props.item.description}</div>
                </div>
            </div>
        )
    }
}

export default ItemAccom;