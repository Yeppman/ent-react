import React, { Component } from 'react'
import Pusher from 'pusher-js';
import { Link, withRouter } from 'react-router-dom';

import axios from "axios";
import { connect } from "react-redux";

import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {notification,message} from 'antd'


const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const host = 'https://backend-entr.herokuapp.com'
const orders_endpoint = host + '/management/buyers_orders/'

class buyerOrders extends Component{
    state = {
        orders :[],
        loading:false,
        error:null
    }

    Orders = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
        await axios.get(orders_endpoint)
        .then(res=>{
            this.setState({
                orders:res.data
            })
            console.log('Customer Orders',res.data)
        }).catch(e=>{
            console.log(e)
        })

    }

    componentDidMount(){
        //this.test_ws()
        if (this.props.token !== undefined && this.props.token !== null) {
            this.Orders(this.props.token)
            
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.Orders(newProps.token)
                
            }
        }
      }


      render(){
        const {orders} = this.state
          return(
              <>
             
             <div className="container">
                    <div className="grid grid-cols-8 gap-4">
                    {
                         
                         orders.map((c)=>(
                              <div className=" col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">
                         <div className="orders-card">
                              <div className="card-container">

                              <div className="card-text">
                                     Order ID:   {c.Order_id}
                                   </div>

                                   <div className="card-text">
                                     Client Name:   {c.Client_Name}
                                   </div>
                                   <div className="card-text">
                                   Client Email : {c.Client_Email}
                                   </div>
                                   <div className="card-text">
                                     Location :{c.Client_Adress}
                                   </div>

                                   <div className="card-text">
                                     {
                                          c.Delivered?(
                                               <p>
                                               Success
                                               </p>
                                          ):(
                                               <p>
                                                    Pending
                                               </p>
                                          )
                                     }
                                   </div>
                                   
                                   <div className="grid grid-cols-4">
                                   <div className ="col-span-2">
                                        <a class="open-button_view" 
                                        href={`/orders_details/${c.id}`}>
                                        Open
                                        <FontAwesomeIcon icon={faBoxOpen} />
                                        </a>
                                   </div>
                                   <div className="col-span-2">
                                       
                                        <a class="delete-button_view" onClick={()=>{this.delete_order(c.id)}}>
                                        Delete
                                        <FontAwesomeIcon icon={faTrash} />
                                        </a>
                                   </div> 
                                   </div>

                              </div>
                         </div>
                    </div>
                         ))
                    }
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
      is_buyer: state.auth.is_buyer ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(buyerOrders);