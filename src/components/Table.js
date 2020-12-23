import React, {useContext, useState} from 'react'
import { Link } from "react-router-dom";

export default function(props) {
    const [currentRow, setCurrentRow] = useState(-1);
    function rowOnClick(index) {
        if (currentRow === index) setCurrentRow(-1);
        else setCurrentRow(index);
    }
    function btnDelete(index) {
        setCurrentRow(-1);
        props.onClick([...props.data.slice(0, index), ...props.data.slice(index+1)])
    }
    function btnEdit(index) {
        console.log(1);
    }
    return (
        <table>
            <thead>
                <tr>
                    {props.content.map((item, index) => <th>{item.title}</th>)}
                    <th className="option"></th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((accom, index) => 
                    <tr>
                        {props.content.map((item) => <td>{accom[item.key]}</td>)}
                        <td className="option">
                            <div>
                                <button className="button--second" onClick={()=>rowOnClick(index)}>...</button>
                                <div className={currentRow===index? "dialog":"dialog hidden"}>
                                    <Link to="/createAccom/details"><div className="dialog__item item--edit" onClick={()=>btnEdit(index)}>Sửa</div></Link>
                                    <div className="dialog__item item--delete" onClick={()=>btnDelete(index)}>Xóa</div>
                                    <Link><div className="dialog__item item--detail">Chi tiết</div></Link>
                                </div>
                            </div>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}