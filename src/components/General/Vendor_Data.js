import React , {Component, createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { MessageOutlined,} from '@ant-design/icons'
import moment from 'moment';

const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
 
const host = 'http://127.0.0.1:8000'

const vendor_post_url = host + `/vendors_post/`
class Vendor_View extends Component{
    state  = {
        vendor_post :[],
        profile_details :[],
        business_profile_details :[],
        loading : true,
        error: null,
    }

    vendor_id = this.props.match.params.VendorID
    Vendor_Post = async()=>{
        axios.get(`http://127.0.0.1:8000/core_api/vendors_post/${this.vendor_id}/`)
        .then(res =>{
            this.setState({
                vendor_post : res.data ,
                loading : false
                })
            
        })
    }
    // Ends here

    Vendor_Details = async() =>{
        axios.get(host + `/core_api/vendors_profile_public/${this.vendor_id}/`)
        .then(res =>{
            this.setState({
                profile_details : res.data ,
                loading : false
                })
            console.log(this.state)
        })
    }

    Vendor_Business_Data = async()=>{
        axios.get(host + `/core_api/vendor_business_data/${this.vendor_id}/`)
        .then(res =>{
            this.setState({
                business_profile_details : res.data ,
                loading : false
                })
            console.log(this.state)
        })
    }

    componentDidMount(){
        this.Vendor_Post()
        this.Vendor_Details()
        this.Vendor_Business_Data()
    }

    render(){
        const {profile_details, loading, error, vendor_post , business_profile_details} = this.state
        return(

            <>
               
            <div className="flex-container">
                <div className="shift40">

                <div className="snip1336 ">
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg" alt="sample87" />
                    <figcaption>
                      <img src={profile_details.ProfilePicture} alt="profile-sample4" className="profile" />
                      <h2>{profile_details.User_First_Name}</h2>
                      <p>
                        {profile_details.Bio}
                      </p>
                      <a href="/edit_profile/" className="follow">
                        Edit Profile
                      </a>
                      <a href="#" className="info">More Info</a>
                    </figcaption>
                  </div>

                </div>

                
            </div>

            <div className="container">
                <div className="buiness-card-section">
                    <div className="business-card-left-section">
                        <div className="busines-card-logo">
                            <img src={business_profile_details.BusinessImage} />
                        </div>
                        <div className="busines-card-info">
                            <div className="business-card-info-name">
                                <p className="business-card-info-name-text">
                                    {business_profile_details.BusinessName}
                                </p>

                            </div>
                            <div className="business-card-info-description">
                                <p className="business-card-info-description-text">
                                    {business_profile_details.BusinessBio}
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="business-card-right-section">

                    </div>


                </div>
            </div>

            </>

        )
    }


}

export default  Vendor_View