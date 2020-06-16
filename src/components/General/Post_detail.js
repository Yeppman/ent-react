import React , { createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import {Rate, 
   Avatar ,Comment, Tooltip
} from "antd";


import CommentForm from '../containers/Comment_Form' 
import Order_Form from '../containers/Order_Form'
import Make_Order_Form from '../containers/Make_Order'


class PostDetail extends React.Component{
      
    state = {
        vendor_profile : [] ,
        post_detail : [], 
        comments_made : [],
        loaded_comments : false,
        rating : 3,
        loading  : true ,
        key: 'tab1',
        noTitleKey: 'app',
        name : '',
        email : '' ,
        
    }

    Get_Vendor_Profile = async(Vendor_id) =>{
      
      await axios.get(`http://127.0.0.1:8000/core_api/vendors_profile_public/${Vendor_id}/`)
      .then(res =>{
        this.setState({
          vendor_profile: res.data
      })
       console.log('ven',this.state.vendor_profile)  
     })
    }

    model_id = this.props.match.params.PostDetailID
    Get_reverse_url_id = async() => {
        const model_id = this.props.match.params.PostDetailID
        await axios.get(`http://127.0.0.1:8000/core_api/post_detail/${model_id}/`)
        .then(res =>{
            this.setState({
                post_detail : res.data ,
                loading : false
                })
            if (this.state.loading === false){
        
              const parse_vendor = this.state.post_detail.Owner_id
              console.log('this is the  vendor id', parse_vendor)
              // USED THIS FUNCTION RETRIEVE VENDOR'S ID
              this.Get_Vendor_Profile(parse_vendor)
            }
        })
    }
    
    
    //Fetches commetn
    Get_Comments = () =>{
        const model_id = this.props.match.params.PostDetailID
         axios.get(`http://127.0.0.1:8000/core_api/comment_list/${model_id}/`)
        .then(res =>{
            this.setState({
                comments_made : res.data ,
                loading : false,
                loaded_comments :true,

                })
        })

    };
    // Ends Comment Fetching
    
      Ratings = async()=>{
        const parse_id= this.model_id;
        await axios.get(`http://127.0.0.1:8000/core_api/post_rating/${parse_id}/`)
        .then( res =>{
          this.setState({
            rating: Math.round(res.data)
          })
          console.log('rating points', Math.round(res.data))
        })
      }  
      
      

      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
             
          }
        }
      }

      componentDidMount = () =>{
        this.Get_reverse_url_id()
       this.Get_Comments()
       this.Ratings()
      
       };

       
    render(){
     const   { post_detail ,vendor_profile, loaded_comments ,
          comments_made, loading,  rating } = this.state;
     const model_id = this.props.match.params.PostDetailID
    
     
      return(

           <>
       
            <div className="container
             mx-auto">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-4 xl:col-span-4 ">
                  <img 
                  className="post_detail_image"
                  alt ='Image Appears here'
                  src={post_detail.GigImage1} />
              </div>
 
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-2 xl:col-span-2">
                  <div 
                
                  className="contact-card">
                    <div className="card-container">
                    <span>
                          <img 
                  src="https://az742041.vo.msecnd.net/vcsites/vcimages/resource/uploads/CompanyLogo/thumbs/636946622002390653_1.jpg" />
                    </span>
                    <span>
                     <h4>
                     <a  href={`/Vendor_Profile/${vendor_profile.id}`}>
                     Posted by   {vendor_profile.user}
                      </a>
                     </h4>
                    </span>
                        <div className="card-title">
                        
                          {post_detail.GigTitle}
                        </div>
                        
                        <div className="card-date">
                         Location: {post_detail.GigLocation}
                        </div>

                        <div className="card-date">
                        Posted on:  {post_detail.GigPostDate}
                        </div>

                        <div className="card-price">
                        Price  ₦ {post_detail.GigPrice}
                        </div>
                        
                         <div className="grid grid-cols-4 gap-4">

                        
                         <div className=" col-span-2" >
                              <Make_Order_Form 
                               share_vendor_email ={vendor_profile.email}
                              vendor_id = {vendor_profile.id} post_id = {model_id} /> 
                          </div> 

                          <div className="col-span-2 ">
                                <Order_Form
                                vendor_email ={vendor_profile.email}
                                vendor_id = {vendor_profile.id} post_id = {model_id} /> 

                          </div>


                         </div>                       

                    </div>
                  </div>
                </div>
                
            </div> 
            </div>

            <div className="container mx-auto">
            <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-6">
                      <div className="description-card">
                          <div className="description-header">

                          <h2 className="description-card-heading" >
                          Rating 
                          </h2>
                          <div className="description-card-text">
                          <Rate disabled defaultValue={rating} />
                          </div>

                            <h2 className="description-card-heading" >
                              Description
                            </h2>
                            
                          </div>
                        <div className="description-card-text">
                          {post_detail.GigDescription}
                        </div>
                      </div>
                      <div className="">
                        
                        </div>
              </div>
          </div>
            </div>

          
                <div className="container mx-auto ">
                <div className="grid grid-cols-6 ">
               
               {
                 loaded_comments ?(
                   <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">

            {
             comments_made.map((c)=>(
               <>
               <Rate disabled defaultValue={c.rating} />

               <Comment
               author={c.name}
               avatar={
                 <Avatar
                   src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                   alt="Han Solo"
                 />
               }
               content={
                 <p>
                   {c.comments}
                 </p>
               }
               datetime={
                 <Tooltip title>
                   <span>{c.created}</span>
                 </Tooltip>
               }
             />
             </>
              ))
            }

            </div>

                 ):(
                   <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                       <h3>
                         No Reviews yet
                       </h3>
                   </div>
                 )
               }

               <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                 <CommentForm post_id = {model_id} />
               </div>

       </div>
                </div>


           </>
           //Render and return ends here
        )
    }

}
const mapStateToProps = state => {
  return {
    token: state.auth.token 
  };
};

export default connect(
  mapStateToProps,
  null
)(PostDetail);
 