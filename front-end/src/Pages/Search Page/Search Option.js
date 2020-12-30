import React, {useState} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import styles from './Navbar.module.css'
const SearchOption = (props) => {
    var originCity = JSON.parse(localStorage.getItem("cities"))
    var originDistrict = JSON.parse(localStorage.getItem("districts"))
    var originWard = JSON.parse(localStorage.getItem("wards"))
    
    var options = props.options
    var color, disable
    if(props.checked){
        disable = false
    }else{
        disable = true
    }
    var searchOptionStyle, border
    if(props.setAccom){
        searchOptionStyle  ="clicked_search_option_section_create_accom"
        border = {border: "1px solid #e9e9e9"}
    } else {
        searchOptionStyle  ="clicked_search_option_section"
        border={border: "none"}
    }
    const handleChange = (e, value, type, setAccom) => {
        console.log("Hello");
        if(type =="Thành phố"){
            props.setDistrictValue(null)
            props.setWardValue(null)
            props.setCityValue(value)
            if(e.target.innerText ==""){
                props.setIsSelectDistrict(false)
                props.setIsSelectWard(false)
            } else{
                props.setIsSelectDistrict(true)
                props.setIsSelectWard(false)
                var newDistrictList = originDistrict.filter((district) => {
                    if(district.province_id == value.province_id){
                        return district
                    }
                })
                props.setNextOptions(newDistrictList)
            }
            if(setAccom){
                if(value != null){
                    setAccom("city", value.province_name)
                }else {
                    setAccom("city", null)
                }
            }
        }
        else if(type =="Quận"){
            props.setWardValue(null)
            props.setDistrictValue(value)
            if(e.target.innerText ==""){
                props.setIsSelectWard(false)
            } else{
                props.setIsSelectWard(true)
                var newWardList = originWard.filter((ward) => {
                    if(ward.district_id == value.district_id){
                        return ward
                    }
                })
                props.setNextOptions(newWardList)
            }
            if(setAccom){
                if(value != null){
                    setAccom("district", value.district_name)
                }else {
                    setAccom("district", null)
                }
            }
        }
        else{
            if(setAccom){
                if(value != null){
                    setAccom("village", value.ward_name)
                }else {
                    setAccom("village", null)
                }
            }
            props.setWardValue(value)
        }
    }
  
    return(
        <div style={{backgroundColor: color}}
        className={styles[searchOptionStyle]}>
            <div style={{fontSize:"14px", fontWeight:"bold"}}>{props.black}</div>
            <Autocomplete
                options={options}
                disabled={disable}
                getOptionLabel={(option) => option[props.name]}
                value={props.value}
                onChange={(e, value) => handleChange(e, value, props.black, props.setAccom)}
                renderInput={(params) => (
                    <div ref={params.InputProps.ref}>
                    <input style={border} className={styles.clicked_search_option_section_create_accom}
                    placeholder= {props.value? props.value : "Nhập tên"}//"Nhập tên"
                    //value={props.value}
                    type="text" {...params.inputProps} />
                    </div>
                )}
                />
        </div>
    )
}

export default SearchOption