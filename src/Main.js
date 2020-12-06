import React from 'react';
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
function Main(){
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
                    <Uni name="Đại học Hà Nội" address="Văn Quán-Hà Đông"></Uni>
                </div>
            </div>
            <div className="content-main">
                <span className="text-content-main">Mới đăng gần đây</span>
                <div className="content">
                    <Post money="3 Triệu" address="Dịch Vọng Hậu-Cầu Giấy"></Post>
                    <Post money="2 Triệu" address="Mai Dịch-Cầu Giấy"></Post>
                    <Post money="5 Triệu" address="Bách Khoa-Hai Bà Trưng"></Post>
                </div>
            </div>
        </div>
    )
}
export default Main;