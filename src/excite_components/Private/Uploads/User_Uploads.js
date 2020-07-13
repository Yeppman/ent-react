import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";

import axios from "axios";

import TemporaryDrawer from '../Sidebar/SideNav'

import {Rate } from 'antd'
import User_Uploaded_Post from './uploaded_items'


import {PlusCircleOutlined} from '@ant-design/icons'


const host = 'https://backend-entr.herokuapp.com';
const users_uploads_endpoint = host + `/retail/my_uploads/`
const Post_Array = []
const Main  = []
class User_Posts_Items extends Component {

    state = {
        general : [],
        loading:true ,
        error : null ,

        data:[],

        Electronics:[],
        Fashion:[],
        HomeApp:[],
        Property:[],
        Vehicles:[],
        Phones :[],

        results:[],
        Allocated_Results:[],
    }

    
    myProducts = async(token)=>{

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(users_uploads_endpoint)
        .then(res=>{
            if (res.status == 200){
                this.setState({
                    data:res.data
                })
            }else{
                console.log(res.data)
            }
        })

           
    }

   
    
    redirect_page=()=>{
    
      const endpoint = '/create/portal/'
      this.props.history.push(endpoint)
     }

    componentDidMount(){
        this.myProducts(this.props.token)
        
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.myProducts(newProps.token)
            
          }
        }
      }
  
      
    
    render(){
        const {Allocated_Results, data} = this.state
        return(
            <>

            <TemporaryDrawer/>


                <div className="main">
                <div className="container">
                     <div className="grid grid-cols-10">
                       <div className="col-span-2">
                       <button
                     onClick={this.redirect_page}
                       class="create-client-button"  >

                      <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    />  Create Client
                    </button>
                </div>
                </div>
            </div>
           
            <div className="container">
                        <span>
                        <h3 className="" style={{fontSize:23}}>
                        My  Products
                        </h3>
                      </span>


                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                                 data.map((item)=>(
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