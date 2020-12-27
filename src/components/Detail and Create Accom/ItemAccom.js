import React from 'react';

import createAccom from '../../css/pages/createAccom.module.css'
import imgDefault from '../../image/default.jpg'
import checked from '../../image/checked.svg'
import unChecked from '../../image/unChecked.svg'

export default function(props) {
    return (
        <div className={createAccom.ItemAccom} onClick={props.onClick}>
            <img src={props.isSelect? checked:unChecked} alt="" width="16" height="16" />
            <img src={imgDefault} alt="" width="100" height="70"/>
            <div className={createAccom.description}>
                <h4>{props.item.title}</h4>
                <div>{props.item.description}</div>
            </div>
        </div>
    )
}