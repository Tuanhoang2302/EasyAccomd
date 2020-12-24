import React from 'react';
import discovery1 from '../../img/discovery1.jpg';
import discovery2 from '../../img/discovery2.jpg';
import discovery3 from '../../img/discovery3.jpg';
import discovery4 from '../../img/discovery4.jpg';
class Uni extends React.Component {
    render(){
        return(
            <div className="uni">
                <a className="link-uni" href="http://localhost:3000/">
                    <span className="img-uni"></span>
                    <span className="text-uni">
                        <span className="info-uni"><b>{this.props.name}</b></span>
                        <span className="info-uni">{this.props.address}</span>
                    </span>
                </a>
            </div>
        );
    }
}
class Post extends React.Component {
    render(){
        return(
            <div className="post">
                <a className="link-post" href="http://localhost:3000/">
                    <span className="img-post"></span>
                    <span className="text-post">
                        <span className="info-post"><b>{this.props.money}</b></span>
                        <span className="info-post"><b>{this.props.address}</b></span>
                    </span>
                </a>
            </div>
        );
    }
}
const ImgExtend = (props) =>{
    return(
        <div className="discovery" style={props.style}>
            <div className="img-discovery" style={{backgroundImage: 'url('+props.url+')'}}></div>
            <div className="text-discovery">{props.text}</div>
        </div>
    );
}
class Main extends React.Component{
    render(){
        return(
            <div>
                <div className="content-main">
                    <span className="text-content-main">Gần trường đại học</span>
                    <div className="content-uni">
                        <Uni name="Đại học Quốc gia Hà Nội" address="Dịch Vọng Hậu-Cầu Giấy"></Uni>
                        <Uni name="Đại học Thương mại" address="Mai Dịch-Cầu Giấy"></Uni>
                        <Uni name="Đại học Bách khoa Hà Nội" address="Bách Khoa-Hai Bà Trưng"></Uni>
                        <Uni name="Học viện Công nghệ Bưu chính Viễn thông" address="Mỗ Lao-Hà Đông"></Uni>
                        <Uni name="Đại học Luật Hà Nội" address="Thành Công-Đống Đa"></Uni>
                        <Uni name="Đại học Giao thông vận tải" address="Cầu Giấy-Hà Nội"></Uni>
                        <Uni name="Học viện Báo chí và Tuyên truyền" address="Xuân Thủy-Hà Đông"></Uni>
                        <Uni name="Đại học Mỏ Hà Nội" address="Cầu Diễn-Bắc Từ Liêm"></Uni>
                    </div>
                </div>
                <div className="content-main">
                    <span className="text-content-main">Mới đăng gần đây</span>
                    <div className="content">
                        <Post money="3 Triệu" address="Dịch Vọng Hậu-Cầu Giấy"></Post>
                        <Post money="2 Triệu" address="Mai Dịch-Cầu Giấy"></Post>
                        <Post money="5 Triệu" address="Bách Khoa-Hai Bà Trưng"></Post>
                        <Post money="4 Triệu" address="Văn Quán-Hà Đông"></Post>
                    </div>
                </div>
                <div className="content-main" style={{width: '100%',backgroundColor: 'black'}}>
                    <section style={{padding: '50px'}}>
                        <span className="text-content-main" style={{marginLeft: '0px', display: 'block', color: 'rgb(255, 255, 255)'}}>Trải nghiệm không gian trực tuyến</span>
                        <small><span style={{color: 'rgb(255, 255, 255)'}}>Các hình ảnh mô phỏng phòng trọ cùng với những trang bị nội thất.</span></small>
                    </section>
                    <div className="content-img">
                        <ImgExtend style={{gridArea: '1 / 1 / span 2 / auto'}} url={discovery1} text="Chung cư mini với thiết kế đẹp"/>
                        <ImgExtend style={{gridArea: '1 / 2 / auto / auto'}} url={discovery2} text="Chung cư mini với thiết kế đẹp"/>
                        <ImgExtend style={{gridArea: '1 / 3 / auto / auto'}} url={discovery3} text="Chung cư mini với thiết kế đẹp"/>
                        <ImgExtend style={{gridArea: '2 / 2 / auto / span 2'}} url={discovery4} text="Chung cư mini với thiết kế đẹp"/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Main;