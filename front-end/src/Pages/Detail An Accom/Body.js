import React, {useState, useEffect} from 'react';
import useViewport from '../../Component/Detect Screen';
import body from './body.module.css'
import axios from 'axios'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { AiOutlineDollar, AiOutlineCoffee } from "react-icons/ai";
import { BsHouseDoor, BsReverseLayoutTextSidebarReverse, BsBuilding, BsBrightnessHigh } from "react-icons/bs";
import { BiBed, BiBath, BiWifi, BiArch, BiWater } from "react-icons/bi";
import { GiElectric } from "react-icons/gi";
import { MdKitchen } from "react-icons/md";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Calendar from 'react-calendar';
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import map_marker from './IconMap'
import { useHistory } from "react-router-dom";
import {useDispatch,useSelector} from 'react-redux'
import Report from '../../Thắng/components/report/Report'
import Footer from '../../Trình/Component/home/Footer'
const ImageSection = (props) => {
    return (
        <div className={body.image_grid_section}>
            <div className={`${body.grid_image_item} ${body.item1}`}>
                <img className={`${body.image} ${body.image1}`}
                src={props.images[0]} alt='Review'/>
            </div>
            <div className={`${body.grid_image_item} ${body.item2}`}>
                <img className={body.image}
                src={props.images[1]} alt='Review'/>
            </div>
            <div className={`${body.grid_image_item} ${body.item3}`}>
                <img className={`${body.image} ${body.image3}`}
                src={props.images[2]} alt='Review'/>
            </div>  
            <div className={`${body.grid_image_item} ${body.item4}`}>
                <img className={body.image}
                src={props.images[3]} alt='Review'/>
            </div>
            <div className={`${body.grid_image_item} ${body.item5}`}>
                <img className={`${body.image} ${body.image5}`}
                src={props.images[4]} alt='Review'/>
            </div>
        </div>
    );
};

const CarouselItem = (props) => {
    return (
        <div className={body.carousel_item}>
            {props.icon}
            <div style={{fontSize:"16px", fontWeight:"700", marginTop:"15px"}}>{props.title}</div>
            <div style={{color:"grey", fontSize:"14px"}}>{props.content}</div>
        </div>
    );
};

const MultiCarousel = (props) => {

    const items = [
        <CarouselItem 
            icon={<AiOutlineDollar className={body.icon}/>} key={1}
            title="Chi phí" content={`${props.accom.price}$/tháng`}/>,
        <CarouselItem 
        icon={<BsHouseDoor className={body.icon}/>} key={2}
        title="Loại nhà ở" content={props.accom.type}/>,
        <CarouselItem 
        icon={<BsReverseLayoutTextSidebarReverse className={body.icon}/>} key={3}
        title="Diện tích" content={props.accom.square}/>,
        <CarouselItem 
        icon={<BiWater className={body.icon}/>} key={4}
        title="Tiền nước" content={props.accom.conveniences.waterBill}/>,
        <CarouselItem 
        icon={<GiElectric className={body.icon}/>} key={5}
        title="Tiền điện" content={props.accom.conveniences.electricBill}/>,
      ];
    

    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3,
          
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          
        }
      };
    return (
        <Carousel className={body.carousel_list}
            ssr
            //deviceType={deviceType}
            itemClass="image-item"
            responsive={responsive}
            >
            {items}
        </Carousel>
    );
};

const Conviniences = (props) => {
    
    const ItemTile = (props) => {
        return (
            <div style={{marginTop:"16px"}}>
                {props.icon}
                {props.check ?
                    <span style={{fontSize:"18px", marginLeft:"15px"}}>{props.text}</span>
                :   <span style={{color:"grey", fontSize:"18px", marginLeft:"15px", textDecoration:"line-through"}}>{props.text}</span>
                }
            </div>
        )
    }
    return (
        <div className={body.conviniences_section}>
            <div style={{fontSize:"26px", fontWeight:"700"}}>Tiện nghi</div>
            <div className={body.conviniences_icon}>
                <div style={{marginRight: "150px"}} className={body.column_icon_tile}>
                    <ItemTile icon={<BiBath className={body.icon}/>} text={props.accom.conveniences.typeOfBathroom} 
                    check={props.accom.conveniences.typeOfBathroom}/>
                    <ItemTile icon={<BsBrightnessHigh className={body.icon}/>} text="Bình nóng lạnh" 
                    check={props.accom.conveniences.isHaveWaterHeater}/>
                    <ItemTile icon={<BiWifi className={body.icon}/>} text="Wifi" 
                    check={props.accom.conveniences.isHaveWifi}/>
                </div>

                <div className={body.column_icon_tile}>
                    <ItemTile icon={<BiArch className={body.icon}/>} text="Ban công" 
                    check={props.accom.conveniences.isHaveBalcony}/>
                     <ItemTile icon={<MdKitchen className={body.icon}/>} text="Phòng bếp" 
                    check={props.accom.conveniences.isHaveKitchen}/>
                    <ItemTile icon={<AiOutlineCoffee className={body.icon}/>} text="Điều hòa" 
                    check={props.accom.conveniences.isHaveAirCondition}/>
                </div>
            </div>
        </div>
    );
};

