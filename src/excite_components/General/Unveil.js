import React, { Component , useState } from 'react' 

import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'
import Nav from '../containers/nav'
//import { SnapList, SnapItem } from 'react-snaplist-carousel';

//import latest_items from "./latest_items";


const host = 'https://backend-entr.herokuapp.com'
var Main = []

class Enterprise_Showcase extends Component{

  search_url = host + '/core_api/post_filter/'
  state = {

    latest_items: [],
    loading: false,
    error: null ,
    show_res : true,
    categories : [],
    Allocated_Results:[],

  };
  
  Latest_Products =  async()=>{
    const Title = this.props.match.params.Title
    const endpoint = host + '/retail/latest_uploads/'
    await axios.get(endpoint)
    .then(res =>{
      if (res.status == 200){
        this.setState({
          latest_items: res.data
        })
        console.log(res.data)
      }else{
        console.log()
      }
    })
  }

  Lxatest_Products = async()=>{
    const Title = this.props.match.params.Title
    const endpoint = host + '/retail/latest_uploads/'
    await axios.get(endpoint)
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
            this.setState({Allocated_Results:Main})           
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
            this.setState({Allocated_Results:Main})
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
            this.setState({Allocated_Results:Main})
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
            this.setState({Allocated_Results:Main})

        }
        //Complies and Append
        console.log('these are the results data', this.state.Allocated_Results)
        console.log(res.data)
    })
    .catch(e=>{console.log(e)})
}


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

   openItem(url){
     const endpoint = url
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
      this.Latest_Products()
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
      const {Allocated_Results, categories, show_res , latest_items} = this.state;
      const Latest_Products = Allocated_Results
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 3 }
      };
  return (
                     
          <>

          <Nav/>    
  
                <div className="container">
                  <div className="grid grid-cols-12 gap-4">
                 
                  <div className="col-span-2 sm:col-span-2 md:col-span-2 
                    lg:col-span-1 xl:col-span-2">
                      <div className=" category-list-box">
                      <div className="category-list-box-body">

                            {
                              categories.map((c)=>(
                                <div className="category-list-box-content">
                                    <p className="category-text"
                                    onClick={()=>{this.redirect_page(c.CategoryKey)}}
                                   >
                                     {c.CategoryName}
                                    </p>    
                                    
                                </div>
                              ))
                            }
                              
                      </div>
                  </div>
                    </div>

                    <div className="col-span-9 sm:col-span-9 md:col-span-8
                    lg:col-span-9 xl:col-span-9">
                    <div className="grid grid-cols-8 gap-3">
                            
                            {
                              latest_items.map((item)=>(
                                <>
                                <div className="col-span-2 sm:col-span-4  pt-2 md:col-span-4 lg:col-span-2 xl:col-span-2">
                                    <div className="item-container">

                                      <div className="item-box">
                                        <div className="item-image-container">
                                        <img className="item-image"
                                              onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                                src={item.Image1}
                                                />
                                        </div>
                                        <div className="item-detail-container">
                                        <h3 
                                            onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                            className="item-heading">
                                             {item.Title.length < 30 ? 
                             `${item.Title}` : `${item.Title.substring(0, 31)}...` }
                                              
                                            </h3>

                                            <p onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                             className="item-text">
                                            <TeamOutlined /> {item.Owner}
                                            </p>
                                            <p  className="item-text">
                                            <EnvironmentOutlined /> Shipping Nationwide
                                            </p>
                                            <div className="item-rating">
                                            <Rate disabled defaultValue={item.Rating} />
                                            </div>
                                            <p 
                                            onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                             className="item-price">
                                            <span><CreditCardOutlined /></span> {item.Price}
                                            </p>

                                            <div className="item-link-container">
                                              <button 
                                              onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                              href={`/categories/${item.Category}/${item.id}`}
                                              className=" item-button">
                                                  Open
                                              </button>  
                                            </div>
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