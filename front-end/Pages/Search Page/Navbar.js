import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.png'
import { AiOutlineSearch, AiOutlineGlobal, AiOutlineMenu } from "react-icons/ai";
import useViewport from '../../Component/Detect Screen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './animation.css'
import { CSSTransition } from 'react-transition-group';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './calender.css'
import {useSelector, useDispatch} from 'react-redux'
import {change_background_dark_mode, get_location_search} from '../../redux/action/action'
import {change_background_normal_mode} from '../../redux/action/action'
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';


const NotClickSearchBar = (props) => {
    return(
        <div onClick={props.searchEvent} className= {styles.search_bar}
        >
            <div className={`${styles.option} ${styles.lan_can}`}>
                <span>Lân cận</span>
            </div>
            <div className={`${styles.option} ${styles.them_ngay}`}>
                <span>Thêm ngày</span>
            </div>
            <div className={`${styles.option} ${styles.them_khach}`}>
                <span>Thêm khách</span>
            </div>
            <div className={styles.search_circle_button}>
                <AiOutlineSearch className={styles.search_icon}/>
            </div>
        </div>
    )
}

const HaveClickedSearchBar = (props) => {
    const [isSelectCity, setIsSelectCity] = useState(true)
    const [isSelectDistrict, setIsSelectDistrict] = useState(false)
    const [isSelectWard, setIsSelectWard] = useState(false)

    const [cityValue, setCityValue] = useState(null)
    const [districtValue, setDistrictValue] = useState(null)
    const [wardValue, setWardValue] = useState(null)

    const [districtOptions, setDistrictOptions] = useState([])
    const [wardOptions, setwardOptions] = useState([])
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    useEffect(() => {
        if(cityValue != null){
            window.location.reload()
        }
    }, [state.locationSearch])

    const handleChange = (e, value, type) => {
        console.log("Hello");
        if(type =="Thành phố"){
            setDistrictValue(null)
            setWardValue(null)
            setCityValue(value)
            if(e.target.innerText ==""){
                setIsSelectDistrict(false)
                setIsSelectWard(false)
            } else{
                setIsSelectDistrict(true)
                setIsSelectWard(false)
                var newDistrictList = props.districts.filter((district) => {
                    if(district.province_id == value.province_id){
                        return district
                    }
                })
                setDistrictOptions(newDistrictList)
            }
        }
        else if(type =="Quận"){
            setWardValue(null)
            setDistrictValue(value)
            if(e.target.innerText ==""){
                setIsSelectWard(false)
            } else{
                setIsSelectWard(true)
                var newWardList = props.wards.filter((ward) => {
                    if(ward.district_id == value.district_id){
                        return ward
                    }
                })
                setwardOptions(newWardList)
            }
        }
        else{
            setWardValue(value)
        }
    }

    const handleSearch = async () => {
        if(cityValue){
            dispatch(get_location_search({
                city: cityValue,
                district: districtValue,
                ward: wardValue
            }, state))
        } else {
            window.location.reload()
        }
          
    }

    const SearchOption = (props) => {
        const options = props.options;
        var color, disable
        if(props.checked){
            disable = false
        }else{
            disable = true
        }
        
      
        return(
            <div style={{backgroundColor: color}}
            className={styles.clicked_search_option_section}>
                <div style={{fontSize:"14px", fontWeight:"bold"}}>{props.black}</div>
                <Autocomplete
                    options={options}
                    disabled={disable}
                    getOptionLabel={(option) => option[props.name]}
                    value={props.value}
                    onChange={(e, value) => handleChange(e, value, props.black)}
                    renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                        <input style={{ width: "90%", height:20, border:"none"}} 
                        placeholder="Nhập tên"
                        //value={props.value}
                        type="text" {...params.inputProps} />
                        </div>
                    )}
                    />
            </div>
        )
    }

    return(
        <div >
            <div style={{fontSize:"17px", textAlign: "center", marginTop: "10px", fontWeight:"bold"}}>
                <span>Nơi ở</span>
            </div>
            <div className={styles.clicked_search_bar}>
                    <SearchOption black="Thành phố" checked={isSelectCity} 
                    value={cityValue} options={props.cities} name="province_name"/>
                    <SearchOption black="Quận" checked={isSelectDistrict} 
                    value={districtValue} options={districtOptions} name="district_name"/>
                    <SearchOption black="Phường" checked={isSelectWard} 
                    value={wardValue} options={wardOptions} name="ward_name"/>
                
                <div style={{width:"45px", textAlign:"center",marginLeft:"20px", transition:"1s"}} 
                className={styles.search_circle_button} onClick={handleSearch}>
                    <span className={styles.helper}></span>
                    <AiOutlineSearch className={styles.search_icon}/>
    
                </div>
            </div>
            
        </div>
        
    )
}

