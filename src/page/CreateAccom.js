import { common } from '@material-ui/core/colors'
import React, {useContext, useState} from 'react'
import {Link} from "react-router-dom"

import ItemAccom from '../components/Detail and Create Accom/ItemAccom'
import {AppContext} from '../context/AppContext'

import PVT_common from '../css/common.module.css'
import createAccom from '../css/pages/createAccom.module.css'

export default function(props) {
    const [accomSelected, setAccomSelected] = useState(null);
    const appContext = useContext(AppContext);
    function itemOnClick(index) {
        setAccomSelected(index)
    }
    function btnNextOnClick() {
        appContext.setAccomSelect(accomSelected);
    }

    function btnCloneOnClick() {
        appContext.setListAccom([...appContext.listAccom, appContext.listAccom[accomSelected]])
    }

    return (
        <div className={`${createAccom.CreateAccom} ${PVT_common.common}`}>
            <div className={createAccom.CreateAccom__header}>
                <h2>Bạn muốn bắt đầu như thế nào?</h2>
            </div>
            <br/><br/>
            <div className={createAccom.CreateAccom__content}>
                <ItemAccom onClick={()=>itemOnClick(-1)} key={-1} isSelect={accomSelected<0? true:false} 
                    item={{title: "Tạo mục cho thuê mới"}}/>
                <br/>
                {appContext.listAccom.length>0 && <h3>Hoàn thành mục cho thuê đang xử lý</h3>}
                {
                    appContext.listAccom.map((item, index) => 
                        <ItemAccom onClick={()=>itemOnClick(index)} key={index} item={item} isSelect={accomSelected===index? true:false} />)
                }
            </div>
            <div className={createAccom.CreateAccom__footer}>
                <Link to="/"><button>Quay lại</button></Link>
                <Link to="/createAccom/details"><button className={createAccom.right} onClick={()=>btnNextOnClick()} 
                    disabled={accomSelected===null? true:false}>Tiếp theo</button></Link>
                <button className={createAccom.right} onClick={()=>btnCloneOnClick(appContext.listAccom, appContext.setListAccom)} 
                    disabled={(accomSelected!==null && accomSelected>=0)? false:true}>Sao chép</button>
            </div>
        </div>
    )
}