const CommentTile = (props) => {
    var account = props.commentData.accountId
    var date = new Date(props.commentData.createdAt)
    console.log(account);
    return(
        <div className={body.comment_tile}>
            <div className={body.comment_title}>
                <img className= {body.avatar} 
            src={`data:image/jpg;base64,${account.avatar}`} alt='Avatar'/>
                <div style={{marginLeft:"15px"}}>
                    <div style={{fontSize:"14px", fontWeight: "bold", marginTop:"5px"}}>
                        {account.userId.fullname}
                    </div>
                    <div style={{fontSize:"14px"}}>
                        {`tháng ${date.getMonth()} năm ${date.getFullYear()}`}
                    </div>
                </div>
            </div>

            <div className={body.comment_content}>
                {props.commentData.comment}
            </div>
        </div>
    )
}

const CommentSection = (props) => {
    const [numberComment, setNumberComment] = useState(0)
    const [commentList, setCommentList] = useState(null)
    const [isLoadComment, setIsLoadComment] = useState(false)
    const [comment, setComment] = useState(null)
    var columnLeft = [], columnRight = []
    const accountId = useSelector(state => state.user._id)
    const token = useSelector(state => state.token)

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
              `http://localhost:3001/comment/get/allComment`, {
                  params:{
                      accomId: props.accom._id
                  }
              },{
                headers: {
                    "auth-token": token
                }
            });
            setNumberComment(result.data.numberComment)
            setCommentList(result.data.commentList)
          };
          
          fetchData();
    }, [])
    if(commentList){
        for(let i = 0; i < commentList.length; i++){
            if(i % 2 == 0){
                columnLeft.push(commentList[i])
            } else{
                columnRight.push(commentList[i])
            }
        }
    }

    var numberCommentLeftColumn, numberCommentRightColumn
    if(commentList){
        if(commentList.length <=6){
            numberCommentLeftColumn = 3
            numberCommentRightColumn = 3
        } else{
            if(isLoadComment){
                numberCommentLeftColumn = columnLeft.length
                numberCommentRightColumn = columnRight.length
            } else{
                numberCommentLeftColumn = 3
                numberCommentRightColumn = 3
            }
        }
    }

    const handleSubmit = async (e) => {
        const commnet = e.target.value
        await axios.post("http://localhost:3001/comment/create", {
            accomId: props.accom._id,
            accountId: accountId,
            comment: comment
        },{
            headers: {
                "auth-token": token
            }
        })
        setComment("")
    }
    const handleChange = (e) => {
        setComment(e.target.value)
    }
    return(
        <React.Fragment>
            <div style={{fontSize:"26px", fontWeight:"700"}}>Đánh giá ({numberComment})</div>
            {(commentList) ? 
            <div style={{marginTop:"40px", display:"flex"}}>
                <div>{columnLeft.slice(0, numberCommentLeftColumn).map((item) => {
                        return(
                            <CommentTile commentData={item}/>
                        )
                    })}</div>
                <div>{columnRight.slice(0, numberCommentRightColumn).map((item) => {
                        return(
                            <CommentTile commentData={item}/>
                        )
                    })}</div>
            </div>
            : null}

            {isLoadComment ? 
            <span onClick={() => setIsLoadComment(false)} className={body.load_comment_button}>
                Rút gọn bình luận
            </span>
            :<span onClick={() => setIsLoadComment(true)} className={body.load_comment_button}>
                Hiển thị tất cả bình luận
            </span>}
            <br/>
                
            <div className={body.comment_field}>
                <textarea rows="4" 
                    placeholder="Nhập bình luận của bạn"
                    className={body.textarea_comment}
                    value={comment}
                    onChange={handleChange}>
                </textarea>
                <div onClick={handleSubmit}
                className={body.summit_text}>Send</div>
            </div>
            
           
        </React.Fragment>
    )
}

const MapComponent = (props) => {
    const accoutnId = useSelector(state => state.user._id)
    const [contactId, setContactId] = useState(null)
    let history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:3001/get/contactId", {
                params: {
                    accomId: props.accom._id
                }
            });
            await setContactId(result.data)
          };
          
          fetchData();
    }, [props.accom._id])

    const handleClick = async (e) => {
        if(contactId) {
            await axios.get("http://localhost:3001/newRoom", {
                params: {
                    accountId: accoutnId,
                    contactId: contactId, 
                    accomId: props.accom._id
                }
            })
            history.push({
                pathname: '/inbox',
            })
            history.go(0)
        }
    }
    return(
        <div>
            <div style={{fontSize:"26px", fontWeight:"700"}}>Vị trí</div>
            <MapContainer style={{height:"400px", width:"100%", marginTop:"20px", marginBottom:"16px"}} center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker icon={map_marker} position={[51.505, -0.09]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
            <div style={{fontWeight: "bold"}}>
                {props.accom.address.city}
            </div>
            <div onClick={handleClick} className={body.chat_button}>
                Liên hệ với chủ nhà
            </div>
        </div>
    )
}

