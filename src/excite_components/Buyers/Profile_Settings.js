import React, { Component } from 'react'
import Pusher from 'pusher-js';

import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";

import {notification,message,Input ,Select , Form, Button} from 'antd'
const { Option } = Select; 
const {TextArea} = Input


const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

const formItemLayout = {
    wrapperCol: { span: 12, offset: 6 }
  };

const states = ['Lagos','Ondo','Oyo']
const country = ['Nigeria','South-Afirca','Kenya','Ghana','Rwanada']

const host = 'http://127.0.0.1:8000'
const Profile_id_url  = host + `/stream/get_profile_id/`
const userData_endpoint = host + '/stream/get_my_user_id_and_email/'
const accountType_endpoint = host + '/stream/get_my_user_data/'

class buyerProfile extends Component{
    state = {
        user_id:[],
        user_email:[],

        profile: [],
        Verified:false,

        Profile_Image:null,
        
        loading:true,
        error:null ,
    }

    userData = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        await axios.get(userData_endpoint)
        .then(res =>{
            const the_id = res.data
            this.setState({
            user_id: res.data.userID,
            email : res.data.Email,
            })
            console.log('User data', res.data)
        })
    }
    
    accountType = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        };
        await axios.get(accountType_endpoint)
        .then(res =>{
            const the_id = res.data
            this.setState({
            accountMode: res.data.Account_Type,
            
            })
            console.log('User data', res.data)
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
        console.log('The profile id',profile_id['Profile_id'])
        const parse_profile_id = profile_id['Profile_id']
        
        await this.Profile_data(token, parse_profile_id)

        }


    Profile_data = (token,parse_user_id) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
          axios.get(`http://127.0.0.1:8000/stream/profile_view/${parse_user_id}/`)
          .then(res =>{
            this.setState({
              profile: res.data
            })
            console.log('Buyer Profile', res.data)
            console.log('profile details',res.data['Edited'])
            const CheckEdit = res.data['Edited']
            const isVerified = res.data['Verified']
            if (CheckEdit == false){
              message.error('Please Edit Your profle, For Us to Process Your Data', 10)
             // this.props.history.push("/edit_profile/"
            }
            if (isVerified == false){
                this.setState({
                    Verified:false
                })
            }else{
                this.setState({
                    Verified:true
                })
            }

          })     
        
    }


    ///Profile Edit
    
    
      handleImageChange = (e) => {
        this.setState({
          Profile_Image: e.target.files[0]
        })
      };

        editProfile = (values,err) =>{
          
            
             const First_Name =  
                  values["First_Name"] === undefined ? null : values["First_Name"] ;
                  const Last_Name =  
                  values["Last_Name"] === undefined ? null : values["Last_Name"] ;
              const Email = 
                  values['Email'] === undefined ? null : values['Email'] ;
              const Phone = 
                values['Phone'] === undefined ? null : values['Phone'] ;
              
              const Address = 
                values['Address'] === undefined ? null : values['Address'] ;
              
                const Bio = 
            values['Bio'] === undefined ? null : values['Bio']
    
          
               
                const Profile_Picture = this.state.Profile_Image
                //Assigns Form Data for POST request
                const fd  = new FormData()
                fd.append('Profile_Picture', Profile_Picture);
                fd.append('First_Name', First_Name);
                fd.append('Last_Name',Last_Name);
                fd.append('Email', Email);
                fd.append('Phone', Phone);
                fd.append('Address', Address);
                fd.append('Bio', Bio);
                
    
    
                if(!err){
    
                  axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
                  axios.defaults.xsrfCookieName = "csrftoken";
                  axios.post(host + `/stream/edit_profile/`,fd, {
                    headers : {
                      "Content-Type": "multitype/form-data",
                      Authorization: `Token ${this.props.token}`
                    }
                  }).then(res =>{
                    if (res.status == 200){
                        this.props.history.push('/profile')
                    openNotification('Profile edited successfully') 
                    }else{
                        openNotification('Error Uploading Profile') 
                    }         
                })
    
                }
                
               
            }
             //submit form query contents ends here
            
            upload_img  =(e)=>{
              const grab = e.target.files[0]
              alert(grab)
              this.setState({
                pic : grab
              }) 
    
              
            }
            //Profile Edit ends here

    componentDidMount(){
        //this.test_ws()
        if (this.props.token !== undefined && this.props.token !== null) {
            this.Profile_ID(this.props.token)
            this.Profile_data(this.props.token)
            this.userData(this.props.token)
            this.accountType(this.props.token)
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.Profile_ID(newProps.token)
                this.Profile_data(newProps.token)
                this.userData(newProps.token)
                this.accountType(newProps.token)
            }
        }
      }

      render(){
          const {Verified , Profile_Image, profile} = this.state
          return(
              <>
                <div className="container">
                    <div className="grid grid-cols-6">
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2 xl:col-span-2">
                      
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
                                    Verified? (
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

                        <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                            <div className="">
                            <Form  {...formItemLayout} onFinish={this.editProfile}>
                                                            
                            <Form.Item
                                className="antd-inline"
                               
                                name ="First_Name">

                                        <Input

                                        placeholder="First Name"
                                        
                                        enterButton
                                        />

                                </Form.Item>

                                    <Form.Item 
                                    className="antd-inline"
                                    
                                    name ="Last_Name">

                                        <Input
                                        placeholder="Last Name"
                                        enterButton
                                        />

                                    </Form.Item>


                                    <Form.Item 
                               
                                name ='Email'> 
                                    
                                    <Input
                                    placeholder="Email"
                                    enterButton
                                    />
                                
                                </Form.Item>

                                <Form.Item 
                               
                                name ='Phone'> 
                                
                                    <Input
                                    placeholder="Phone Number"
                                    
                                    enterButton
                                    />
                                
                                </Form.Item>

                            <Form.Item style>
                                            <Form.Item 
                                        rules={[{ required: true }]}
                                    name="Post_Image1">

                                    <Input  type="file"
                                    value = {Profile_Image}
                                    onChange={this.handleImageChange} 
                                    name="Post_Image1" />
                                    </Form.Item>

                            </Form.Item>

                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                    <button className="login-button" type="primary" htmlType="submit">
                                        Submit
                                    </button>
                            </Form.Item>

                              </Form>
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
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      is_buyer : state.auth.is_buyer,
    };
  };
  



export default withRouter(
connect(
mapStateToProps,
    null )
(buyerProfile));








         
              