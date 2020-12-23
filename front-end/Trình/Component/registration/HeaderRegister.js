import React from 'react';
import {NavLink} from 'react-router-dom';
import {Control} from '../home/Header';

class HeaderRegister extends React.Component {
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state={showResults: false};
    }
    render() {
        require('../../index.css')
        return (
            <div>
                    <div className="firtHeader">
                        <NavLink className="logo" to="/"></NavLink>
                        <div className="directional">
                            <div className="owner">
                                <NavLink className="link-owner" to="/">
                                    <div className="link-owner-text" style={{color: 'black'}}>Trở thành chủ nhà</div>
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

export default HeaderRegister;