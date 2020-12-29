import React, { useContext, useState } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Chip from '@material-ui/core/Chip';

import {AppContext} from '../../context/AppContext'

import report from '../../css/components/report.module.css'
import common from '../../css/common.module.css'

export default function(props) {
    const chips = [
        "Tin giả", "Spam", "Trái phép", "Quấy rối", "Ngôn ngữ gây thù ghét", "Khủng bố", "Khác"
    ]
    const [currentChip, setCurrentChip] = useState(null);
    const [disableText, setDisableText] = useState(true);
    const [text, setText] = useState("");
    function chipOnClick(index) {
        setCurrentChip(index);
        if (index===chips.length-1) setDisableText(false);
        else setDisableText(true);
    }
    function submitOnClick() {
        props.onClick();
    }
    function onChangeText(event) {
        setText(event.target.value);
    }
    return (
        <Dialog className={`${report.Report} ${common.common}`} 
                open={props.openDialog} 
                onClose={props.onClick}
                maxWidth={"xl"}>
            <div className={report.dialog}>
                <div className={report.title}>
                    Báo cáo
                    <div className={report.btnCancel} onClick={()=>props.onClick()}>x</div>
                </div>
                <div className={report.content}>
                    <div className={report.content__title}>Vui lòng chọn vấn đề để tiếp tục</div>
                    <div className={report.content__subTitle}>Bạn có thể báo cáo bài viết sau khi chọn vấn đề.</div>
                    <div className={report.option}>
                        {
                            chips.map((item, index) => <Chip label={item} color={index===currentChip? "primary":""} 
                                onClick={()=>chipOnClick(index)} className={report.item}/>)
                        }
                        
                    </div>
                    <div className={report.input}>
                        <textarea rows="3" disabled={disableText} value={text} onChange={(event)=>onChangeText(event)}></textarea>
                    </div>
                    <div className={report.note}>Nếu bạn nhận thấy ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo ngay cho dịch vụ cấp cứu tại địa phương.</div>
                   
                </div> 
                <div className={report.footer}>
                    <button onClick={()=>submitOnClick()} disabled={currentChip===null? true:false}>Gửi</button>
                </div>
            </div>
        </Dialog>
    )
}