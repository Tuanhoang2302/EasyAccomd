import React, {useState, useEffect} from 'react';
import body from './Body.module.css'
import { Carousel } from 'react-bootstrap';
// import hotel1 from '../assets/images/hotel.jpg'
// import hotel2 from '../assets/images/hotel2.jpg'
import popular_image_1 from '../../assets/images/popular_place_image1.jpg'
import useViewport from '../../Component/Detect Screen';
import { AiFillStar } from "react-icons/ai";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Slider from '@material-ui/core/Slider';
import CustomizedSlider from './Custom Slider'
import Checkbox from '@material-ui/core/Checkbox';

const Option = (props) => {
    const handleClick = () => {
        props.setIsDisplay({ ...props.isDisplay, [props.checker]: true });
    }
    return (
        <div onClick={handleClick} className={body.option} >
            <span>{props.text}</span> 
        </div>
    );
};

const AccomTypeBoard = (props) => {
    const handleChange = (e) => {
        props.setStateAccomType(e.target.value);
    }
    const resetState = () => {
        props.setStateAccomType(null);
    }
    const label = {
        fullPrivate: {
            label_title: "Toàn bộ nhà",
            label_detail: "Tìm một nơi cho riêng bạn"
        },
        halfPrivate: {
            label_title: "Phòng Riêng",
            label_detail: "Có phòng riêng và chia sẻ một số không gian chung"
        },
        public: {
            label_title: "Phòng Chung",
            label_detail: "Ở trong một không gian chia sẻ, như phòng chung"
        }
    }
    const CheckBoxTile = (label_title, label_detail) => {
        return(
            
            <div className={body.check_box_tile}>
                <FormControlLabel
                control={<Radio 
                value={label_title}
                />}
                />
                <div className={body.check_box_label}>
                    <div style={{fontWeight:"bold"}}>{label_title}</div>
                    <div>{label_detail}</div>
                </div>
            </div>

        )
    }
    return(
        <ClickAwayListener onClickAway={()=> props.setIsDisplay({ ...props.isDisplay, ["accomType"]: false })}>
        <div className={body.filter_board}>
            <FormGroup >
            <RadioGroup  value={props.stateAccomType} onChange={handleChange}>
                {CheckBoxTile(
                    label.fullPrivate.label_title,
                    label.fullPrivate.label_detail,
                )}
                {CheckBoxTile(
                    label.halfPrivate.label_title,
                    label.halfPrivate.label_detail,
                )}
                {CheckBoxTile(
                    label.public.label_title,
                    label.public.label_detail,
                )}
            </RadioGroup>
            </FormGroup>

            <div onClick={resetState}
            style={{textDecoration:"underline", fontWeight:"bold", cursor:"pointer"}}>Xóa</div>
        </div>
        </ClickAwayListener>
    )
}


const PriceFilterBoard = (props) => {
    var min_price, max_price
    if(props.statePrice == null){
        min_price = 0
        max_price = 20
    } else{
        min_price = props.statePrice[0]
        max_price = props.statePrice[1]
    }

    const resetState = () => {
        props.setStatePrice(null)
    }
    return(
        <ClickAwayListener onClickAway={()=> props.setIsDisplay({ ...props.isDisplay, ["price"]: false })}>
            <div className={body.filter_board}>
                <div style={{marginBottom:"30px"}}>Giá trung bình hàng tháng là </div>
                <CustomizedSlider 
                statePrice={props.statePrice}
                setStatePrice={props.setStatePrice}
                />
                <div style={{fontStyle:"italic", fontSize:"13px", textAlign:"center"}}>Đơn vị: triệu đồng</div>

                <div className={body.price_input_section}>
                    <div className={body.price}>
                        <div style={{fontSize:"12px", color:"grey"}}>Giá tối thiểu</div>
                        <span>{min_price} triệu</span>
                    </div>
                    <div className={body.price}>
                        <div style={{fontSize:"12px", color:"grey"}}>Giá tối đa</div>
                        {max_price == 20 ? 
                        <span>{max_price}+ triệu</span>
                        : <span>{max_price} triệu</span>}
                    </div>
                </div>
                <div onClick={resetState} 
                style={{textDecoration:"underline", fontWeight:"bold", cursor:"pointer"}}>Xóa</div>
            </div>
        </ClickAwayListener>
    )
}

