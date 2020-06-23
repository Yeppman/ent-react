import React , {Component, createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";
import {Rate} from 'antd'
import { MessageOutlined,} from '@ant-design/icons'


const host = 'back-ent.herokuapp.com'
var Main  = []

const vendor_post_url = host + `/vendors_post/`
class Vendor_View extends Component{
    state  = {
        vendor_post :[],
        profile_details :[],
        business_profile_details :[],
        loading : true,
        error: null,

        Allocated_Results:[],
    }
    vendor_id = this.props.match.params.VendorID

    Vendor_Product = async()=>{
        
        const vendor_id = this.props.match.params.VendorID
        const endpoint = host + '/retail/vendor_products'

        await axios.get(endpoint,
             {
                 params:{
                    vendor_id
                 }
            })
        .then(res=>{
            this.setState({
                results:res.data
            })
           

            if (this.state.results.Electronics.length > 0){
                var electronics_data = this.state.results.Electronics
                
                electronics_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })
               
            }

            if (this.state.results.Fashion.length > 0){
                var fashion_data = this.state.results.Fashion
                
                
                fashion_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.Services.length > 0){
                var services_data = this.state.results.Services
                
                
                services_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.HomeAppliances.length > 0){
                var home_app = this.state.results.HomeAppliances
               
                home_app.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })


            }
            
            if (this.state.results.Phones.length > 0){
                var phone_data = this.state.results.Phones
           
                phone_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.Property.length > 0){
                var property_data = this.state.results.Property
         
                property_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

                
            }
            
            if (this.state.results.Vehicles.length > 0){
                var vehicle_data = this.state.results.Vehicles
          
                
                vehicle_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

                
            }
            //Complies and Append
            console.log('these are the results data', this.state.Allocated_Results)
            console.log(res.data)
        })
        .catch(e=>{console.log(e)})
    }

    componentDidMount(){
        this.Query()

    }

    //Previous Model to get Vendor data
    Vendor_Post = async()=>{
        axios.get(`back-ent.herokuapp.com/core_api/vendors_post/${this.vendor_id}/`)
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
        this.Vendor_Product()
    }

    render(){
        const {profile_details,Allocated_Results, loading, error, vendor_post , business_profile_details} = this.state
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


            <div className="container">
                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                                 Allocated_Results.map((item)=>(
                                       <>
                                       <div className=" col-span-4  sm:col-span-4
                            md:col-span-4 lg:col-span-4 xl:col-span-4 gap-3">
                                        <div className="post-box">
                                        <div className="post-image">
                                            <img className="post-image-render"
                                                href={`/categories/${item.category}/${item.id}`}
                                                src={item.Image1}
                                                />
                                        </div>    
                                        <div className="post-content-prime">
                                            <div className="post-content-header">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            {item.Title}
                                            </a>
                                            
                                            </div>
                                            <div className="post-content-star-rating">
                                            <Rate disabled defaultValue={item.Rating} />
                                            </div>

                                            <div className="post-content-body">
                                                 <p
                                                  style={{color:"#434343"}}>
                                                    Category : {item.category}
                                                </p>
                                            </div>
                                            <div className="post-content-body">
                                                
                                                <br/>
                                                <p>
                                                <a 
                                                href={`/categories/${item.category}/${item.id}`}
                                                style={{color:"#434343"}} >
                                                {item.Description.length < 50 ? 
                                                `${item.Description}` : `${item.Description.substring(0, 300)}...` }
                                                </a>
                                                </p>
                                            </div>
                                            <div className="post-content-price">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            ₦{item.Price}
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

export default  Vendor_View