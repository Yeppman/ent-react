import React, { Component } from 'react'
import Pusher from 'pusher-js';


import axios from "axios";
import { connect } from "react-redux";

import {notification,message,Tabs} from 'antd'
import TemporaryDrawer from './Sidebar/SideNav'

import UsersSimpleTable from './Table/UsersTable'
import MoneySimpleTable from './Table/TransactionTable'
import CampaignSimpleTable from './Table/CampaignTable'
import { DataUsageSharp } from '@material-ui/icons';

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const { TabPane } = Tabs;

const host = 'https://backend-ent.herokuapp.com'

const transactions_endpoint = host + '/excite-admin-connect/transactions_list/'
const logistics_endpoint = host +'/excite-admin-connect/logistics_list/'
const webhook_data_endpoint = host + '/excite-admin-connect/webhook_data_list'
const users_count_endponit =  host + '/excite-admin-connect/count_users/'
const transactions_coun_endpoint = host + '/excite-admin-connect/count_transactions'

const transactions_webhook_endpoint = host + '/excite-admin-connect/webhook_data_list'
const profile_list_endpoint = host + '/excite-admin-connect/list_profiles/'

class AdminDashboard extends Component {

    // The User Proifle State
    state = {

        Profiles:[],

        Transactions:[],
        UsersList : [],

        CampaignsData:[],
        usersTotal:[],
        WebhookTotal:[],
        TransactionTotal:[],
        ordersCount:[],
          }
    
    UsersCounter = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_count_endponit)
        .then(res=>{
            if (res.status == 200 || res.data == 201){
                this.setState({
                    usersTotal:res.data.UsersCount,
                    
                })
                console.log('User on the platform', res.data.Users_Qs)
            }else{
                openNotification(res.data['Message'])
            }
        })
    }

    LogisticsCounter = (token) =>{
        axios.defaults.headers = {
             "Content-Type": "application/json",
             Authorization: `Token ${token}`
           };
        axios.get('https://backend-ent.herokuapp.com/management/admin_logistics_list/')
        .then(res =>{
            const data = res.data
             this.setState({
                ordersCount : data.length
             }); console.log('res data' ,res.data);
             
        }).catch(e =>{
             console.log(e)
        })

   };

   
    CampaignList = () =>{
    // console.log(token)
    // axios.defaults.headers = {
    //      "Content-Type": "application/json",
    //      Authorization: `Token ${token}`
    //    };
     axios.get('https://backend-ent.herokuapp.com/excite-admin-connect/admin-c-list/')
    .then(res =>{
        const data = res.data
         this.setState({
            CampaignsData : data
         }); console.log('Campaign Data data' ,res.data);
            
        })

    };

  
    TransactionCounter = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(transactions_coun_endpoint)
        .then(res=>{
            if (res.status == 200 || res.data == 201){
                this.setState({
                    WebhookTotal:res.data.webhook_count,
                    TransactionTotal:res.data.transactions_qs,
                })
                console.log(res.data)
            }else{
                openNotification(res.data['Message'])
            }
        })
    }
 
    Transactions = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(transactions_webhook_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    Transactions:res.data
                })
                console.log('Transactions', res.data)
            }else{
                this.setState({
                    Transactions:0
                })
                openNotification('Error Getting Transactions')
            }
        })
    }

    Profiles = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(profile_list_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    Profiles:res.data
                })
                console.log('Profiles', res.data)
            }else{
                openNotification('Error Getting Profiles')
            }
        })
    }

    test_ws(){
      var pusher = new Pusher('8b827980b6cb1e62195c', {
        cluster: 'eu'
      });
      
      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
        console.log(JSON.stringify(data))
      });
      console.log('tryiing...')
     
    }

   


    componentDidMount(){
      //this.test_ws()
      if (this.props.token !== undefined && this.props.token !== null) {
        this.UsersCounter(this.props.token)
        this.TransactionCounter(this.props.token)
        this.LogisticsCounter(this.props.token)
        this.Profiles(this.props.token)
        this.Transactions(this.props.token)
        this.CampaignList()
        
      }
    }
    
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
            this.UsersCounter(newProps.token)
            this.TransactionCounter(newProps.token)
            this.LogisticsCounter(newProps.token)
            this.Transactions(newProps.token)
            this.Profiles(newProps.token)
            this.CampaignList()


       }
      }
    }
  
    
    render() {
       
     
    const {usersTotal,WebhookTotal, ordersCount , CampaignsData, Transactions ,Profiles} = this.state
    const AllowAdmin  = true
        

    return (          
          <div>
            {
              AllowAdmin ? (
                <>

                <TemporaryDrawer />
  
            
                  <div
                
                   className="container">
                    
                    <div className="grid grid-cols-4">
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                            <div className="top-card">
                                
                            <div className="top-card-title">
                                <h3 className="top-card-title">
                                  Registered Users
                                </h3>
                            </div>
                              <div className="grid grid-cols-2">
                              <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                {usersTotal}
                              </div>  
                              
                              </div>
                            </div>
                        </div>
  
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="top-card">
                            
                        <div className="top-card-title">
                            <h3 className="top-card-title">
                              Transactions
                            </h3>
                        </div>
                          <div className="top-card-text">
                              {WebhookTotal}
                          </div>
                        </div>
                    </div> 
   
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                    <div className="top-card">
                                
                                <div className="top-card-title">
                                    <h3 className="top-card-title">
                                      Logistics Orders
                                    </h3>
                                </div>
                                  <div className="grid grid-cols-2">
                                  <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                      {ordersCount}   
                                  </div>  
                                  <div className="pt-3 
                                  
                                  col-span-1
                                  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                  <a className="top-card-text"
                                  href={`/admin_logistics`}>
                                      Open
                                      </a>
                                  </div>
                                  </div>
                                </div>
                    </div>
  

                  
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                    <div className="top-card">
                                
                                <div className="top-card-title">
                                    <h3 className="top-card-title">
                                     Campaigns
                                    </h3>
                                </div>
                                  <div className="grid grid-cols-2">
                                  <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                        
                                  </div>  
                                  <div className="pt-3 
                                  
                                  col-span-1
                                  sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                  <a className="top-card-text"
                                  href={`/admin_logistics`}>
                                      Open
                                      </a>
                                  </div>
                                  </div>
                                </div>
                    </div>
                   
  
                    </div>
  
                  </div>   
  
                <div className="container">
                    <div className="grid grid-cols-6">
                        <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                            
                            <Tabs>

                            
                            <TabPane tab="Users" key="1">
                            <UsersSimpleTable data={Profiles}/>
                            </TabPane>

                            
                            <TabPane tab="Campaigns" key="2">
                            <CampaignSimpleTable data={CampaignsData}/>
                            </TabPane>


                            <TabPane tab="Transactions" key="3">
                              <MoneySimpleTable data={Transactions}/>
                            </TabPane>

                            

                            </Tabs>

                        </div>
                    </div>
                </div>

                  
              </>

              ):(
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
    };

};

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
    
    };
};

  
export default connect(
    mapStateToProps,
    
)(AdminDashboard) 