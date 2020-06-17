import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Calendar  ,Card ,notification, Form, Button } from 'antd';

import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TemporaryDrawer from '../Sidebar/SideNav'
import {Bar} from 'react-chartjs-2';

import axios from "axios";
import { connect } from "react-redux";

const {Meta} = Card

const  openNotification = (msg) => {
     notification.open({
       message: 'Notification Title',
       description:msg,
       onClick: () => {
         console.log('Notification Clicked!');
       },
     });
     }

class Logicstics_Channel extends Component{
     state = {
          channels : [],
          chartData :[],
          delivered : 0,
          pending : 0,
          total : 0,
     }

     Analysis = () =>{
          this.setState({
               chartData:{
                 labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                 datasets:[
                   {
                     label:'Population',
                     data:[
                       617594,
                       181045,
                       153060,
                       106519,
                       105162,
                       95072
                     ],
                     backgroundColor:[
                       'rgba(255, 99, 132, 0.6)',
                       'rgba(54, 162, 235, 0.6)',
                       'rgba(255, 206, 86, 0.6)',
                       'rgba(75, 192, 192, 0.6)',
                       'rgba(153, 102, 255, 0.6)',
                       'rgba(255, 159, 64, 0.6)',
                       'rgba(255, 99, 132, 0.6)'
                     ]
                   }
                 ]
               }
             });
     }

     Get_All_logicstics = (token) =>{
          axios.defaults.headers = {
               "Content-Type": "application/json",
               Authorization: `Token ${token}`
             };
          axios.get('https://ent-react.vercel.app/management/view_logicstics/')
          .then(res =>{
               this.setState({
                    channels : res.data
               }); console.log('res data' ,res.data);
               
          }).catch(e =>{
               console.log(e)
          })

     };

     Order_Counts = async(token)=>{
          axios.defaults.headers = {
               "Content-Type": "application/json",
               Authorization: `Token ${token}`
             }
          await axios.get(`https://ent-react.vercel.app/management/order_counter/`)
          .then(res =>{
               this.setState({
                    delivered : res.data.Delivered,
                    pending: res.data.Pending,
                    total : res.data.Total
               })
               console.log(res.data)
          })
     }

     delete_order = async(order_id)=>{
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
          await axios.post(`https://ent-react.vercel.app/management/delete_logicstics/${order_id}/`)
          .then(res =>{
              openNotification(res.data['Message'])
          })
      }

     componentDidMount(){
          this.Analysis()
          this.Get_All_logicstics(this.props.token)
          this.Order_Counts(this.props.token)
     }

     componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.Get_All_logicstics(newProps.token)
              this.Order_Counts(newProps.token)
            }
          }
        }
    

     render(){
          const {channels, delivered, pending, total, chartData} = this.state
          let delivery_status = channels.Delivered
        if(delivered == true){
            delivery_status = 'Delivered Succesfully'
        }else{
            delivery_status = "Pending"
        } 
          const {is_seller} = this.props
          
          return(

               <div>
                    {
                         is_seller ? (
                              <>
          <TemporaryDrawer />

          <div className="container mx-auto">  
           <div className="grid grid-cols-4 ">
                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Delivered Orders
                          </h3>
                      </div>
                        <div className="top-card-text">
                              {delivered}
                        </div>
                      </div>
                  </div> 

                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Pending Orders
                          </h3>
                      </div>
                        <div className="top-card-text">
                              {pending}
                        </div>
                      </div>
                  </div> 

                  <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="top-card">
                          
                      <div className="top-card-title">
                          <h3 className="top-card-title">
                            Total
                          </h3>
                      </div>
                        <div className="top-card-text">
                              {total}
                        </div>
                      </div>
                  </div> 

                 

            </div>
            </div>


            <div className="container">
                    <div className="grid grid-cols-8 gap-4">
                    {
                         
                         channels.map((c)=>(
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
                                        href={`/view_order/${c.id}`}>
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
                  ):
                  (
                    <div className="container">
                    <div className="grid-cols-12">
                        <div className="col-span-5">

                        </div>

                        <div className="col-span-5">
                          You are not authorized for this channel
                        </div>


                    </div>
                </div>
                  )
         }
               </div>

          )
     }

}


const mapStateToProps = state => {
     return {
       token: state.auth.token,
       isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
     };
   };
   
    
export default connect(
mapStateToProps,
null
)(Logicstics_Channel);