import React, { Component } from 'react'
import Pusher from 'pusher-js';

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";

import {notification,message} from 'antd'
import TemporaryDrawer from './Sidebar/SideNav'
import { getMembership } from '../../store/actions/membership';

import { CrownOutlined, DollarCircleTwoTone,UserOutlined, MenuFoldOutlined } from '@ant-design/icons';


const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const host = 'https://backend-entr.herokuapp.com'

const Profile_id_url  = host + `/stream/get_profile_id/`
const Profile_url = host + `/stream/profile_view/`
const UserMembership_url  = host + '/stream/user_membership/'
const Membership_url = host + '/stream/list_membership/'
const Post_Analytics_url = host + '/analytics/rankings/'

const UserPost_url = host + '/stream/view_post/'

const products_analysis_endpoint = host + `/analytics/product_views/`

var Main = []


class ProfileDashboard extends Component {

    // The User Proifle State
    state = {
        profile : [] ,
        profile_id : [],
        isEdited : false,
        isVerified: false,
        membership : [], 
        chartData : [],
        loading : false ,
        error : null , 
        post_views_x : [],
        post_name_y :[] ,
        average_views : [],
        user_post : [], 
        disableUpgrade: false,

        results:[],
        productsFetched:[],
        Total_Product_Views:0,
        mini_products_data: []
          }
    
    //Check User Authenticated State
     
    temp_props = this.props

      //Mini Analysis
      
    Products_Analysis = async(token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(products_analysis_endpoint)
      .then(res=>{
        this.setState({
          productsFetched : res.data
        })
      })


    //Assign Gotten Data into Chart.js for Processing and Visualization
    var Labels = []
    var DataPoints = []
    var Products_for_charts = this.state.productsFetched;
    console.log(Products_for_charts)
    //Maps Data to assigns data point and labels
     Products_for_charts.map((i)=>{
       var a = i['Title']
        var b = i['Views']
      Labels.push(a)
      DataPoints.push(b)
      console.log('The Labels',Labels)
     })

    this.setState({
        chartData:{
          labels: Labels,
          datasets:[
            {
              label:'Impressions',
              data: DataPoints,
              backgroundColor:[
                'rgb(148,0,211)'
              ]
            }
          ]
        }
    })
    console.log('Products Data',Main)
    console.log('Chart Labels', this.state.Allocated_products_analysis_data)

    //Caculates Average and Total Impressions
    Products_for_charts.map((i)=>{
       var b = i['Views']
     DataPoints.push(b)
     console.log('The Labels',Labels)
    })
    
    const len = DataPoints.length
    var Average_Impression = Math.round(DataPoints / len)
    var Total_Impression  = 100
    console.log('Impressions Here',Average_Impression,Total_Impression ,len)
    this.setState({
      average_views :Average_Impression,
      total_views:Total_Impression ,
      total_post:len
    })
 
    //Products Analysis Functions ends here
    }

