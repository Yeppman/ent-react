import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";

import TemporaryDrawer from '../Sidebar/SideNav'

import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'http://127.0.0.1:8000';



class vendorCampaign extends Component {

    state = {
        campaignList : [],
        loading:true ,
        error : null ,

    }

        getCampaign = async(token)=>{
       const endpoint = host + '/management/c-list/'
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(endpoint)
        .then(res=>{
            this.setState({
                campaignList: res.data,
                loading:false 
            })
           console.log(res.data)
        })
    }

    redirect_page=()=>{
    
      const endpoint = '/create-campaign'
      this.props.history.push('/create-campaign')
     // window.location.replace(endpoint)
     }
     
     redirect_page2=()=>{
    
      const endpoint = '/create-trend'
      this.props.history.push(endpoint)
     // window.location.replace(endpoint)
     }

    componentDidMount(){
      //  this.User_Data(this.props.token)
        if (this.props.token !== undefined && this.props.token !== null) {
            this.getCampaign(this.props.token)
          }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.getCampaign(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {campaignList} = this.state
        return(
            <>

            <TemporaryDrawer/>

            <div className="container">
                     <div className="grid grid-cols-10">
                       <div className="col-span-3 ">
                       <button
                     onClick={this.redirect_page}
                       class="create-client-button"  >

                      <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    />  Create Campaign
                    </button>
                </div>

                <div className="col-span-3 ">
                       <button
                     onClick={this.redirect_page2}
                       class="create-client-button"  >

                      <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    />  Create Trend
                    </button>
                </div>

                </div>
            </div>
           
            <div className="container">
                        <span>
                        <h3 className="" style={{fontSize:23}}>
                        My  campaignList
                        </h3>
                      </span>


                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                        campaignList.map((item)=>(
                                       <>
                                       <div className=" col-span-4  sm:col-span-4
                            md:col-span-4 lg:col-span-4 xl:col-span-4 gap-3">
                                        <div className="post-box">
                                        <div className="post-image">
                                            <img className="post-image-render"
                                                href={`/categories/${item.category}/${item.id}`}
                                                src={item.CampaignImage1}
                                                />
                                        </div>    
                                        <div className="post-content-prime">
                                            <div className="post-content-header">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/campaign-detail/${item.id}`} >
                                            {item.CampaignName}
                                            </a>
                                            
                                            </div>
                                        
                                           
                                            <div className="post-content-body">
                                                
                                                <br/>
                                                <p>
                                                <a 
                                               href={`/campaign-detail/${item.id}`}
                                                style={{color:"#434343"}} >
                                               {item.CampaignDescription}
                                                </a>
                                                </p>
                                            </div>
                                            <div className="post-content-price">
                                            <a  
                                            style={{color:"#434343"}}
                                            >
                                            {item.ProposalDate}
                                            </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                       </>
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
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode
    };
};

//const mapDispatchToProps = dispatch => {
  //return {
    //member: () => dispatch(getMembership())
//}
//}
  
export default connect(
    mapStateToProps,
    //mapDispatchToProps
)(vendorCampaign)