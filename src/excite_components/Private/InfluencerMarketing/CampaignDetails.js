import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";
import { Descriptions, Badge , notification , Modal} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'

import {PlusCircleOutlined} from '@ant-design/icons'
import PayGen from './PayPortal/Paystacker'

import CampaignTableDrag from './Table/CampaignTable'

const host = 'https://backend-entr.herokuapp.com';

 
class vendorCampaignDetail extends Component{
    state = {
        data : [],
        vendorEmail : '',

        item: [],
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
                data : res.data ,
                item: res.data,
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
        //  this.User_Data(this.props.token
          if (this.props.token !== undefined && this.props.token !== null) {
            this.campaignDetail(this.props.token)
          this.userEmail(this.props.token)
          
        }
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
            const {data,Selected , vendorEmail ,item}  = this.state
            
            return(
                <>
                    <TemporaryDrawer/>

                    
               <div className="container">
                                <div className="grid grid-col-6">
                                <div className=" col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                                    <CampaignTableDrag token={this.props.token} data = {data} />
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
                       

                           <>
                                {
                                    !data.Pending ?(
                                        <>
                                        <div className="container">
                            <div className="grid grid-cols-6">
                                {
                                    !data.Paid ?(
                                        <>
                                        <div className="col-span-1">
                                <button
                            onClick={this.Pop}
                             class="login-button">
                                    Pay Now
                            </button>
                            </div>
                                        </>
                                    ):(
                                        <>
                                            <p>
                                            </p>
                                        </>
                                    )
                                }
                                </div>
                            </div>
                                        </>
                                    ): (
                                        <p></p>
                                    )
                                }
                           </>
                              

                        

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