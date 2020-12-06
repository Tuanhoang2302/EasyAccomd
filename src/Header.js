import React from 'react';

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
function Header() {
  return (
      <div>
            <div className="firtHeader">
                <a className="logo" href="http://localhost:3000/">
                </a>
                <div className="directional">
                    <div className="owner">
                        <a className="link-owner" href="http://localhost:3000/">
                            <div className="link-owner-text">Trở thành chủ nhà</div>
                        </a>
                    </div>
                    <div className="main-directional">
                        <button type="button" className="btn-main-directional">
                            <div className="btn-list"></div>
                            <div className="btn-user"></div>
                        </button>
                    </div>
                </div>
            </div>
            <Search/>
      </div>
  );
}

export default Header;