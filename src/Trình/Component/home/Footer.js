import React from 'react';

class List extends React.Component {
    render() {
        require('../../index.css')
        return (
            <li className="content-list">
                <a className="link-list" href={this.props.href}>{this.props.name}</a>
            </li>
        );
    }
}
class Footer extends React.Component{
    render(){
        require('../../index.css')
        return(
            <div>
                <div className="main-footer">
                    <section className="content-footer">
                        <h4 className="title-footer">Giới thiệu</h4>
                        <ul className="ul-footer">
                            <List href="" name="Phương thức hoạt động"></List>
                            <List href="" name="Tìm kiếm nhà trọ"></List>
                            <List href="" name="Cho thuê nhà trọ"></List>
                            <List href="" name="Nhà trọ gần trường đại học"></List>
                        </ul>
                    </section>
                    <section className="content-footer">
                        <h4 className="title-footer">Chủ nhà trọ</h4>
                        <ul className="ul-footer">
                            <List href="" name="Đăng ký tài khoản"></List>
                            <List href="" name="Đăng nhập với tư cách chủ trọ"></List>
                            <List href="" name="Đăng bài cho thuê trọ"></List>
                        </ul>
                    </section>
                    <section className="content-footer">
                        <h4 className="title-footer">Người thuê trọ</h4>
                        <ul className="ul-footer">
                            <List href="" name="Đăng ký tài khoản"></List>
                            <List href="" name="Tìm kiếm phòng trọ"></List>
                            <List href="" name="Phòng trọ yêu thích của bạn"></List>
                        </ul>
                    </section>
                    <section className="content-footer">
                        <h4 className="title-footer">Hỗ trợ</h4>
                        <ul className="ul-footer">
                            <List href="" name="Hưỡng dẫn ký hợp đồng"></List>
                            <List href="" name="Trung tâm trợ giúp "></List>
                        </ul>
                    </section>
                </div>
                <div className="end-footer" >@2020 3T Software Co.Ltd</div>
            </div>
        );
    }
}
export default Footer;