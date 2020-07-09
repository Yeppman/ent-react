import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import {Input ,  Spin ,Card , Form, Button ,
    List, Avatar , Descriptions, Badge ,
    Select , DatePicker ,Modal , Upload, message,notification} from 'antd';

import moment from 'moment'
import TemporaryDrawer from '../Sidebar/SideNav'
import AdminCampaignTable from './CapaignTable'

import {PlusCircleOutlined} from '@ant-design/icons'


const TextArea = Input.TextArea
const { Option } = Select;

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';


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

    activateCampaign= async()=>{
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



    updateDatesForCampaign= async(values)=>{
        const CampaignStarts = values['CampaignDate'].format("YYYY-MM-DD")
        const Deadline = values['DeadLine'].format("YYYY-MM-DD")
        const Cost = values['Cost']

        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
          
        const url = host + `/excite-admin-connect/update-dates/${item_id}/`
        await axios.get(url, {
            params:{
                Deadline, CampaignStarts, Cost
            }
        })
        .then(res =>{
            if (res.status == 200){
                openNotification(res.data['Message'])
                console.log('', res.data)
            } else{
                message.error('Error Updating Campaign')
            }
        })
      }

    deActicateCampaign= async()=>{
        const item_id =  this.props.match.params.campaignID
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
          };
        //   jj
        const url = host + `/excite-admin-connect/changeStatus/${item_id}/`
        await axios.get(url)
        .then(res =>{
            if (res.status == 200){
                openNotification('Campaign Deactivated Successfully')
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
                        <div className="">
                                <div className="">
                                <AdminCampaignTable  token={this.props.token} data = {data} />
                                </div>
                        </div>
                    </div>

                    <div className="container">
                        <div className="grid grid-cols-7 gap-4">
                            <div className="col-span-4 ">
                                
                            <Descriptions title="User Info" bordered>
                            <Descriptions.Item  span={3} label="Hashtags ">{data.Hashtags}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Title">{data.CampaignDescription}</Descriptions.Item>
                            <Descriptions.Item  span={3} label="Number of Influencers ">{data.NumberOfViews}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Created">{data.Created}</Descriptions.Item>
                            <Descriptions.Item span={3} label="Proposal Date" span={3}>
                           {data.ProposalDate}
                            </Descriptions.Item>
                            
                           
                            <Descriptions.Item span={3} label="Status ">  {
                                    data.Status ? (
                                        <p>
                                        Active
                                        </p>
                                    ): (
                                       <p>InActive</p>
                                    )
                                } 
                            </Descriptions.Item>
                            
                            

                            <Descriptions.Item  span={3} label="Paid ? ">
                                {
                                    data.Paid ? (
                                        <>
                                            <p>
                                                Payment Made
                                            </p>
                                        </>
                                    ):(
                                        <>
                                            <p>
                                                Pending Payment
                                            </p>
                                        </>
                                    )
                                }
                            </Descriptions.Item>

                            <Descriptions.Item  span={3} label="Activate Campaign">
                           <>
                           {
                                    !data.Status ? (
                                        <>
                                        <button 
                                        class ="login-button"
                                        onClick={this.activateCampaign}>
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

                           <div className="col-span-3">
                                <Form onFinish={this.updateDatesForCampaign}>

                                <Form.Item 
                             rules={[{ required: true }]}
                            name ="Cost">
                            
                                <Input
                                placeholder="Estimated Cost"
                                enterButton />
                            
                            </Form.Item>

                                <Form.Item 
                            rules={[{ required: true }]}
                            name="CampaignDate">
                              <DatePicker
                              label="Campaign Starts"
                               defaultValue={moment('2020/01/01', dateFormat)} format={dateFormat} />

                            </Form.Item>

                            <Form.Item 
                            rules={[{ required: true }]}
                            name="DeadLine">
                              <DatePicker
                              label="Campaign Deadline"
                               defaultValue={moment('2020/01/01', dateFormat)} format={dateFormat} />

                            </Form.Item>

                            <Form.Item>
                                <button className="login-button">
                                    Submit
                                </button>

                            </Form.Item>
                                </Form>
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