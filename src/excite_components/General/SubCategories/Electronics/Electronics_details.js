import React , { useState, Component }from 'react';
import axios from 'axios'
import {Rate, Avatar ,Comment, Tooltip , message ,Tabs , Descriptions } from 'antd'
import { connect } from "react-redux";
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
import { Link, withRouter } from 'react-router-dom';
 
import Nav from '../../../containers/nav'

import CommentForm from '../../../containers/Comment_Form'
import Order_Form from '../../../containers/Order_Form'
import Make_Order_Form from '../../../containers/Make_Order'

const host = 'https://backend-entr.herokuapp.com'
const item_type = 'electronics'
const { TabPane } = Tabs;
 


class Electronics_Item_Detail extends Component{
    state = {
        item_details:[],
        itemIsProduct : false,

        loading : true,
        error: null ,
        vendor_profile :[],
        vendor_business_profile:[],

        comments:[],
        loaded_comments: false,
        buyer_id : null,
    }

    AuthRequired (){
      message.error('You need to login to submit a review')
    }     
    
    Vendor_Profile = async(Vendor_id) =>{
        const vendor_profile_endpoint = host + `/core_api/vendors_profile_public/${Vendor_id}/`
        await axios.get(vendor_profile_endpoint)
        .then(res =>{
          this.setState({
            vendor_profile: res.data
        })
         console.log('ven',this.state.vendor_profile)  
       })
      }

      Vendor_Business_Profile = async(Vendor_id) =>{
        const endpoint = host + `/core_api/vendor_business_data/${Vendor_id}/`
        await axios.get(endpoint)
        .then(res =>{
          this.setState({
            vendor_business_profile: res.data
        })
         console.log('ven',this.state.vendor_business_profile)  
       })
      }


    Buyer_Data = async(token)=>{
      const user_id_endpoint = host + `/stream/get_my_user_id_and_email/`
      let user_id = null 
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      axios.get(user_id_endpoint)
      .then(res=>{

        alert('this is the user id')
        this.setState({
          buyer_id:res.data.userID,
        })
      })      
    }
      
  Item_Data = async() => {
        const model_id = this.props.match.params.ItemDetailID
      //  const item_endpoint = 'electronics_details'
        const endpoint = host + `/retail/item-detail/${model_id}/`
        await axios.get(endpoint)
        .then(res =>{
            if (res.status == 200){
                this.setState({
                  item_details : res.data ,
                  loading : false
                  })

                  if (res.data.isProduct == true){
                    this.setState({
                      itemIsProduct: true
                    })
                  }

                  console.log('item data', res.data)
                  if (this.state.loading === false){
                      const parse_vendor = this.state.item_details.Owner_id
                      console.log('this is the  vendor id', parse_vendor)
                      // USED THIS FUNCTION RETRIEVE VENDOR'S ID
                      this.Vendor_Profile(parse_vendor)
                      this.Vendor_Business_Profile(parse_vendor)
                }
            }else{
              message.error('Error getting data')
            }
        })
    }
      
    //Fetches comments
    Comments = async() =>{
        const model_id = this.props.match.params.ItemDetailID        
        const item_endpoint = 'electronics_comments_list'
        const endpoint = host + `/retail/${item_endpoint}/${model_id}/` 
        
        axios.get(endpoint)
        .then(res =>{
            this.setState({
                Comments : res.data ,
                loaded_comments: true
            })
          console.log('this are the comments', res.data)           
        })
    }; 

