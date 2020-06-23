import React, { Component } from 'react'
import Pusher from 'pusher-js';

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";

import {notification,message} from 'antd'
import TemporaryDrawer from './Sidebar/SideNav'
import { getMembership } from '../../store/actions/membership';

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const host = 'https://back-ent.herokuapp.com'

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
        membership : [], 
        chartData : [],
        loading : false ,
        error : null , 
        post_views_x : [],
        post_name_y :[] ,
        average_views : [],
        user_post : [], 

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
            results : res.data
          })
        })
  
        //Conditions and Mapping starts here
        if (this.state.results.Electronics.length > 0){
          var electronics_data = this.state.results.Electronics
          
          electronics_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
         
      }
  
      if (this.state.results.Fashion.length > 0){
          var fashion_data = this.state.results.Fashion
          
          
          fashion_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], 
              Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
      }
  
      if (this.state.results.Services.length > 0){
          var services_data = this.state.results.Services
          
          
          services_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
      }
  
      if (this.state.results.HomeAppliances.length > 0){
          var home_app = this.state.results.HomeAppliances
         
          home_app.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
  
      }
      
      if (this.state.results.Phones.length > 0){
          var phone_data = this.state.results.Phones
     
          phone_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
      }
  
      if (this.state.results.Property.length > 0){
          var property_data = this.state.results.Property
   
          property_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
          
      }
      
      if (this.state.results.Vehicles.length > 0){
          var vehicle_data = this.state.results.Vehicles
    
          
          vehicle_data.map((i)=>{
              var a = {
                  id : i['id'] ,
              category : i['Category'],
              Title : i['Title'], Views : i['Views']
             }
             JSON.stringify(a)
             Main.push(a)
             
          })
          this.setState({
              mini_products_data:Main
          })
  
          
      }
      //Conditions and Mapping ends here
  
      //Assign Gotten Data into Chart.js for Processing and Visualization
      var Labels = []
      var DataPoints = []
      var Products_for_charts = this.state.mini_products_data;
      
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
      console.log('Chart Labels', this.state.mini_products_data)
  
      //Caculates Average and Total Impressions
      Products_for_charts.map((i)=>{
         var b = i['Views']
       DataPoints.push(b)
       console.log('The Labels',Labels)
      })
      var Average_Impression = DataPoints / DataPoints.length
      var Total_Impression  = 100
      console.log('Impressions Here',Average_Impression,Total_Impression)
      this.setState({
        average_views :Average_Impression,
        total_views:Total_Impression
      })
  
      //Products Analysis Functions ends here
      }



    //Mini Analysis Ends here
     Analysis = async(token) =>{
      const Data_Labels = []
      const Data_Points = []
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
          
          axios.get(`https://back-ent.herokuapp.com/stream/profile_view/${profile_id}/`)
          .then(res =>{
            this.setState({
              profile: res.data
            })
            console.log('profile details',res.data['Edited'])
            const CheckEdit = res.data['Edited']
            if (CheckEdit == false){
              message.error('Please Edit Your profle, For Us to Process Your Data', 10)
              //this.props.history.push("/edit_profile/")
             // this.props.history.push("/edit_profile/")
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


    componentDidMount(){
      //this.test_ws()
      this.props.member()
      this.Profile_ID(this.props.token)
        this.Get_User_Membership(this.props.token)
        this.Get_Post_Views(this.props.token)
      this.Get_User_post(this.props.token)
       // this.Analysis(this.props.token)
       this.Products_Analysis(this.props.token)
       }
    
   

      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.props.member()

            this.Profile_ID(newProps.token)
            this.Get_User_Membership(newProps.token)
            this.Get_Post_Views(newProps.token)
          this.Get_User_post(newProps.token)
           // this.Analysis(newProps.token)
           this.Products_Analysis(newProps.token)
            
          }
        }
      }
  
    
    
    render() {
       
       
        const {profile , average_views  , membership , user_post} = this.state
        const {is_seller} = this.props
        console.log(is_seller);
  
        

return (          
          <div>
            {
              is_seller ? (
                <>

                <TemporaryDrawer />
  
            
                  <div
                
                   className="container">
                    
                    <div className="grid grid-cols-4">
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                            <div className="top-card">
                                
                            <div className="top-card-title">
                                <h3 className="top-card-title">
                                  Account Type
                                </h3>
                            </div>
                              <div className="grid grid-cols-2">
                              <div className="top-card-text col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                                  {membership.membership}   
                              </div>  
                              <div className="pt-3 
                              
                              col-span-1
                              sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1">
                              <a className="top-card-text"
                              href={`/membership_select`}>
                                  Upgrade
                                  </a>
                              </div>
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
                              {
                                average_views ?(average_views):(0)
                              }   
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
  
                    <div className="container mx-auto">
                    <div className="grid grid-cols-6">
                      
                      <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                      
                      <div className="snip1336 ">
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
                      alt="sample87" />
                      <figcaption>
                        <img src={profile.ProfilePicture} alt="profile-sample4" className="profile" />
                        <h2>{profile.User_First_Name}</h2>
                        <p>
                        Username:  {profile.user}
                        </p>
                        <p>
                        Email:  {profile.Email}
                        </p>
                        <p>
                        Phone:  {profile.Phone}
                        </p>
                        
                        <p>
                        Bio:  {profile.Bio}
                        </p>
                        <a href="/edit_profile/" className="follow">
                          Edit Profile
                        </a>
                        <a href="/profile/" className="info">More Info</a>
                      </figcaption>
                    </div>
                        </div>
                        
                    
                      <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                 
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
      membership_type: state.membership.mode
    };
};

const mapDispatchToProps = dispatch => {
  return {
    member: () => dispatch(getMembership())
}
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileDashboard)