import React, {useState, useEffect} from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import common from '../css/common.module.css'
import manage from '../css/pages/manage.module.css'

export default function(props) {
    const [isOptionOnClick, setIsOptionOnClick] = useState(null)
    const [displayData, setDisplayData] = useState(props.data)
    const [sortFromLow , setSortFromLow] = useState(true)
    
    useEffect(() => {
        setDisplayData(props.data)
    }, [props.data])

    useEffect(() => {
        if(props.searchValue == ""){
            setDisplayData(props.data)
        } else {
            var result = props.data.map((item) => {
                for(let i = 0; i < props.fieldForSearch.length; i++){
                    if(item[props.fieldForSearch[i]].toString().toLowerCase().includes(props.searchValue.toLowerCase())){
                        return item
                    } 
                }
                return null
            })
            var filtered = result.filter(function (el) {
                return el != null;
              });
            setDisplayData(filtered)
        }
    }, [props.searchValue])
    
    const Sort = (key) => {
        var newList
        if(sortFromLow){
            newList = displayData.sort((a,b) => (a[key] > b[key]) ? 1 : -1)
        } else {
            newList = displayData.sort((a,b) => (a[key] < b[key]) ? 1 : -1)
        }
        setSortFromLow(!sortFromLow)
        setDisplayData(newList)
    }
    function click(index) {
        props.currentRow===index? props.setCurrentRow(null):props.setCurrentRow(index);
        setIsOptionOnClick(true)
    }
    function clickAway(index) {
        if(!isOptionOnClick){
            props.setCurrentRow(null);
        }
        if (index === displayData.length - 1) {
            setIsOptionOnClick(false);
        }
    }
    
    return (
        <div className={manage.table}>
            <table>
                <thead>
                    <tr className={manage.trHead}>
                        {props.content.map((item, index) => {
                           
                            return <th key={"thead cell " + index}><div onClick={() => Sort(item.key)}>{item.title}</div></th>
                            
                            }
                        )}
                        <th className={manage.option}></th>
                    </tr>
                </thead>
                <tbody>
                    {displayData.map((accom, index) => 
                        <tr className={`${manage.trBody} ${props.currentRow===index? manage.trOnSelect:null}`}>
                            {props.content.map((item) => {
                                    if(item.key == "image"){
                                        return <td><div>
                                            <img src={accom[item.key]} 
                                            style={{width:"100px", height:"100%", OObjectFit:"cover", borderRadius:"10px"}}/>
                                        </div></td>
                                    }else{
                                        return <td><div>
                                            {accom[item.key]}
                                        </div></td>
                                    }
                                }
                            )}
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