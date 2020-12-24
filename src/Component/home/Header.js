import React from 'react';
import {NavLink} from 'react-router-dom';
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
class Control extends React.Component {
    render(){
        return(
            <div className="control-directional">
                <ul className="ul-footer">
                    <li className="content-list" style={{borderBottom: 'gray solid 1px'}}>
                        <NavLink className="link-list" to="/personal" style={{padding: '12px'}}>Tài khoản</NavLink>
                    </li>
                    <li className="content-list" style={{padding: '0px 12px 12px 12px', cursor: 'pointer'}}>
                        Đăng xuất
                    </li>
                </ul>
            </div>
        );
    }
}
class FirtHeader extends React.Component {
    constructor(props){
        super(props);
        this.handleEnter = this.handleEnter.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.state={showResults: false};
    }
    render() {
        return (
            <div className="firtHeader">
                <NavLink className="logo" to="/"></NavLink>
                <div className="directional">
                    <div className="owner">
                        <NavLink className="link-owner" to="/">
                            <div className="link-owner-text">Tìm kiếm nhà trọ</div>
                        </NavLink>
                    </div>
                    <div className="owner">
                        <NavLink className="link-owner" to="/registration">
                            <div className="link-owner-text">Trở thành chủ nhà</div>
                        </NavLink>
                    </div>
                    <div className="owner header-signInUp">
                        <NavLink className="link-owner" to="/registration">
                            <div className="link-owner-text">Đăng ký</div>
                        </NavLink>
                    </div>
                    <div className="owner header-signInUp">
                        <NavLink className="link-owner" to="/login">
                            <div className="link-owner-text">Đăng nhập</div>
                        </NavLink>
                    </div>
                    <div className="main-directional" onMouseEnter={this.handleEnter} onMouseLeave={this.handleLeave}>
                        <button type="button" className="btn-main-directional">
                            <div className="btn-list"></div>
                            <div className="btn-user"></div>
                        </button>
                        { this.state.showResults ? <Control /> : null }
                    </div>
                </div>
            </div>
        );
    }
    handleEnter() {
        this.setState({ 
            showResults: true
        });
    }
    handleLeave() {
        this.setState({ 
            showResults: false
        });
    }
}
class Header extends React.Component {
    render() {
        return (
            <div className="homeHeader">
                <FirtHeader/>
                <Search/>
            </div>
        );
    }
}

export {Header, Control, FirtHeader};