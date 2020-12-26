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
import {change_background_dark_mode, get_location_search, logout} from '../../redux/action/action'
import {change_background_normal_mode} from '../../redux/action/action'
import axios from 'axios';
import SearchOption from './Search Option'
import { useHistory } from "react-router-dom";

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
    const history = useHistory()
    useEffect(() => {
        if(cityValue != null){
            history.go(0)
        }
    }, [state.locationSearch])

    

    const handleSearch = async () => {
        if(cityValue){
            dispatch(get_location_search({
                city: cityValue,
                district: districtValue,
                ward: wardValue
            }, state))
            history.push('/search')
        } else {
            history.push('/search')
        }
          
    }

    return(
        <div >
            <div style={{fontSize:"17px", textAlign: "center", marginTop: "10px", fontWeight:"bold"}}>
                <span>Nơi ở</span>
            </div>
            <div className={styles.clicked_search_bar}>
                    <SearchOption black="Thành phố" 
                    checked={isSelectCity} value={cityValue} name="province_name"
                    options={props.cities} setNextOptions={setDistrictOptions}
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}/>

                    <SearchOption black="Quận" 
                    checked={isSelectDistrict} value={districtValue} name="district_name"
                    options={districtOptions} setNextOptions={setwardOptions}
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}/>

                    <SearchOption black="Phường" 
                    checked={isSelectWard} value={wardValue} name="ward_name"
                    options={wardOptions} 
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}/>
                
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
    const history = useHistory()
    const [isShowControl, setIsShowControl] = useState(false)
    useEffect(() => {
        return () => {
            dispatch(change_background_normal_mode(state))
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
                var city = await JSON.parse(localStorage.getItem("cities"))
                setCities(city)
                var district = await JSON.parse(localStorage.getItem("districts"))
                setDistricts(district)
                var ward = await JSON.parse(localStorage.getItem("wards"))
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
    var controlTileText = ["Tìm kiếm", "Tin nhắn", "Quản lý nhà", "Tài khoản", "Đăng xuất"]
    var link = ["/search", "/inbox", "/user/manage", "/personal", "/"]

    const controlTileEvent = (e,link) => {
        if(link == "/"){
            history.push(link)
            setTimeout(() => {
                dispatch(logout())                
            }, 500);

        } else {
            history.push(link)
        }
    }
    const ControlTile = (props) => {
        if(props.text != "Đăng xuất"){
            return <div onClick={(e) => controlTileEvent(e, props.link)} className={styles.control_tile_normal}>{props.text}</div>
        } else{
            return <div onClick={(e) => controlTileEvent(e, props.link)} className={styles.control_tile_logout}>{props.text}</div>
        }
    }
    return (
        <ClickAwayListener onClickAway={notSearchEvent}>
            {cities || districts || wards ?
                <div style={{height: height}} className= {styles.navbar_frame}//'navbar_frame'
                >
                    <div className= {styles.image_section}>
                        {/* <span className={styles.helper}></span> */}
                        <img onClick={() => history.push("/")} className={styles.logo} src={logo} alt="Logo"/>
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
                        <HaveClickedSearchBar cities={cities} />
                    </CSSTransition>

                    <div className={styles.account_logo}>
                        {/* <div className= {`${styles.section} ${styles.become_owner}`}>
                            <span className={styles.helper}></span>
                            <span style={{fontSize: 14, fontWeight:"bold"}}>Trở thành chủ nhà</span>
                        </div> */}
                        <div className={`${styles.section} ${styles.language_section}`}>
                            {/* <span className={styles.helper}></span> */}
                            <AiOutlineGlobal className={styles.language_icon}/>
                            <div className={styles.control_board}>
                            {(() => {
                                if(isShowControl){
                                    var controlTileList = []
                                    for(let i = 0; i< controlTileText.length; i++){
                                        controlTileList.push(<ControlTile link={link[i]} text={controlTileText[i]}/>)
                                    }
                                    return controlTileList
                                } else {
                                    return null
                                }
                            })()}
                        </div>
                        </div>
                        <ClickAwayListener onClickAway={() => setIsShowControl(false)}>
                            <div onClick ={() => setIsShowControl(!isShowControl)} className={`${styles.section} ${styles.setting_section}`}>
                                {/* <span className={styles.helper}></span> */}
                                <AiOutlineMenu className={styles.setting_icon}/>
                                
                            </div>
                            
                        </ClickAwayListener>
                        
                    </div>
    
                </div>
            :<div/>}
        </ClickAwayListener>
        
    );
};

export default NavBar;