const OtherFilterBoard = (props) => {
    const stateOtherFilter = props.stateOtherFilter
    const handleChange = (event) => {
        if(event.target.checked){
            props.setNumberSelectedFilter(props.numberSelectedFilter + 1)
        } else{
            props.setNumberSelectedFilter(props.numberSelectedFilter - 1)
        }
        props.setStateOtherFilter({ ...stateOtherFilter, [event.target.name]: event.target.checked });
      };

    const resetState = () => {
        props.setStateOtherFilter(props.stateFilter)
        props.setNumberSelectedFilter(0)
    }

    const CheckBoxTile = (checked, name, label) => {
        return(
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} name={name} />}
                label={label}
            />
        )
    }
    return(
        <ClickAwayListener onClickAway={()=> props.setIsDisplay({ ...props.isDisplay, ["otherFilter"]: false })}>
            <div className={body.filter_board}>
                <div>
                    <div style={{fontWeight:'bold'}}>Tiện nghi</div>
                    <div style={{marginTop:"5px", display:"flex"}}>
                        <FormGroup style={{marginRight:"40px"}}>
                            {CheckBoxTile(stateOtherFilter.isHaveBathroom, "isHaveBathroom", "Phòng tắm")}
                            {CheckBoxTile(stateOtherFilter.isHaveWaterHeater, "isHaveWaterHeater", "Bình nóng lạnh")}
                            {CheckBoxTile(stateOtherFilter.isHaveAirConditioner, "isHaveAirConditioner", "Điều hòa")}
                        </FormGroup>
                        <FormGroup >
                            {CheckBoxTile(stateOtherFilter.isHaveBalcony, "isHaveBalcony", "Ban công")}
                            {CheckBoxTile(stateOtherFilter.isHaveWifi, "isHaveWifi", "Wifi")}
                            {CheckBoxTile(stateOtherFilter.isHaveKitchen, "isHaveKitchen", "Phòng bếp")}
                        </FormGroup>
                    </div>
                </div>
                <div className={body.line}></div>
                <div>
                    <div style={{fontWeight:'bold'}}>Sắp xếp theo</div>
                    <div style={{marginTop:"5px", display:"flex"}}>
                        <FormGroup style={{marginRight:"45px"}}>
                            {CheckBoxTile(stateOtherFilter.favorite, "favorite", "Lượt yêu thích")}
                        </FormGroup>
                        <FormGroup >
                            {CheckBoxTile(stateOtherFilter.view, "view", "Lượt xem")}
                        </FormGroup>
                    </div>
                </div>
                <div onClick={resetState} 
                style={{textDecoration:"underline", fontWeight:"bold", cursor:"pointer"}}>Xóa</div>
            </div>
        </ClickAwayListener>
    )
}

//---------------------------------------------------------

const AccomTile = (props) => {
    var rate
    if(props.data.rate == null){
        rate ="Chưa có đánh giá"
    }else{
        rate= props.data.rate
    }
    var accom = {
        id: props.data._id,
        rate: rate,
        type: props.data.type,
        location: props.data.address.city,
        title: props.data.title,
        price: props.data.price, 
        images: props.data.images
    }
    
    let history = useHistory();
    const handleClick = async (e) => {
        await axios.get("http://localhost:3001/accomodation//update/incrementView", {
            params:{
                accomId: accom.id
            }
        })
        history.push({
            pathname: `/accom-detail/id=${accom.id}`,
            state: {
                id: accom.id
            }
        })
      }

    var carouselItem = []
    for(let i = 0; i < 5; i++){
        carouselItem.push(
            <Carousel.Item onClick={handleClick} key={i + 1}  className={body.carousel_item}>
                <img className= {`${body.carousel_image} ${body.hotel1}`} 
                src={`data:image/jpg;base64,${accom.images[i]}`} alt='Review'/>
            </Carousel.Item>
        )
    }

   
    return (
        <div>
            <Carousel interval={null} className={body.carousel_section}
            >
                {carouselItem}
            </Carousel>

            <div className={body.description_section}>
                <div style={{marginTop:"5px"}} className="rate">
                    <AiFillStar style={{color:"#ff0080", marginRight:"5px"}}/>
                    <span>{accom.rate}</span>
                </div>

                <div className="location">
                    <span >{accom.type}</span>
                    <span style={{marginLeft:"5px", marginRight:"5px"}}>-</span>
                    <span>{accom.location}</span>
                </div>

                <div>
                    <span className={body.description}>{accom.title}</span>
                </div>

                <div>
                    <span style={{fontWeight:"bold"}}>${accom.price}</span>
                    <span> /đêm</span>
                </div>
            </div>
        </div>
        
    )
}

const AccomListSection = (props) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
              'http://localhost:3001/user/getFiveAccom',
              {params: {
                  city: props.city
              }}
            );
            await setData(result.data)
          };
          
          fetchData();

    }, [props.city])

    var number = 5
    const {width} = useViewport()
    if(width >= 1660){
        number = 5
    }else if(width < 1660 && width >= 1360){
        number = 4
    }else if(width < 1360 && width >= 1130){
        number = 3
    } else if(width < 1130 && width >= 743){
        number = 2
    } else {
        number = 1
    }          
        
    return (
    <div>
        {(() => {
        if (data != null) {
            var fullListAccomTile = []
            
            for(let i = 0; i < 5; i++) {
                
                fullListAccomTile.push(
                    <AccomTile data ={data[i]} key={i + 1}/>
                )
            }
            var actualListAccomTile = fullListAccomTile.slice(0, number)

            return(
                <div style={{marginBottom: "60px"}}>
                    <div style={{fontWeight:"600", fontSize:"24px", marginBottom:"15px"}}>{props.city}</div>
                    <div className={body.carousel_list_section}>
                        {actualListAccomTile}
                    </div>
                </div>
            )
        } else{
            return(
                <div></div>
            )
        }
        })()}
    </div>
    );
};

