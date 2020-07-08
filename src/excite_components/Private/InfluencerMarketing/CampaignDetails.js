import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import {PlusCircleOutlined} from '@ant-design/icons'
import PayGen from './PayPortal/Paystacker'

const host = 'https://backend-entr.herokuapp.com';

 
class vendorCampaignDetail extends Component{
    state = {
        data : [],
        vendorEmail : '',
        loading: true,
        error : null ,
        Selected:false,

        modal2Visible: false,
    }


    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
      }
      

    campaignDetail = async(token)=>{
        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        const url = host + `/management/c-detail/${item_id}/`
        await axios.get(url)
        .then(res =>{
            this.setState({
                data : res.data
            })
            console.log('Campaign Data', res.data)
        })
    }

    userEmail = async(token)=>{
        const userData_endpoint = host + '/stream/get_my_user_id_and_email/'
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        await axios.get(userData_endpoint)
        .then(res =>{
            const the_id = res.data
            this.setState({
          // user_id: res.data.userID,
          vendorEmail : res.data.Email,
            })
            console.log('User Email', res.data.Email)
        })
    }

    Pop = async()=>{
        console.log('Works')
        
        this.setState({
            Selected:true
        })
        console.log(this.state.Selected)
    }

    componentDidMount(){
        //  this.User_Data(this.props.token)
          this.campaignDetail(this.props.token)
          this.userEmail(this.props.token)
      }
  
      componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.campaignDetail(newProps.token)
              this.userEmail(newProps.token)
              
            }
          }
        }


        render(){
            const {data,Selected , vendorEmail}  = this.state
            
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
                            <Descriptions.Item span={3} label="Status ">  <Badge status="processing" text="Running" /> {data.Status} </Descriptions.Item>
                            <Descriptions.Item  span={3} label="Description ">{data.CampaignDescription}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Hashtags ">{data.Hashtags}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Trend ">{data.Trend}</Descriptions.Item>

                            <Descriptions.Item  span={3} label="Paid ? ">{data.Paid}</Descriptions.Item>

                           
                        </Descriptions>

                        <div className="container">
                            <div className="grid grid-cols-2">
                                <div className="col-span-1">
                                <button
                            onClick={this.Pop}
                             class="login-button">
                                    Pay Now
                            </button>
                                </div>
                            </div>
                        </div>        

                        <div className="container">
                           
                                {
                                    Selected ?(

                                 <>
                                 <div className="grid grid-cols-4">
                                            <div className="col-span-4">
                                            <PayGen 
                                            pricing = {data.Cost}
                                            campaignItemID = {data.id}
                                            Email ={vendorEmail} 
                                            />
                                            </div>
                                        </div>
                                 </>
                                    ) : (
                                    <div className="grid grid-cols-4">
                                        
                                    </div>
                                    )
                                }
                                </div>
                            
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
  )(vendorCampaignDetail);