const DetailSection = (props) => {
    const [reservationDate, setReservationDate] = useState(null)
    const [isSelectRentDayButton, setIsSelectRentDayButton] = useState(false)
    const [isSelectReturnDayButton, setIsSelectReturnDayButton] = useState(false)
    const [rentDay, setRentDay] = useState(null)
    const [returnDay, setReturnDay] = useState(null)
    const [dialogReport, setDialogReport] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false)
    const accountId = useSelector((state) => state.user._id)
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get("http://localhost:3001/favorite/check", {
                params: {
                    accomId: props.accom._id,
                    accountId: accountId
                }
            });
            await setIsFavorite(result.data)
          };
          
          fetchData();
    }, [])
    const clickFavorite = async () => {
        setIsFavorite(!isFavorite)
        if(isFavorite == false) {
            await axios.get("http://localhost:3001/favorite/create", {
                params:{
                    accomId: props.accom._id,
                    accountId: accountId
                }
            })
        } else{
            await axios.get("http://localhost:3001/favorite/delete", {
                params:{
                    accomId: props.accom._id,
                    accountId: accountId
                }
            })
        }
    }
    
    return (
        <div className={body.detail_section}>
            <div className={body.description_section}>
                <div style={{fontSize:"26px", fontWeight:"700", marginBottom: 16}}>Giới thiệu nhà ở</div>
                <div>{props.accom.description}</div>
                <div className={body.line}/>
                <div style={{fontSize:"26px", fontWeight:"700"}}>Chi tiết nhà ở</div>    
                <MultiCarousel accom={props.accom}/>
                <div className={body.line}/>
                <Conviniences accom={props.accom}/>
            
            </div>

            <div className={body.renting_board_section}>
                <div className={body.board}>            
                    <div style={{fontSize:"20px", fontWeight:"bold"}}>${props.price} /tháng</div>

                    <div className={body.renting_time}>
                        <div className={body.select_time} onClick={() => setIsSelectRentDayButton(true)}>
                            <div style={{fontWeight:"600", fontSize:"16px"}}>Nhận phòng</div>
                        </div>
                        <div className={body.select_time} onClick={() => setIsSelectReturnDayButton(true)}>
                            <div style={{fontWeight:"600", fontSize:"16px"}}>Trả phòng</div>
                        </div>
                    </div>
                    
                    {isFavorite == false ?
                        <div onClick={clickFavorite}
                        style={{fontWeight:"600", fontSize:"18px", color:"white", cursor:"pointer"}} className={body.button}>
                            Yêu thích
                        </div>
                    : <div onClick={clickFavorite}
                        style={{fontWeight:"600", fontSize:"18px", color:"white", backgroundColor:"red", cursor:"pointer"}} className={body.button}>
                            Bỏ thích
                        </div>}
                </div>
                <div onClick={()=>setDialogReport(true)} style={{textAlign:"center", fontSize: 15, color:"grey", cursor:"pointer", textDecoration:"underline", marginTop: 20}}>
                Báo cáo nhà/phòng cho thuê này</div>
                <Report onClick={()=>setDialogReport(false)} openDialog={dialogReport}/>        
            </div>
        </div>
    );
};

const Body = (props) => {
    const [accomData, setAccomData] = useState(null)
    const [padding, setPadding] = useState(390)
    const [numberOfFavorite, setNumberOfFavorite] = useState(null)

    var newPadding = 390
    var x = window.screen.width
    const {width} = useViewport()
    
    useEffect(() => {
        if(width > 1280){
            newPadding = 390 - (x - width) / 2
            setPadding(newPadding)
        } else if(width <= 1280 && width > 1130) {
            setPadding(70)
        } else {
            setPadding(40)
        }
    }, [width])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
              `http://localhost:3001/user/getAccomDetail/${props.id}`
            );
            console.log(result.data);
            await setAccomData(result.data)
          };
          
          fetchData();
    }, [props.id])

    useEffect(() => {
        const fetchData = async () => {
            const numberFavorite = await axios.get(
              `http://localhost:3001/favorite/get/${props.id}`
            );
            await setNumberOfFavorite(numberFavorite.data)
          };
          
        fetchData();
    }, [props.id])

    return (
        <React.Fragment>
        <div style={{
            paddingLeft: `${padding}px`,
            paddingRight: `${padding}px`, 
            paddingTop: "25px",
            paddingBottom: "25px",
        }} className={body.body_section}>
            {accomData ? 
            <div>
                <div style={{
                    fontSize:"30px", 
                    fontWeight:"600"}}>
                    {accomData.title}
                </div>
                
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <div style={{color: "grey"}}>
                        {`${accomData.address.village}, ${accomData.address.district}, ${accomData.address.city}`}
                    </div>
                    
                    <div>
                        {accomData.favorite} lượt thích
                    </div>
                </div>

                <ImageSection images={accomData.images}/>
                <DetailSection price={accomData.price} accom={accomData}/>
                <div className={body.line}/>
                <CommentSection accom={accomData}/>
                 <div className={body.line}/>
                <MapComponent accom={accomData}/>
            </div>
            : null}
        </div>
        <div style={{marginTop:20}} id='footer'>
            <Footer/>
        </div>
        </React.Fragment>
    );
};

export default Body;