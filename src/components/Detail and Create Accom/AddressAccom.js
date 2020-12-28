import React, {useState} from 'react'
// import SearchOption from '../../../Pages/Search Page/Search Option'
import SearchOption from '../../components/Footer'
import common from '../../css/common.module.css'
import detailsAccom from '../../css/pages/detailsAccom.module.css'


const AddressAccom = (props) => {
    const [isSelectCity, setIsSelectCity] = useState(true)
    const [isSelectDistrict, setIsSelectDistrict] = useState(false)
    const [isSelectWard, setIsSelectWard] = useState(false)

    const [cityValue, setCityValue] = useState(props.accom.city)
    const [districtValue, setDistrictValue] = useState(props.accom.district)
    const [wardValue, setWardValue] = useState(props.accom.village)

    const [districtOptions, setDistrictOptions] = useState([])
    const [wardOptions, setwardOptions] = useState([])

    console.log(props.accom.city);
    const check = (value, name) => {
        if(value.length > 0) {
            props.setAccom(name, value);
        } else {
            props.setAccom(name, null);
        }
        
    }
    const inputOnChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        check(value,name)
        
    }
    var originCity = JSON.parse(localStorage.getItem("cities"))
    return (
        <div className={detailsAccom.AddressAccom}>
            <br/><br/>
            <div className={detailsAccom.title}><h2>Nhà/phòng cho thuê của bạn ở đâu?</h2></div>
            <div className={detailsAccom.subTitle}>Khách sẽ chỉ nhận được địa chỉ chính xác của bạn sau khi hoàn tất đặt phòng.</div>
            <br/><br/>
            <div>
                <SearchOption black="Thành phố" 
                    checked={isSelectCity} value={cityValue} name="province_name"
                    options={originCity} setNextOptions={setDistrictOptions}
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}
                    setAccom={props.setAccom}    
                    />
                {cityValue == null ? 
                <div>invalid</div>
                : null}
            </div><br/>
            <div>
                {/* <label>Quận/Huyện</label><br/>
                <input type="text" name="district" value={props.accom.district} onChange={inputOnChange}/> */}
                <SearchOption black="Quận" 
                    checked={isSelectDistrict} value={districtValue} name="district_name"
                    options={districtOptions} setNextOptions={setwardOptions}
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}
                    setAccom={props.setAccom}    
                    />
                {districtValue == null ? 
                <div>invalid</div>
                : null}
            </div><br/>
            <div>
                {/* <label>Xã/Phường</label><br/>
                <input type="text" name="village" value={props.accom.village} onChange={inputOnChange}/> */}
                <SearchOption black="Phường" 
                    checked={isSelectWard} value={wardValue} name="ward_name"
                    options={wardOptions} 
                    setIsSelectDistrict={setIsSelectDistrict} setIsSelectWard={setIsSelectWard}
                    setCityValue={setCityValue} setDistrictValue={setDistrictValue} setWardValue ={setWardValue}
                    setAccom={props.setAccom}    
                    />
                {wardValue == null ? 
                <div>invalid</div>
                : null}
            </div><br/>
            <div >
                <label>Địa chỉ đường/phố</label><br/>
                <input type={detailsAccom.text} name="street" value={props.accom.street} onChange={inputOnChange}/>
                {props.accom.street == null?
                <div>invalid</div>
                : null}
            </div><br/>
            <div>
                <label>Số nhà</label><br/>
                <input type={detailsAccom.text} name="number" value={props.accom.number} onChange={inputOnChange}/>
                {props.accom.number == null?
                <div>invalid</div>
                : null}
            </div><br/>
            </div>
    );
};


export default AddressAccom;