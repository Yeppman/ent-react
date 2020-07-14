import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { Card ,notification } from 'antd';

import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TemporaryDrawer from '../Sidebar/SideNav'

import CampaignSimpleTable from './CampaignTable'

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

const host = 'https://backend-entr.herokuapp.com'


class adminCampaigns extends Component{
    state={
        CampaignsData:[],
        CampaignDataCount:0,

        loading:false, 
        error:null,
    }

    CampaignList = (token) =>{
    console.log(token)
    axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
    axios.get('https://backend-entr.herokuapp.com/excite-admin-connect/admin-c-list/')
    .then(res =>{
        const data = res.data
            this.setState({
            CampaignsData : data ,
            CampaignDataCount :data.length,

            }); 
            console.log('Campaign Data data' ,res.data);
            
        })
    }

    componentDidMount(){
        //this.test_ws()
        if (this.props.token !== undefined && this.props.token !== null) {
         
          this.CampaignList(this.props.token)
          
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
              
              this.CampaignList(newProps.token)
  
  
         }
        }
      }
    

    render(){
        const {CampaignsData,CampaignDataCount} = this.state
        return(
            <>


            <TemporaryDrawer />

            <div className="main">

                <div className="fitter">

                </div>    

                <div className="fitter">
                    <div className="infograph-card">
                    <ul>
                                  <li className="">
                                    <div className="">
                                      <p className="Header">
                                        Campaigns
                                      </p>

                                      <div className="subHeader">
                                        <div className="left">
                                            <p>
                                        {CampaignDataCount}
                                            </p>

                                        </div>

                                        <div className="right">
                                        
                                        </div>

                                      </div>

                                    </div>
                                  </li>


                                
                                  <li className="">
                                    <div className="">
                                        <p className="Header">
                                          Account Type
                                        </p>

                                        <div className="subHeader">
                                          <div className="left">
                                              <p>
                                           
                                              </p>

                                          </div>

                                          <div className="right">
                                          
                                          </div>

                                        </div>

                                    </div>
                                  </li>


                                </ul>
                    </div>

                </div>

                <div className="fitter">
                    <CampaignSimpleTable data ={CampaignsData}/>
                </div>


            </div>


            </>
        )
    }


}


const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
     is_seller: state.auth.is_seller ,
     membership_type: state.membership.mode,
    };
  };


  
   
export default connect(
mapStateToProps,
null
)(adminCampaigns);