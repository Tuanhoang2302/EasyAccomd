import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import Error from './page/Error';
import ListContext from './context/ListContext';
import Manage from './page/Manage';
import CreateAccom from './page/CreateAccom'
import DetailsAccom from './page/DetailsAccom'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accomSelect: -2,
      setAccomSelect: this.setAccomSelect.bind(this),
      listAccom: [
        {
          status: "Đã cho thuê",
          image: "default.jpg",
          title: "Nhà số 1",
          description: "Nhà nguyên căn",
          city: "Hà Nội",
          district: "Cầu Giấy",
          village: "Dịch Vọng Hậu",
          street: "Phạm Văn Đồng",
          number: "Số 1",
          typeOfBathroom: "",
          waterHeater: true,
          airConditioner: true,
          balcony: false,
          electricAndWaterBill: "",
          otherConveniences: "",
          typeOfAccom: "",
          price: 100000,
          isSelect: false
        }, 
        {
          status: "Đã cho thuê",
          image: "default.jpg",
          title: "Nhà số 2",
          description: "Nhà nguyên căn",
          city: "Hà Nội",
          district: "Cầu Giấy",
          village: "Dịch Vọng Hậu",
          street: "Phạm Văn Đồng",
          number: "Số 2",
          typeOfBathroom: "",
          waterHeater: true,
          airConditioner: true,
          balcony: false,
          electricAndWaterBill: "",
          otherConveniences: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          typeOfAccom: "",
          price: 200000,
          isSelect: false
        }, 
        {
          status: "Đã cho thuê",
          image: "default.jpg",
          title: "Nhà số 3",
          description: "Nhà nguyên căn",
          city: "Hà Nội",
          district: "Cầu Giấy",
          village: "Dịch Vọng Hậu",
          street: "Phạm Văn Đồng",
          number: "Số 2",
          typeOfBathroom: "",
          waterHeater: true,
          airConditioner: true,
          balcony: false,
          electricAndWaterBill: "",
          otherConveniences: "",
          typeOfAccom: "",
          price: 200000,
          isSelect: false
        }, 
        {
          status: "Đã cho thuê",
          image: "default.jpg",
          title: "Nhà số 4",
          description: "Nhà nguyên căn",
          city: "Hà Nội",
          district: "Cầu Giấy",
          village: "Dịch Vọng Hậu",
          street: "Phạm Văn Đồng",
          number: "Số 2",
          typeOfBathroom: "",
          waterHeater: true,
          airConditioner: true,
          balcony: false,
          electricAndWaterBill: "",
          otherConveniences: "",
          typeOfAccom: "",
          price: 200000,
          isSelect: false
        }
      ],
      setListAccom: this.setListAccom.bind(this),
      listNotification: [
        {
          user: "Thắng",
          content: "bình luận"
        },
        {
          user: "Thắng",
          content: "yêu thích"
        },
        {
          user: "Thắng",
          content: "yêu thích"
        },
        {
          user: "Thắng",
          content: "bình luận"
        },
        {
          user: "Thắng",
          content: "bình luận"
        }
      ]
    }
  }

  setListAccom(listAccom) {
    this.setState(state => {
      return {
        listAccom: [...listAccom]
      }
    })
  }

  setAccomSelect(num) {
    this.setState(state => {
      return {
        accomSelect: num
      }
    })
  }

  render() {
    return (
      <Router>
          <ListContext.Provider value={this.state}>
          <div className="App">
            <Switch>
              
              <Route exact path="/">
                  <Manage />
              </Route>
              <Route exact path="/createAccom">
                  <CreateAccom setIndex={this.setAccomSelect.bind(this)} index={this.accomSelect}/>
              </Route>
              <Route exact path="/createAccom/details">
                  <DetailsAccom accom={this.state.accomSelect>=0? {...this.state.listAccom[this.state.accomSelect]}:{}} />
              </Route>

              <Route>
                <Error />
              </Route>

            </Switch>
          </div>
        </ListContext.Provider>
      </Router>
    )
  };
}

export default App;
