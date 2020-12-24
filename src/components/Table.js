import React, {useState} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {props.content.map((item, index) => <th key={"thead cell " + index}>{item.title}</th>)}
                        <th className="option"></th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((accom, index) => 
                        <tr>
                            {props.content.map((item) => <td>{accom[item.key]}</td>)}
                            <td className="option">
                                <div>
                                <ClickAwayListener onClickAway={()=>clickAway(index)}>
                                    <div>
                                    <button className="button--second" onClick={()=>click(index)} >...</button>
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