//-------------------------------------------------------

const PopularPlaceTile = () => {
    return(
        <div className={body.popular_places_tile}>
            <span className={body.helper}></span>
            <img 
            className= {body.popular_places_image} 
            src={popular_image_1} alt='places'/>
            <div style={{marginLeft:"15px", fontSize:"16px"}}>
                <span className={body.helper}></span>
                <span>Thị xã Sầm Sơn</span>
            </div>
        </div>
    )
}

const PopularPlaceList = () => {
    var number = 4
    const {width} = useViewport()
    var popularPlaceList = []

    if(width < 1130){
        number = 2
    }
    for(let i = 0; i < number; i++){
        popularPlaceList.push(<PopularPlaceTile key={i+1}/>)
    }
    return(
        <div className={body.popular_places_list}>
            {popularPlaceList}
        </div>
    )
}

function Body() {
    const stateFilter = {
        isHaveBathroom: false,
        isHaveWaterHeater: false,
        isHaveAirConditioner: false,
        isHaveBalcony: false,
        isHaveWifi: false,
        isHaveKitchen: false,

        favorite: false,
        view: false
      }
    const [stateAccomType, setStateAccomType] = useState(null);    
    const [statePrice, setStatePrice] = useState(null);
    const [stateOtherFilter, setStateOtherFilter] = React.useState(stateFilter);  
    const [numberSelectedFilter, setNumberSelectedFilter] = useState(0)
    const locationSearch = useSelector((state) => state.locationSearch)
    
    const [isDisplay, setIsDisplay] = useState({
        accomType: false,
        price: false,
        otherFilter: false
     });  
    var color= ""
    if(useSelector(state => state.isDarkBackgroundMode))
        color = "rgba(0, 0, 0, 0.1)"
    
    return (

    <div style={{background: color}} className={body.body}>
        {(() => {
            var title
            if(locationSearch){
                if(locationSearch.city){
                    title = locationSearch.city.province_name
                }else{
                    title = "Chỗ ở đăng gần đây"
                }
            }else if(stateOtherFilter || stateAccomType || statePrice){
                title = "Chỗ ở theo bộ lọc"
            } else {
                title = "Chỗ ở đăng gần đây"
            }
            return <span style={{fontSize:33, fontWeight:"700"}}>{title}</span>
        })()}
        
        
        <div className={body.option_section}>
            <div>
                {(() => {
                    var text
                    if(stateAccomType == null){
                        text = "Loại nơi ở"} 
                    else{text = stateAccomType}
                    return(
                        <Option setIsDisplay={setIsDisplay} isDisplay={isDisplay}
                        checker="accomType" text={text}/>
                    )
                })()}
        
                {isDisplay.accomType ?
                    <AccomTypeBoard stateAccomType={stateAccomType}
                        setStateAccomType={setStateAccomType}
                        setIsDisplay={setIsDisplay} 
                        isDisplay={isDisplay}
                    />
                :null}
            </div>
            
            <div>
                {(() => {
                    var text
                    if(statePrice == null){
                        text = "Giá"} 
                    else if(statePrice[1] == 20){
                        text = statePrice[0] + " - trên " + statePrice[1] + " triệu"
                    }
                    else{
                        text = statePrice[0] + " - " + statePrice[1] + " triệu"}
                    return(
                        <Option setIsDisplay={setIsDisplay} isDisplay={isDisplay}
                        checker="price" text={text}/>
                    )
                })()}
                
                {isDisplay.price ?
                    <PriceFilterBoard statePrice={statePrice}
                        setStatePrice={setStatePrice}
                        setIsDisplay={setIsDisplay} 
                        isDisplay={isDisplay}
                    />
                :null}
            </div>
            
            <div>
                <Option setIsDisplay={setIsDisplay} isDisplay={isDisplay}
                    checker="otherFilter" text={"Bộ lọc khác"}/>
                {isDisplay.otherFilter ?
                    <OtherFilterBoard
                        stateOtherFilter={stateOtherFilter}
                        setStateOtherFilter={setStateOtherFilter}
                        setIsDisplay={setIsDisplay} 
                        isDisplay={isDisplay}
                        numberSelectedFilter={numberSelectedFilter}
                        setNumberSelectedFilter={setNumberSelectedFilter}
                        stateFilter={stateFilter}
                    />
                :null}
            </div>

            {(numberSelectedFilter > 0 || stateAccomType || statePrice) ?
                <div style={{backgroundColor:"#f32c72"}} className={body.option} >
                <span style={{color:"white"}}>Tìm kiếm</span> 
            </div>
            : null}
            
        </div>

        <div className={body.accom_section}>
            <AccomListSection city="Ninh Bình"/>
            {/* <AccomListSection city="Hà Giang"/>
            <AccomListSection city="Thanh Hóa"/> */}
        </div>

        <div
        style={{fontWeight:"600", fontSize:"24px", marginBottom:"15px"}}
        className={body.popular_places_section}>
            <div>Điểm đến phổ biến khác</div>
            <PopularPlaceList/>
            <PopularPlaceList/>
        </div>
    </div>
        
    );
}

export default Body;