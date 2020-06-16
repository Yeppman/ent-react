import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'
import axios from "axios";

import User_Uploaded_Post from './uploaded_items'

import { notification } from 'antd';
import Home_App_Items from "../../General/SubCategories/Home_Appliances/Home_list";
import Fashion_Items from "../../General/SubCategories/Fashion/Fashion_list";


const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

const host = 'http://127.0.0.1:8000';
const users_uploads_endpoint = host + `/retail/all_uploads/`
const Post_Array = new Array()
class User_Posts_Items extends Component {

    state = {
        general : [],
        loading:true ,
        error : null ,

        Electronics:[],
        Fashion:[],
        HomeApp:[],
        Property:[],
        Vehicles:[],
        Phones :[],
    }

    
    User_Data = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_uploads_endpoint)
        .then(res=>{
            this.setState({
                general: res.data,
                loading:false ,

                Electronics:res.data.Electronics,
                Fashion : res.data.Fashion,
                HomeApp: res.data.HomeAppliances ,
                Property : res.data.Property,
                Phones : res.data.Phones
            })
            const {Electronics, Property, HomeApp, Fashion , general, Phones} = this.state
            
            Post_Array.push(Electronics, Property, HomeApp,Fashion ,Phones )
            
            console.log('All Uploads', Post_Array)
        })
    }


    componentDidMount(){
        this.User_Data(this.props.token)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.User_Data(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {Electronics, Property, HomeApp, Fashion} = this.state
        return(
            <>

            <div className="container">
                <div className="grid grid-cols-4 gap-4">
                     
                            <User_Uploaded_Post Items={Electronics} />
                       
                </div>  
            </div>

            </>
        )
    }


}


const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode
    };
};

//const mapDispatchToProps = dispatch => {
  //return {
    //member: () => dispatch(getMembership())
//}
//}
  
export default connect(
    mapStateToProps,
    //mapDispatchToProps
)(User_Posts_Items)