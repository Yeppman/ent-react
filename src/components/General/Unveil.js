import React, { Component , useState } from 'react' 

import axios from "axios";
import { connect } from "react-redux";
//import { SnapList, SnapItem } from 'react-snaplist-carousel';

//import Results from "./Results";


const host = 'http://127.0.0.1:8000'

class Enterprise_Showcase extends Component{
  search_url = 'http://127.0.0.1:8000/core_api/post_filter/'
  state = {
    results: [],
    loading: false,
    error: null ,
    show_res : true,
    categories : [],
    
  };

 
  Account_Type = async(token)=>{
    const account_endpoint = host + `/stream/get_my_user_data/`
    const profile_data_endpoint = host + `/stream/get_profile_data/`

    let is_profile_edited = false
    let is_profile_verified =false
    let profile_id =false

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    axios.get(profile_data_endpoint)
    .then(res=>{
      is_profile_edited = res.data.Edited
      is_profile_verified = res.data.Verified
      profile_id =  res.data.Profile_id
    })

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    await axios.get(account_endpoint)
    .then(res=>{
      let user_stats = res.data.Account_Type
        if (user_stats == 'Buyer'){
          if (is_profile_edited == false){
            console.log('edited',is_profile_edited)
          // window.location.replace()
          }
          else if(is_profile_edited == true){
            console.log('edited',is_profile_edited)
            // window.location.replace()
          }
        }
    })
  }

 Categories = async() =>{
    
    const category_url = host + `/retail/categories/`
    
    await axios.get(category_url).then( res =>{
        this.setState({
            categories : res.data ,
            loading : false
        });console.log(res.data)
            });  
   };

   redirect_page=(category_slug)=>{
    
    const endpoint = `/categories/${category_slug}/`
    window.location.replace(endpoint)
   }
   
   Search_Products(e){
     e.preventDefault()
    
     const search_input = e.target.elements.searching_box.value;
     const endpoint = `/search_query/${search_input}/`
    window.location.replace(endpoint)
   }

  componentWillMount = (token)=>{
      this.Categories()
      this.Account_Type(this.props.token)
    }

    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {

          this.Account_Type(newProps.token)      
    
          
        }
      }
    }

    // end of process query function`
 
  render() {
      const { error, loading, results , categories, show_res} = this.state;
     
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 3 }
      };
  return (
                     
          <>

      <div className="introduction-section">

            <div className="grid grid-cols-1">
              
                <div className="">
                    <div className="introduction-section-heading">
                      <p className="introduction-section-heading-text">
                        Buy & Sell from  the
                        <br/> best of 
                        products and Services in
                        Nigeria
                      </p>
                      <div className="introduction-section-search-form">
                      <form onSubmit={this.Search_Products} >
                        <div>
                        <input 
                          name="searching_box"
                          type="text"
                          placeholder="Search for products/services"
                          className="introduction-section-search-input" />  

                        </div>
                          <div className="">
                            <button className="introduction-section-search-button">
                            Search
                           </button>
                          </div>
                     </form>
                        
                      </div>
                  </div>
                </div>

            </div>


       </div>

   <div
            style={{paddingTop:30}}
            className="container mx-auto category-section ">
            <div className="grid grid-cols-8  mx-auto">

                {
                    categories.map((c)=>(
                        <>
                        <div className="col-span-8  sm:col-span-4  md:col-span-4
                 lg:col-span-2 xl:col-span-2">
          
                    <div className="category-box">
                            <div 
                             className="category-box-content">
                                <div 
                               
                                className="category-box-content-icon">
                                
                                </div>
                            </div>
                            <div
                            onClick={()=>{this.redirect_page(c.CategoryKey)}}
                             className="category-box-heading-section">
                                <p
                                onClick={()=>{this.redirect_page(c.CategoryKey)}}
                                 className="category-title">
                                    {c.CategoryName}
                                </p>
                            </div>
                    </div>  

                </div>
                        </>
                    ))
                }
                        
                
              
            </div>
        </div>
                
          </>    
      );
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



export default connect(
  mapStateToProps,
  
)(Enterprise_Showcase)