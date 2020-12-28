import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux'
import { logout } from '../../../redux/action/action';
import { useHistory } from "react-router-dom";
class Search extends React.Component{
  render(){
      return(
          <form className= "search-form">
              <div className= "search-form-main">
                <div className="main-search">
                    <ObjectInput className="Province_City" text="Tỉnh/Thành phố" placeholder="Hà Nội/Nghệ An"/>
                    <ObjectInput className="dientich" text="Diện tích" placeholder="25m2/35m2/..."/>
                    <ObjectInput className="tien" text="Tiền" placeholder="2500000/3500000"/>
                    <ObjectInput className="phong" text="Phòng" placeholder="Chung chủ/Khép kín"/>
                    <button type="submit" className="btn-submit"></button>
                </div>
              </div>
          </form>
      );
  }
}
class ObjectInput extends React.Component{
  render(){
      return(
          <div className="obj-form">
              <div className="obj-main">
                <label htmlFor={this.props.id} className="form-label">
                    <div className="form-main">
                        <div className="form-text">{this.props.text}</div>
                        <input type="text" className="form-control" id={this.props.id} placeholder={this.props.placeholder}/>
                    </div>
                </label>
              </div>
          </div>
      );
  }
}
// class ObjectSelect extends React.Component{
//   render(){
//       return(
//           <div>
//               <label htmlFor={this.props.id} className="form-label">{this.props.text}</label>
//               <select className="form-select" id={this.props.id}>
//                   <option value="">{this.props.text}</option>
//               </select>
//           </div>                
//       );
//   }
// }


const Control = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const SignOut = () => {
        dispatch(logout())
        history.push('/login')
    }
    return (
        <React.Fragment>
            
            <div className="control-directional">
                <ul className="ul-footer">
                    {user && 
                    <React.Fragment>
                        <li className="content-list">
                            <NavLink className="link-list" to="/search" style={{padding: '12px'}}>Search</NavLink>
                        </li>
                        <li className="content-list">
                            <NavLink className="link-list" to="/inbox" style={{padding: '12px'}}>Tin nhắn</NavLink>
                        </li>
                        <li className="content-list" >
                            <NavLink className="link-list" to="/user/manage" style={{padding: '12px'}}>Quản lý nhà</NavLink>
                        </li>
                        <li className="content-list" style={{borderBottom: 'gray solid 1px'}}>
                            <NavLink className="link-list" to="/personal" style={{padding: '12px'}}>Tài khoản</NavLink>
                        </li>
                        <li className="content-list">
                            <NavLink onClick={SignOut} className="link-list" to="/"  style={{padding: '12px', cursor:"pointer"}}>Đăng xuất</NavLink>
                        </li>
                    </React.Fragment>}

                </ul>
            </div>

    
        </React.Fragment>
    );
};

const FirtHeader = () => {
    const [showResults, setShowResults] = useState(false)
    const user = useSelector(state => state.user)
    const handleEnter = () => {
        setShowResults(true)
    }
    const handleLeave = () => {
        setShowResults(false)
    }
    return (
        <div style={{minHeight: '70px'}}>
            <div className="firtHeader">
                <NavLink className="logo" to="/"></NavLink>
                <div className="directional">
                    {!user &&
                    <React.Fragment>
                        <div className="owner">
                            <NavLink className="link-owner" to="/registration">
                                <div className="link-owner-text">Đăng ký</div>
                            </NavLink>
                        </div>
                        <div className="owner">
                            <NavLink className="link-owner" to="/login">
                                <div className="link-owner-text">Đăng nhập</div>
                            </NavLink>
                        </div>
                    </React.Fragment>}
                    <div className="main-directional" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
                        <button type="button" className="btn-main-directional">
                            <div className="btn-list"></div>
                            <div className="btn-user"></div>
                        </button>
                        { showResults ? <Control /> : null }
                    </div>
                </div>
            </div>
        </div>
    );
};

class Header extends React.Component {
    render() {
        return (
            <div className="homeHeader">
                <FirtHeader/>
                <div className="back-titleHeader">
                    <span className="text-titleHeader">Bạn đang tìm kiếm phòng trọ và điều đó có ở đây!</span>
                    <NavLink to="/search"><span className="text-header">Khám phá ngay</span></NavLink>
                </div>
            </div>
        );
    }
}

export {Header, Control, FirtHeader};