const NavBar = () => {
    const [isShowClickSearchBar, setisShowClickSearchBar] = useState(false)
    const [isShowNormalSearchBar, setIsShowNormalSearchBar] = useState(true)
    //const [isNotClickSearchBar, setIsNotClickSearchBar] = useState(true)
    const [cities, setCities] = useState(null)
    const [districts, setDistricts] = useState(null)
    const [wards, setWards] = useState(null)
    const state = useSelector((state) => state)

    useEffect(() => {
        return () => {
            dispatch(get_location_search({
                city: null,
                district: null,
                ward: null
            }, state))
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if(localStorage.getItem("cities") == null){
                const cityList = await axios.get(
                'https://vapi.vnappmob.com/api/province/'
                );
                setCities(cityList.data.results)
                localStorage.setItem("cities", JSON.stringify(cityList.data.results))

                var city = cityList.data.results
                var districtList = []
                for(let i = 0; i < city.length; i++){
                    const districtTemp = await axios.get("https://vapi.vnappmob.com/api/province/district/" + city[i].province_id)
                    //districtList.concat(districtTemp.data.results)
                    districtList = [...districtList, ...districtTemp.data.results]
                }
                setDistricts(districtList)
                localStorage.setItem("districts", JSON.stringify(districtList))

                var wardList = []
                for(let i = 0; i < districtList.length; i++){
                    const wardTemp = await axios.get("https://vapi.vnappmob.com/api/province/ward/" + districtList[i].district_id)
                    wardList = [...wardList, ...wardTemp.data.results]
                }
                setWards(wardList)
                localStorage.setItem("wards", JSON.stringify(wardList))
            } else{
                var city = JSON.parse(localStorage.getItem("cities"))
                setCities(city)
                var district = JSON.parse(localStorage.getItem("districts"))
                setDistricts(district)
                var ward = JSON.parse(localStorage.getItem("wards"))
                setWards(ward)
            }
        } 
          
          fetchData();
    }, [])

    var height
    if(isShowClickSearchBar)
        height = 170
    else
        height = 90

    const dispatch = useDispatch()
    const searchEvent = (e) => {
        setisShowClickSearchBar(true)
        dispatch(change_background_dark_mode(state))
    }
    const notSearchEvent = (e) => {
        setisShowClickSearchBar(false)
        dispatch(change_background_normal_mode(state))
    }

    const {width} = useViewport()
    if(width < 840){
        return (
            <div className= {styles.navbar_frame}>
                <div className={styles.headerMobile}>
                    <span className={styles.helper}></span>
                    <AiOutlineSearch style={{marginRight:"10px", marginLeft:"25vw"}}  />
                    <span style={{ marginRight:"10px"}}>Lân cận</span>
                    <span>Thêm ngày</span>
                </div>
            </div>
        )
    }
    return (
        <ClickAwayListener onClickAway={notSearchEvent}>
            {cities || districts || wards ?
                <div style={{height: height}} className= {styles.navbar_frame}//'navbar_frame'
                >
                    <div className= {styles.image_section}>
                        {/* <span className={styles.helper}></span> */}
                        <img className={styles.logo} src={logo} alt="Logo"/>
                    </div>
                    
                    {isShowNormalSearchBar && (
                        <CSSTransition
                            timeout={0}
                        >
                        <NotClickSearchBar searchEvent={searchEvent} />
                        </CSSTransition>
                    )}
                    <CSSTransition
                            in={isShowClickSearchBar}
                            timeout={500}
                            unmountOnExit
                            onEnter={() => setIsShowNormalSearchBar(false)}
                            onExited={() => setIsShowNormalSearchBar(true)}
                            classNames="alert"
                        >
                        <HaveClickedSearchBar cities={cities} districts = {districts} wards={wards}/>
                    </CSSTransition>

                    <div className={styles.account_logo}>
                        <div className= {`${styles.section} ${styles.become_owner}`}>
                            {/* <span className={styles.helper}></span> */}
                            <span style={{fontSize: 14, fontWeight:"bold"}}>Trở thành chủ nhà</span>
                        </div>
                        <div className={`${styles.section} ${styles.language_section}`}>
                            {/* <span className={styles.helper}></span> */}
                            <AiOutlineGlobal className={styles.language_icon}/>
                        </div>
                        <div className={`${styles.section} ${styles.setting_section}`}>
                            {/* <span className={styles.helper}></span> */}
                            <AiOutlineMenu className={styles.setting_icon}/>
                        </div>
                    </div>
                </div>
            :<div/>}
        </ClickAwayListener>
        
    );
};

export default NavBar;