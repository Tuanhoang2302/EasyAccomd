import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css'
import logo from '../assets/images/logo.png'
import { AiOutlineSearch, AiOutlineGlobal, AiOutlineMenu } from "react-icons/ai";
import useViewport from '../Component/Detect Screen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './animation.css'
import { CSSTransition } from 'react-transition-group';
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './calender.css'
import {useSelector, useDispatch} from 'react-redux'
import {change_background_dark_mode} from '../redux/action/action'
import {change_background_normal_mode} from '../redux/action/action'
import axios from 'axios';

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
    const [reservationDate, setReservationDate] = useState(null)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
              'http://localhost:3001/user/reservation/find',
              {params: {
                  accomId:"5fc7aec1b1b6432cd8f2824f"
              }}
            );
            await setReservationDate(result.data)
          };
          
          fetchData();

    }, [])

    const [isSelectRentDay, setIsSelectRentDay] = useState(false)
    const [isSelectReturnDay, setIsSelectReturnDay] = useState(false)
    const [isSelectLocation, setIsSelectLocation] = useState(false)
    var bgSearchBarColor="", bgOptionLocationColor
    if(isSelectRentDay || isSelectReturnDay || isSelectLocation){
        bgSearchBarColor = "#f5f5f5"
    }
    if(isSelectLocation)
        bgOptionLocationColor="white"
    else if(isSelectLocation == false && bgSearchBarColor=="#f5f5f5"){
        bgOptionLocationColor="#f5f5f5"
    }

    const SearchOption = (props) => {
        return(
            <div style={{backgroundColor:props.selectColor}} className={styles.clicked_search_option_section}>
                <div style={{fontSize:"14px", fontWeight:"bold"}}>{props.black}</div>
                <div style={{color:"grey"}}>{props.grey}</div>
            </div>
        )
    }

    return(
        <div >
            <div style={{fontSize:"17px", textAlign: "center", marginTop: "10px", fontWeight:"bold"}}>
                <span>Nơi ở</span>
            </div>
            <div style={{backgroundColor: bgSearchBarColor}} className={styles.clicked_search_bar}>
                <ClickAwayListener onClickAway={() => {setIsSelectLocation(false)}}>
                    <div onClick={() => {setIsSelectLocation(true)}} style={{paddingRight: "130px", backgroundColor:bgOptionLocationColor}} className={styles.hover}>
                        <div style={{fontSize:"14px", fontWeight:"bold"}}>Địa điểm</div>
                        {isSelectLocation == false ? 
                            <div style={{color:"grey"}}>Bạn sắp đi đâu</div>
                        :   <input type="text" placeholder="Bạn sắp đi đâu" autoFocus className={styles.input}/>
                        }
                    </div>
                </ClickAwayListener>

                <ClickAwayListener onClickAway={() => {setIsSelectRentDay(false)}}>
                    <div onClick={() => {setIsSelectRentDay(true)}}>
                        {isSelectRentDay ? 
                            <div style={{position:"absolute", marginTop:"60px", zIndex:"1"}}>
                                {(()=> {
                                    var disabledDates=[]
                                    if(reservationDate){
                                        for(let i = 0; i < reservationDate.length; i++){
                                            var startDate = Date.parse(reservationDate[i].startDate)
                                            var endDate = Date.parse(reservationDate[i].endDate)
                                            var Difference_In_Time = endDate - startDate
                                            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 

                                            for(let j = 0; j <= Difference_In_Days; j++){
                                                var beginDate = new Date(reservationDate[i].startDate)                     
                                                beginDate.setDate(beginDate.getDate() + j)
                                                disabledDates.push(beginDate)
                                            }
                                        }

                                        return <Calendar tileDisabled={({date, view}) => {
                                            return (view === 'month') && // Block day tiles only
                                            disabledDates.some(disabledDate =>
                                            date.getFullYear() === disabledDate.getFullYear() &&
                                            date.getMonth() === disabledDate.getMonth() &&
                                            date.getDate() === disabledDate.getDate()
                                            )}
                                        }
                                        minDate={new Date()}
                                    />
                                    }else{
                                        return null
                                    }
                                })()}
                                
                            </div>
                        : null
                        }
                        {isSelectRentDay ? 
                        <SearchOption selectColor="white" black="Nhận phòng" grey="Thêm ngày"/>
                        : <SearchOption black="Nhận phòng" grey="Thêm ngày"/>
                        }
                    </div>
                </ClickAwayListener>

                <ClickAwayListener onClickAway={() => {setIsSelectReturnDay(false)}}>
                    <div onClick={() => {setIsSelectReturnDay(true)}}>
                        {isSelectReturnDay ? 
                            <div style={{position:"absolute", marginTop:"60px", zIndex:"1"}}>
                                <Calendar minDate={new Date()}/>
                            </div>
                        : null
                        }
                        {isSelectReturnDay ? 
                        <SearchOption selectColor="white" black="Trả phòng" grey="Thêm ngày"/>
                        : <SearchOption  black="Trả phòng" grey="Thêm ngày"/>
                        }
                    </div>
                </ClickAwayListener>
                
                <SearchOption className={styles.clicked_search_option_section} black="Khách" grey="Thêm khách"/>
                <div style={{width:"45px", textAlign:"center", transition:"1s"}} className={styles.search_circle_button}>
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
    var height
    if(isShowClickSearchBar)
        height = 170
    else
        height = 90

    const dispatch = useDispatch()
    const searchEvent = (e) => {
        setisShowClickSearchBar(true)
        dispatch(change_background_dark_mode())
    }
    const notSearchEvent = (e) => {
        setisShowClickSearchBar(false)
        dispatch(change_background_normal_mode())
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
                    <HaveClickedSearchBar/>
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
        </ClickAwayListener>
    );
};

export default NavBar;