import React from 'react';

import createAccom from '../../css/pages/createAccom.module.css'
import imgDefault from '../../image/default.jpg'
import checked from '../../image/checked.svg'
import unChecked from '../../image/unChecked.svg'

export default function() {
    return (
        <div className={createAccom.ItemAccom} onClick={this.props.onClick}>
            <img src={(this.props.accomSelected === this.props.index)? checked:unChecked} alt="" width="16" height="16" />
            <img src={imgDefault} alt="" width="100" height="70"/>
            <div className={createAccom.description}>
                <h4>{this.props.item.title}</h4>
                <div>{this.props.item.description}</div>
            </div>
        </div>
    )
}