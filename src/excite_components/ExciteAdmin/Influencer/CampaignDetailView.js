import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'https://backend-entr.herokuapp.com';

const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
 
class adminCampaignDetail extends Component{
    state = {
        data : [],
        loading: true,
        error : null ,
        Selected:false,
    }

    campaignDetail = async(token)=>{
        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
        const url = host + `/excite-admin-connect/admin-c-detail/${item_id}/`
        await axios.get(url)
        .then(res =>{
            this.setState({
                data : res.data
            })
            console.log('Campaign Data', res.data)
        })
    }

    acticateCampaign= async()=>{
        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
          
        const url = host + `/excite-admin-connect/changeStatus/${item_id}/`
        await axios.get(url)
        .then(res =>{
            if (res.status == 200){
                openNotification('Campaign Activated Successfully')
                console.log('', res.data)
            } else{

            }
        })
    }

    deActicateCampaign= async()=>{
        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
          
        const url = host + `/excite-admin-connect/changeStatus/${item_id}/`
        await axios.get(url)
        .then(res =>{
            if (res.status == 200){
                openNotification('Campaign Activated Successfully')
                console.log('', res.data)
            } else{

            }
        })
    }



    Pop =()=>{
        console.log('Works')
        this.setState({
            Selected:true
        })
    }

    componentDidMount(){
        //  this.User_Data(this.props.token)
          this.campaignDetail(this.props.token)
      }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.campaignDetail(newProps.token)
              
            }
          }
        }


        render(){
            const {data,Selected}  = this.state
            
            return(
                <>
                    <TemporaryDrawer/>

                    <div className="container">
                        <div className="grid grid-cols-3">
                            <div className="col-span-3">
                                
                            <Descriptions title="User Info" bordered>
                           
                            <Descriptions.Item span={3} label="Order time">{data.Created}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Proposal Date" span={3}>
                            2019-04-24 18:00:00
                            </Descriptions.Item>
                            
                            <Descriptions.Item  span={3} label="Title">{data.CampaignDescription}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Status ">  {
                                    data.Status ? (
                                        <Badge status="processing" text="Running" /> 
                                    ): (
                                        <Badge status="processing" text="InActive" /> 
                                    )
                                } 
                            </Descriptions.Item>
                            <Descriptions.Item  span={3} label="Description ">{data.CampaignDescription}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Hashtags ">{data.Hashtags}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Trend ">{data.Trend}</Descriptions.Item>

                            <Descriptions.Item  span={3} label="Paid ? ">{data.Paid}</Descriptions.Item>

                            <Descriptions.Item  span={3} label="Activate Campaign">
                           <>
                           {
                                    data.Status ? (
                                        <>
                                        <button 
                                        class ="login-button"
                                        onClick={this.acticateCampaign}>
                                                Activate
                                            </button>
                                        </>
                                    ): (
                                        <>
                                        <button 
                                        class ="login-button"
                                        onClick={this.deActicateCampaign}>
                                                Deactivate
                                            </button>
                                        </>     
                                       
                                    )
                                } 
                           </>
                                
                            </Descriptions.Item>

                        </Descriptions>

                        

                      
                            
                            </div>
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
      membership_type: state.membership.mode,
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(adminCampaignDetail);