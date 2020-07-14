import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux"; 
import TemporaryDrawer from '../Sidebar/SideNav'
import {InputNumber  ,notification, Modal } from 'antd';
//import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SimpleTable from './Table'
import Create_Inventory from './Create_Item'

const  openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
  }

const host = "https://backend-entr.herokuapp.com"

class Inventory_Store extends Component{
    state ={
      AllowUser:false ,

      inventory_objects : [],
      Price : null,
      Total_Obj: null ,
      total : null ,
      loading : true,
      error : null,

     
    }

   
    Inventories = async(token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get('https://backend-entr.herokuapp.com/management/view_inventory/')
      .then(res =>{
        this.setState({
          inventory_objects : res.data,
          total: 0,
          loading: false
        })
         console.log(res.data)
      })
    }

    Inventory_Data  = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + "/management/inventory_data/"
      await axios.get(endpoint)
      .then(res=>{
        this.setState({
          Price : res.data.Price ,
          Total_Obj : res.data.Total
        })
      })
    } 

    delete_item = (item_id)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      const endpoint = host + `/management/clear_inventory_item/${item_id}/`
       axios.post(endpoint)
      .then(res=>{

          openNotification(res.data['Message'])
      })
    }

    QuantityChanger = async(Quantity_needed)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      const endpoint = host + "/management/inventory_data/"
      await axios.get(endpoint, {
        params:{
          Quantity_needed
        }
      })
      .then(res=>{
          console.log(res.data)
      })
    } 

    //Verifies Membership
    GrantUser = false
    accountType = async (token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + '/stream/user_membership'
      await axios.get(endpoint)
      .then(res=>{
          const planMode = res.data[0].membership
          console.log('the plan',planMode)
          if (planMode=='Basic' || planMode == 'Premium'){
            this.setState({
              AllowUser:true
            })
            console.log(this.state.AllowUser)
            this.GrantUser = true
            
        }
      })
     
     }


    componentDidMount(){
      
      if (this.props.token !== undefined && this.props.token !== null) {
        this.accountType(this.props.token)
        this.Inventories(this.props.token)
        this.Inventory_Data(this.props.token)
      }
    }

     componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Inventories(newProps.token)
            this.Inventory_Data(newProps.token)
            this.accountType(newProps.token)
          }
        }
      }


    render(){
        const {inventory_objects, loading, error, Price, Total_Obj , AllowUser} = this.state
        return(

                <>
                  {
                    AllowUser? (
                      <>
                      <TemporaryDrawer />

                        <div className='main'>
                          
                        <div className="container ">
                          <div className="grid grid-cols-8">
                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Items
                                  </h3>
                              </div>
                                <div className="top-card-text">
                                    {Total_Obj} 
                                </div>
                              </div>
                          </div> 

                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Inventory Finance
                                  </h3>
                              </div>
                                <div className="top-card-text">
                                 ₦ {Price}
                                </div>
                              </div>
                          </div> 


                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Create A Item
                                  </h3>
                              </div>
                                <div className="top-card-text">
                                      <Create_Inventory/>
                                      
                                </div>
                              </div>
                          </div> 

                          </div>

                          <div className="container">
                          <div className="grid grid-col-6">
                          <div className=" col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <SimpleTable token={this.props.token} data = {inventory_objects} />
                            </div>
                          </div>
                          </div>



                          </div>
                        </div>

                      </>
                    ) :(
                      <>
                      <TemporaryDrawer/>
                     <div className="main">
                     <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-4 lg:col-span-4">
                        <p>
                 Upgrade to use this feature
                 </p>
                        </div>
                    </div>
                  </div>
                     </div>
                    </>
                    )
                  }

                </>
        )
    }
} 


const mapStateToProps = state => {
  return {
    token: state.auth.token ,  
    isAuth: state.auth.token !== null ,
    is_seller: state.auth.is_seller ,
    membership_type: state.membership.mode,
  };
};

export default connect(
  mapStateToProps,
  null
)(Inventory_Store);