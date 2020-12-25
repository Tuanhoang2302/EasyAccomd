import React, {useState} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const [isOptionOnClick, setIsOptionOnClick] = useState(null)
    function click(index) {
        props.currentRow===index? props.setCurrentRow(null):props.setCurrentRow(index);
        setIsOptionOnClick(true)
    }
    function clickAway(index) {
        if(!isOptionOnClick){
            props.setCurrentRow(null);
        }
        if (index === props.data.length - 1) {
            setIsOptionOnClick(false);
        }
    }
    return (
        <div className={manage.table}>
            <table>
                <thead>
                    <tr className={manage.trHead}>
                        {props.content.map((item, index) => <th key={"thead cell " + index}><div>{item.title}</div></th>)}
                        <th className={manage.option}></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((accom, index) => 
                        <tr className={`${manage.trBody} ${props.currentRow===index? manage.trOnSelect:null}`}>
                            {props.content.map((item) => <td><div>{accom[item.key]}</div></td>)}
                            <td className={manage.option}>
                                <div>
                                    <ClickAwayListener onClickAway={()=>clickAway(index)}>
                                        <div>
                                            <button className={common.buttonSecond} onClick={()=>click(index)} >...</button>
                                            {
                                                props.currentRow === index &&
                                                    props.children
                                            }
                                        </div>
                                    </ClickAwayListener>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}