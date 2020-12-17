import React, {useState, useEffect} from 'react';
import body from './Body.module.css'
import { Carousel } from 'react-bootstrap';
// import hotel1 from '../assets/images/hotel.jpg'
// import hotel2 from '../assets/images/hotel2.jpg'
import popular_image_1 from '../assets/images/popular_place_image1.jpg'
import useViewport from '../Component/Detect Screen';
import { AiFillStar } from "react-icons/ai";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {useSelector} from 'react-redux'

const Option = (props) => {
    return (
        <div className={body.option} >
            <span>{props.text}</span> 
        </div>
    );
};

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
    const handleClick = (e) => {
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
    
    var color= ""
    if(useSelector(state => state.isDarkBackgroundMode))
        color = "rgba(0, 0, 0, 0.1)"

    return (

    <div style={{background: color}} className={body.body}>
        <span style={{fontSize:33, fontWeight:"700"}}>Chỗ ở gần bạn</span>
        
        <div className={body.option_section}>
            <Option text="Loại nơi ở"/>
            <Option text="Giá"/>
            <Option text="Đặt ngày"/>
            <Option text="Bộ lọc khác"/>
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