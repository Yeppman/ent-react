import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'
import axios from "axios";

import {Rate } from 'antd'
import User_Uploaded_Post from './uploaded_items'


import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'https://back-ent.herokuapp.com';
const users_uploads_endpoint = host + `/retail/all_uploads/`
const Post_Array = []
const Main  = []
class User_Posts_Items extends Component {

    state = {
        general : [],
        loading:true ,
        error : null ,

        Electronics:[],
        Fashion:[],
        HomeApp:[],
        Property:[],
        Vehicles:[],
        Phones :[],

        results:[],
        Allocated_Results:[],
    }

    
    Vendor_Product = async(token)=>{
        
        const vendor_id = this.props.match.params.VendorID
        const endpoint = host + '/retail/vendor_products'

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_uploads_endpoint)
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


    User_Data = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_uploads_endpoint)
        .then(res=>{
            this.setState({
                general: res.data,
                loading:false ,

                Electronics:res.data.Electronics,
                Fashion : res.data.Fashion,
                HomeApp: res.data.HomeAppliances ,
                Property : res.data.Property,
                Phones : res.data.Phones
            })
            const {Electronics, Property, HomeApp, Fashion , general, Phones} = this.state
            
            Post_Array.push(Electronics, Property, HomeApp,Fashion ,Phones )
            
            console.log('All Uploads', Post_Array)
        })
    }

    redirect_page=()=>{
    
      const endpoint = '/create/portal/'
      window.location.replace(endpoint)
     }

    componentDidMount(){
      //  this.User_Data(this.props.token)
        this.Vendor_Product(this.props.token)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Vendor_Product(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {Allocated_Results} = this.state
        return(
            <>

            <div className="container">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                    <p onClick={this.redirect_page}>
                    <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    /> Create 
                    </p>
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
)(User_Posts_Items)