    //Mini Analysis Ends here
     Analysis = async(token) =>{
     // const Data_Labels = []
    //  const Data_Points = []
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(Post_Analytics_url)
      .then(
          res =>{
           const Fetched_Data = res.data
            const New_Data ={
             'Labels': res.data.PostLabels,
             'Points': res.data.PostViews,
           }
           
            this.setState({
              chartData:{
                labels: Fetched_Data.PostLabels,
                datasets:[
                  {
                    label:'Impressions',
                    data: Fetched_Data.PostViews ,
                    backgroundColor:[
                      
                      'rgba(18, 30, 198)'
                    ]
                  }
                ]
              }
            })
             console.log('Analysis',New_Data)
          } ) 
      
      }

      
      Profile_detail = (token,profile_id) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
          axios.get(`https://backend-entr.herokuapp.com/stream/profile_view/${profile_id}/`)
          .then(res =>{
            this.setState({
              profile: res.data
            })
            console.log('profile details',res.data['Edited'])
            const CheckEdit = res.data['Edited']
            const checkVerification = res.data['Verified']
            if (CheckEdit == false){
              message.error('Please Edit Your profle, For Us to Process Your Data', 10)
              //this.props.history.push("/edit_profile/")
             // this.props.history.push("/edit_profile/")
            }
            if(checkVerification == false){
              this.setState({
                isVerified:true
              })
            }
          })

        
    }

    Profile_ID = async (token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(Profile_id_url)
      .then(res =>{
        const the_id = res.data
        this.setState({
          profile_id: res.data
        })
      });
      const {profile_id} = this.state
      const parse_profile_id = profile_id['Profile_id']
      console.log(parse_profile_id)
      await this.Profile_detail(token, parse_profile_id)

    }

    

    Get_User_Membership = (token) =>{
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(UserMembership_url)
        .then(res =>{
            this.setState({
              membership : res.data[0]
            }); console.log('memberships',res.data)
        })
        .catch(e =>{
            console.log(e)
        }) 
    }

    Get_Post_Views = (token)=>{
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(Post_Analytics_url)
        .then(res =>{
            this.setState({
              post_name_y : res.data.PostLabels,
              post_views_x : res.data.PostViews,
              average_views : Math.round(res.data.Average_view)
            }); console.log('Impression',res.data)
        })
        .catch(e =>{
            console.log(e)
        })
    }

    Get_User_post = (token) =>{
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
      axios.get(UserPost_url)
      .then(res =>{
          this.setState({
            user_post : res.data
          }); console.log('rep',res.data)
      })
      
      .catch(e =>{
          console.log(e)
      })
      
  }

    test_ws(){
      var pusher = new Pusher('8b827980b6cb1e62195c', {
        cluster: 'eu'
      });
      
      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
        console.log(JSON.stringify(data))
      });
      console.log('tryiing...')
     
    }

    Verify_Authentication =(token)=>{
      const {is_seller, isAuth} = this.props
      // if (isAuth && is_seller){
      //   openNotification('You`re Authorized')
      // }
      console.log("auth", this.props.is_seller);
      if (is_seller==true){
        console.log('user is a seller', is_seller);
      }else{
        console.log('user is a buyer', is_seller);
      }
      
    }

    Insights = (token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const views_count_endpoint = host + '/analytics/count_products/'
      axios.get(views_count_endpoint)
      .then(res =>{
          this.setState({
            Total_Product_Views:res.data.TotalViews,
          
          });
          console.log('Impression',res.data)
      })
      .catch(e =>{
          console.log(e)
      })
  }

    //Checks Membership mode
    GrantUser = false
    accountType = async (token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + '/stream/user_membership'
      await axios.get(endpoint)
      .then(res=>{
          const planMode = res.data[0].membership
          console.log('the plan',planMode)
          if (  planMode == 'Premium'){
            this.setState({
              disableUpgrade:true
            })
            console.log(this.state.AllowUser)
            this.GrantUser = true
            
        }
      })
     
     }


    componentDidMount(){
      //this.test_ws()
      if (this.props.token !== undefined && this.props.token !== null) {
        this.props.member()
        this.accountType(this.props.token)
        this.Profile_ID(this.props.token)
        this.Get_User_Membership(this.props.token)
        this.Get_Post_Views(this.props.token)
        this.Get_User_post(this.props.token)
        // this.Analysis(this.props.token)
        this.Products_Analysis(this.props.token)
            
      }
    }
    
    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.props.member()
          this.accountType(newProps.token)
          this.Profile_ID(newProps.token)
          this.Get_User_Membership(newProps.token)
          this.Get_Post_Views(newProps.token)
          this.Get_User_post(newProps.token)
          this.Insights(newProps.token)
          // this.Analysis(newProps.token)
          this.Products_Analysis(newProps.token)
          this.props.member(newProps.token)    
       }
      }
    }
  
    
    render() {
       
      console.log(this.props.membership_type);
      
       
        const {profile , average_views  , membership , Total_Product_Views, isVerified , disableUpgrade} = this.state
        const {is_seller} = this.props
        console.log(is_seller);
  
        

return (          
          <div>
            {
              is_seller ? (
                <>

                <TemporaryDrawer />
  
                
                 <div className="main">


                 <div
                
                className="container">
                 
                 <div className="grid grid-cols-4">
                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                         <div className="top-card membership-box">
                             
                         <div className="top-card-title">
                             <h3 className="top-card-title membership-title">
                               Account Type
                             </h3>
                         </div>
                           <div className="grid grid-cols-2">
                           <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                             <p className="membership-mode">
                             {membership.membership}   
                             </p> 
                           </div>  
                           

                         {
                           disableUpgrade ?(
                             <>
                             <div className="pt-2
                           col-span-1
                           sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                          
                           </div>
                             </>
                           ): (
                             <>
                             <div className="pt-2
                           col-span-1
                           sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                           <a className="top-card-text membership-text"
                           href={`/membership_select`}>
                               Upgrade
                               </a>
                           </div>
                             </>
                           )
                         }

                           </div>
                         </div>
                     </div>

                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                     <div className="top-card">
                         
                     <div className="top-card-title">
                         <h3 className="top-card-title">
                           Impressions
                         </h3>
                     </div>
                       <div className="top-card-text">
                       {Total_Product_Views} 
                       </div>
                     </div>
                 </div> 

                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                     <div className="top-card">
                         
                     <div className="top-card-title">
                         <h3 className="top-card-title">
                           Products
                         </h3>
                     </div>
                       <div className="top-card-text">
                       <a href={`/user_uploads`}>
                       View Your Products 
                       </a>
                       </div>
                     </div>
                 </div>

                 <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                     <div className="top-card">
                         
                     <div className="top-card-title">
                         <h3 className="top-card-title">
                           Quotes
                         </h3>
                     </div>
                       <div className="top-card-text">
                       <a href={`/vendor_quotes/`}>
                       Click
                       </a>
                       </div>
                     </div>
                 </div>

                 </div>

               </div>   
                 
                 
  
                    <div className="section-box">
                   
                      
                            <div className="s-box-left">
                            <div className="profile-card-container">
                                <div className="profile-image-box">
                                  <img className="profile-image"
                                  src={profile.ProfilePicture}/>
                                </div>
                                <hr/>
                                <div className="profile-description">
                                  <div className="profile-text-container">
                                  <p  className="profile-text">
                                  {profile.User_First_Name} {profile.User_Last_Name}
                                  </p>

                                  </div>
                                  <hr/>
                                  <div className="profile-text-container">
                                    <p className="profile-text">
                                    {profile.Email}
                                    </p>
                                  </div>
                                  <hr/>
                                  <div className="profile-text-container">
                                  <p className="profile-text">
                                  {profile.Phone}
                                    </p>
                                   
                                  </div>
                                  <hr/>
                                  <div className="profile-text-container">
                                  {

                                    isVerified? (
                                      <p className="profile-text">
                                      Verified
                                      </p>
                                 
                                    ):(
                                      <p className="profile-text">
                                     Not Verified
                                      </p>
                                    )
                                  }
                                  
                                  </div>

                                  <hr/>
                                  <div className="profile-button-box">
                                      <button className="profile-button">
                                      Edit Profile
                                      </button>
                                  </div>
                                </div>

                              </div>

                            </div>
                        
                     
                      <div className="s-box-right">
                 
                      <div 
                     className="base-card ">
                     <Bar
                           className =""
                           data={this.state.chartData}
                           options={{
                            responsive: true,
                           maintainAspectRatio : true,
                           title:{
                           display:this.props.displayTitle,
                           text:'Largest Cities In '+this.props.location,
                           fontSize:25
                           },
                           legend:{
                           display:this.props.displayLegend,
                           position:this.props.legendPosition
                           
                           }
                           }}
                      />
                     </div>
  
                     </div>
  
  
                  </div> 
                



                    </div>
         
              </>

              ):(
                <div className="container">
                    <div className="grid-cols-12">
                        <div className="col-span-5">

                        </div>

                        <div className="col-span-5">
                          You are not authorized for this channel
                        </div>


                    </div>
                </div>
              )
            }
            
            </div>
          
        )
    };

};

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    member: (token) => dispatch(getMembership(token))
}
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDashboard) 