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
                        <NavLink className="link-list" to="/registration" style={{padding: '12px'}}>Đăng ký</NavLink>
                    </li>
                    <div></div>
                    <li className="content-list">
                        <NavLink className="link-list" to="/login"  style={{padding: '12px'}}>Đăng nhập</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
}
class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state={showResults: false};
    }
    render() {
        return (
            <div className="homeHeader">
                    <div className="firtHeader">
                        <NavLink className="logo" to="/"></NavLink>
                        <div className="directional">
                            <div className="owner">
                                <NavLink className="link-owner" to="/">
                                    <div className="link-owner-text">Trở thành chủ nhà</div>
                                </NavLink>
                            </div>
                            <div className="main-directional">
                                <button type="button" className="btn-main-directional" onClick={this.handleClick}>
                                    <div className="btn-list"></div>
                                    <div className="btn-user"></div>
                                </button>
                                { this.state.showResults ? <Control /> : null }
                            </div>
                        </div>
                    </div>
                    <Search/>
            </div>
        );
    }
    handleClick() {
        if(!this.state.showResults){
            this.setState({ 
                showResults: true
            });
        }
        else{
            this.setState({ 
                showResults: false
            });
        }
    }
}

export {Header, Control};