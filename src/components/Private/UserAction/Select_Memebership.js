import React, { Component } from 'react'
import {Row, Statistic,Col , List, Avatar ,Rate,Input , Spin ,Card , Form, Button ,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined , ArrowUpOutlined, ArrowDownOutlined,
     EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

import axios from "axios";
import { connect } from "react-redux";

//import RavePayment from '../../containers/Payment Gateway/RavePay'
import Paystacker from '../Payment Gateway/Paystack'

const UserMembership_url  = 'https://theebs.pythonanywhere.com/stream/user_membership' 

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
class Membership_Select extends Component{

     state ={
        Subscriptions : [],
        Basic_Plan : [],
        Premium_Plan : [],
        Selected : false,
        error : null,
        Selected_plan :[],
        my_membership : null,
     }

     Get_User_Membership = (token) =>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios.get(UserMembership_url)
        .then(res =>{
            this.setState({
              my_membership : res.data[0]
            }); console.log('memberships',res.data[0])
        })
        .catch(e =>{
            console.log(e)
        }) 
    }

     Subscription_List = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
       await axios.get('https://theebs.pythonanywhere.com/stream/membership_payment_list/')
       .then(res =>{
         this.setState({
          Subscriptions : res.data,
          Basic_Plan : res.data[1],
          Premium_Plan : res.data[2]
         })
         console.log(res.data[2])
       })
     }
     
     mini_state = {
       'Plan_type': null
     }
     
     //basic_plan_id = this.state.Basic_Plan.id
     Basic_Plan_init =()=>{
       const Basic_Plan_parse = this.state.Basic_Plan
       const the_users_membership = this.state.my_membership
     
       if(the_users_membership['membership'] === Basic_Plan_parse['membership_type']){
         openNotification('You are already subscribed to this plan')
       }else{
        this.setState({
          Selected :true,
         // Selected_plan:  Basic_Plan_parse
        })
        this.mini_state = {
          'Plan_type': Basic_Plan_parse
        }
        console.log(this.mini_state)
       }
      
     }

     Premium_Plan_init =()=>{
      const Premuim_Plan_parse = this.state.Premium_Plan
      const the_users_membership = this.state.my_membership
      if(the_users_membership['membership'] === Premuim_Plan_parse['membership_type']){
        openNotification('You are already subscribed to this plan')
      }
      else{
        this.setState({
          Selected :true,
         // Selected_plan:  Basic_Plan_parse
        })
        this.mini_state = {
          'Plan_type': Premuim_Plan_parse
        }
        console.log(this.mini_state)
      }
      
     }

    componentDidMount(){
      this.Subscription_List(this.props.token)
      this.Get_User_Membership(this.props.token)
      
    }

     componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.Subscription_List(newProps.token)
          this.Get_User_Membership(newProps.token)
          
        }
      }
    }


     render(){
            const {Basic_Plan , Premium_Plan, Selected , Selected_plan} = this.state
            const {Plan_type} = this.mini_state            

            return(

               <>
                  
 
                  <div className="container">
                    <div className="flex">
                    <div className="columns">
                        <ul className="price">
                          <li className="header" >Free</li>
                          <li className="grey">₦0/Mth</li>
                          <li>Analytics</li>
                          <li> Inventory Management System</li>
                          <li>Email and SMS marketing</li>
                          <li>Logistics</li>
                          <li className="grey">
                          <a disabled className="button">
                            Select Plan
                          </a>
                          </li>
                        </ul>
                      </div>

                    <div className="columns">
                        <ul className="price">
                          <li className="header" >Basic</li>
                          <li className="grey">₦{Basic_Plan.price}/Mth</li>
                          <li>Analytics</li>
                          <li> Inventory Management System</li>
                          <li>Email and SMS marketing</li>
                          <li>Logistics</li>
                          <li className="grey">
                          <a  onClick={this.Basic_Plan_init} className="button">
                            Select Plan
                          </a>
                          </li>
                        </ul>
                      </div>

                      <div className="columns">
                        <ul className="price">
                          <li className="header">{Premium_Plan.membership_type}</li>
                          <li className="grey">₦{Premium_Plan.price}/Mth</li>
                          <li>Analytics</li>
                          <li> Inventory Management System</li>
                          <li>Email and SMS marketing</li>
                          <li>Logistics</li>
                          <li> Live Notification</li>
                          <li>
                          Content Creation with Canva
                          </li>
                          <li> 
                          Products and Services are Advertised
                          </li>
                          <li className="grey"><a 
                          onClick={this.Premium_Plan_init}
                          className="button">
                            Select Plan
                          </a>
                          </li>
                        </ul>
                      </div>
                
                    </div>
                  </div>


              <div className="container">
              {
                Selected ?(
                  <div className="grid grid-cols-4">
                    <div className="col-span-4">
                    <Paystacker 
                  pricing = {Plan_type.price} 
                  Membership = {Plan_type.membership_type}
                  Membership_id  = {Plan_type.id}
                   />
                    </div>
                  </div>
                ) : (
                 <div className="grid grid-cols-4">
                 <p>
                  
                  </p>
                 </div>
                )
              }
              </div>


                  

               </>
               
          )
     }
}


const mapStateToProps = state => {
  return {
    token: state.auth.token 
  };
};

export default connect(
  mapStateToProps,
  null
)(Membership_Select);