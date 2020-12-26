import React, {useState, useEffect} from 'react';
import styles from './Navbar.module.css'
import logo from '../../assets/images/logo.png'
import { AiOutlineSearch, AiOutlineGlobal, AiOutlineMenu } from "react-icons/ai";
import useViewport from '../../Component/Detect Screen';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
//import 'react-calendar/dist/Calendar.css';

const NavBar = () => {
    
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
        
        <div className= {styles.navbar_frame}//'navbar_frame'
        >
            <div className= {styles.image_section}>
                {/* <span className={styles.helper}></span> */}
                <img className={styles.logo} src={logo} alt="Logo"/>
            </div>
            

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
        
    );
};

export default NavBar;