    addToCart =  async()=>{
       const item_id = this.props.match.params.ItemDetailID
       const endpoint = host + `/retail/add-item/${item_id}`
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            message.success('Item Added to cart')
          }else{
            message.error('Adding to cart failed')
          }
        })
    }
   
    componentDidMount(){
      
        this.Item_Data()
        this.Comments()
       // this.Buyer_Data(this.props.token)
        
    }

    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
        //  this.Buyer_Data(newProps.token)         
        }
      }
    }

    item_id = this.props.match.params.ItemDetailID
    item_comment_endpoint = `/retail/new_comments_electronics/${this.item_id}/`
    comment_endpoint = host + this.item_comment_endpoint


    render(){
      const { item_details ,vendor_profile, loaded_comments ,
        Comments, loading,  rating ,  itemIsProduct } = this.state;

      const model_id = this.props.match.params.ItemDetailID

      const {isAuth,is_seller, is_buyer} = this.props

      console.log(isAuth);
      
     console.log('this is the item ID', model_id)
    const  orderMonitorID =  this.state.item_details.Owner_id
    return(
            
            <>

            <Nav/>
            <div className="container mx-auto">
                <div className="grid grid-cols-6">
                <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-4 xl:col-span-4 ">
                
                <div className="item_image_container">
                <img 
                    className="item_image"
                    alt ='Image Appears here'
                    src={item_details.Image1} />
                </div>
                    
                </div>
 
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-2 xl:col-span-2">
                  <div 
                
                  className="contact-card">
                    <div className="card-container">
                    
                    <span>
                     <h4>
                     <a 
                     style={{color:'#565656'}}
                     className="contact-card-title"
                      href={`/Vendor_Profile/${vendor_profile.id}`}>
                     Posted by   {vendor_profile.user}
                      </a>
                     </h4>
                    </span>
                    <hr/>
                        <div className="contact-title-container">
                        <p className="contact-card-title">
                          {item_details.Title}
                         </p>
                        </div>
                        <hr/>

                        <div className="contact-title-container" >
                        <p className="contact-card-title">
                        {item_details.Address} {item_details.State} {item_details.Country}
                        </p>
                        </div>
                        <hr/>

                        <div   className="contact-title-container" >
                        <p className="contact-card-title">
                          {item_details.PostDate}
                         </p>
                        </div>
                        <hr/>

                        <div  className="contact-title-container" >
                         <p className="contact-card-title">
                         ₦{item_details.Price}
                         </p>
                        </div>
                        <hr/>

                         <div className="grid grid-cols-4 gap-4">

                         {
                           itemIsProduct ? (
                             <>
                             <div className="col-span-4">
                              <button 
                              onClick={this.addToCart}
                              className="login-button">
                                Add to Cart
                              </button>
                            </div>
                             </>
                           ) : (
                            <div className=" col-span-4" >
                              <Make_Order_Form 
                              item_name = {item_details.Title}
                              item_class = {item_type}
                               share_vendor_email ={vendor_profile.email}
                              vendor_id = {vendor_profile.id} post_id = {model_id} /> 
                          </div> 
                           )
                         }
                         


                         </div>                       

                    </div>
                  </div>
                </div>
                
            </div> 
            </div>


          <div className="container">
          <Tabs defaultActiveKey="1" >
                <TabPane tab="Rating and Description " key="1">
                <div className="grid grid-cols-6">
              <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-6">
                      <div className="description-card">
                          <div className="description-header">

                          <h2 className="description-card-heading" >
                          Rating 
                          </h2>
                          <div className="description-card-text">
                          <Rate disabled defaultValue={3} />
                          </div>
                            <h2 className="description-card-heading" >
                              Description
                            </h2>
                            
                          </div>
                        <div className="description-card-text">
                          {item_details.Description}
                        </div>
                      </div>
                      <div className="">
                        
                        </div>
              </div>
          </div> 

                </TabPane>

                <TabPane tab="Specification" key="3">
                      <div className="grid grid-cols-6">
                        <div className="col-span-6">
                        <Descriptions title="Product Info">
                        <Descriptions.Item label="Product Color">{item_details.Color}</Descriptions.Item>
                          <Descriptions.Item label="Electronic Category">{item_details.Electronic_Category}</Descriptions.Item>
                          <Descriptions.Item label="Electronic Type">{item_details.Electronic_Type}</Descriptions.Item>
                          <Descriptions.Item label="Address">
                            {item_details.Address}
                          </Descriptions.Item>
                          <Descriptions.Item label="Country">{item_details.Country}</Descriptions.Item>
                          <Descriptions.Item label="Remark">{item_details.State}</Descriptions.Item>
                          
                        </Descriptions>
                        </div>
                      </div>
                </TabPane>
                <TabPane tab="Shipping Details" key="2">
                <div className="grid grid-cols-6">
                    <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-6 xl:col-span-6">
                            <div className="description-card">
                                <div className="description-header">
                                  <h2 className="description-card-heading" >
                                    Description
                                  </h2>
                                  
                                </div>
                              <div className="description-card-text">
                                {item_details.Description}
                              </div>
                            </div>
                      <div className="">
                        
                        </div>
                  </div>
              </div>
                </TabPane>
                
              </Tabs>
          </div>

            

          
                <div className="container mx-auto ">
                <div className="grid grid-cols-6 gap-4 ">
               
               {
                 loaded_comments ?(

                   <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                      <span>
                        <h3 className="" style={{fontSize:17}}>
                          Reviews
                        </h3>
                      </span>
                    <div className="comment-card">
                      {
                        Comments.map((c)=>(
                        <>
                        <Rate disabled defaultValue={c.Rating} />

                        <Comment
                        author={c.Name}
                        
                        avatar={
                          <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                          />
                        }
                        content={
                          <p>
                            {c.Comment}
                          </p>
                        }
                        datetime={
                          <Tooltip title>
                            <span>{c.Created}</span>
                          </Tooltip>
                        }
                      />
                      </>
                        ))
                      }
                      </div>
                  </div>

                      ):(
                        <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
                            <h3 style={{fontSize:20}}>
                              No Comments Yet
                            </h3>
                        </div>
                      )
                    }

               <div className="col-span-6 sm:col-span-6  md:col-span-6 lg:col-span-3 xl:col-span-3">
               <span>
               <h3 style={{fontSize:17}}>
                        Comment
                 </h3>
               </span>
                 {
                  isAuth ?(
                    <CommentForm comment_url={this.comment_endpoint} post_id = {model_id} />
                  ):(
                    <CommentForm 
                    onClick={this.AuthRequired}
                     comment_url={this.comment_endpoint} post_id = {model_id} />
                  )
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
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
     
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Electronics_Item_Detail);
   