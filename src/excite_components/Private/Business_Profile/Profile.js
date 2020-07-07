import React, { Component } from 'react'
import Pusher from 'pusher-js';
 
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import {notification,message} from 'antd'
import TemporaryDrawer from '../Sidebar/SideNav'

const host = 'https://backend-entr.herokuapp.com'

const Profile_id_url  = host + '/stream/get_profile_id/'
const Profile_url = host + '/stream/profile_view/'

const Business_Profile_id_url = host + "/stream/get_business_profile_id/"
const Business_Profile_url = host + '/stream/business_profile/'

const My_User_id_url = host + "/stream/get_my_user_id_and_email/"


class User_Profile extends React.Component{
    state = {
        user_id: '',

        profile: [],
        profile_id : null,
    
        Business_Profile : [],
        business_profile_id : null,

        loading : true,
        error :null,
    }

    My_User_id = async(token)=>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
       await axios.get(My_User_id_url)
       .then(res =>{
         this.setState({
          user_id : res.data['userID']
         })
         
       })
  
    }

    Profile_detail = (token,parse_user_id) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
          axios.get(host + `/stream/profile_view/${parse_user_id}/`)
          .then(res =>{
            this.setState({
              profile: res.data
            })
            console.log('profile details',res.data['Edited'])
            const CheckEdit = res.data['Edited']
            if (CheckEdit == false){
              message.error('Please Edit Your profle, For Us to Process Your Data', 10)
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
      console.log('THE PRROOFILE IS',profile_id['Profile_id'])
      const parse_profile_id = profile_id['Profile_id']
    
      await this.Profile_detail(token, parse_profile_id)

    }

    Business_Profile_data = async(token, parse_user_id)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          await axios.get(Business_Profile_url + `${parse_user_id}/`)
          .then(res =>{
            console.log('THIS IS THE BUSINESS MODEL', res.data)
            const the_id = res.data
            this.setState({
              Business_Profile: res.data
            }) 
        })
    }

    Business_Profile_id = async (token) =>{
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(Business_Profile_id_url)
        .then(res =>{
          const the_id = res.data
          this.setState({
            business_profile_id : res.data
          })
          console.log('THis is the state',this.state)
        });
        
        const {business_profile_id} = this.state
        const parse_user_id = business_profile_id['Business']
        console.log('THis is the business idddd',this.state.business_profile_id)
        await this.Business_Profile_data(token, parse_user_id)
  
      }

      Edit_Business_Profile_Redirect=(e)=>{
        this.props.history.push("/edit_business_profile/")
      }

    componentDidMount(){
        this.Profile_ID(this.props.token)
        this.Business_Profile_id(this.props.token)
        this.My_User_id(this.props.token)

         }

    componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.Profile_ID(newProps.token)
                this.Business_Profile_id(newProps.token)
                this.My_User_id(newProps.token)   
            }
          }
        }
    

    render(){
        const {user_id, profile_id,   Business_Profile,
            business_profile_id,profile,
            loading,
            error} = this.state
        const {is_seller} = this.props
        console.log(this.state);

        return(
            
           <>

           <TemporaryDrawer />
                     <div className="container mx-auto my-auto">
                <div className="grid grid-cols-12 gap-1">
                    
                        <div className="col-span-12 sm:col-span-12 md:col-span-12 xl:col-span-4 lg:col-span-4">
                            
                        <div className="snip1336 ">
                      <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sample87.jpg"
                      alt="sample87" />
                      <figcaption>
                        <img src={profile.ProfilePicture} alt="profile-sample4" className="profile" />
                        <h2>{profile.User_First_Name} {profile.User_LastName}</h2>
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
                        
                      </figcaption>
                    </div>

                        </div>


                        <div className="col-span-12 sm:col-span-12 md:col-span-12 xl:col-span-8 lg:col-span-8">
                            <div className ="business-card">

                            <div className="">
                                <h4 className="post-title">
                                    Business Profile
                                </h4>

                                <div className="grid grid-cols-4 gap-1">

                                    <div className="sm:col-span-2 md:col-span-2 
                                    lg:col-span-2 xl:col-span-2" >
                                     <p className="post-text">
                               Name : {Business_Profile.BusinessName}
                                </p>
                                    </div>

                                    <div className="sm:col-span-2 md:col-span-2 
                                    lg:col-span-2 xl:col-span-2" >
                                      <p className="post-text">
                                    Email Adress : {Business_Profile.BusinessName}
                                    </p>

                                    </div>

                                    <div className="sm:col-span-2 md:col-span-2 
                                    lg:col-span-2 xl:col-span-2" >
                                      <p className="post-text">
                                 Phone Line : {Business_Profile.BusinessPhone}
                                </p>
                                    </div>  

                                    <div className="sm:col-span-2 md:col-span-2 
                                    lg:col-span-2 xl:col-span-2" >
                                     <p className="post-text">
                                 Website : {Business_Profile.BusinessWebsite}
                                </p>
                                    </div>

                                    <div className="sm:col-span-2 md:col-span-2 
                                    lg:col-span-2 xl:col-span-2" >
                                     <p className="post-text">
                                 Bio : {Business_Profile.BusinessBio}
                                </p>
                                    </div>

                                </div>

                                <div className="grid grid-cols-4">
                                  <div className="col-span-4">
                                  <button
                                  onClick={this.Edit_Business_Profile_Redirect}
                                  href="/edit_business_profile/"
                                  className="Business-Edit-Button">
                                      Edit
                                  </button>
                                  </div>
                                </div>
                                
                            </div>
                            
                                
                            </div>
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
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(User_Profile);