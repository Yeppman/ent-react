import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Input , Form, Button ,Select, notification } from 'antd';
import axios from "axios";
import { connect } from "react-redux";
import SimpleTable from './table'

import TemporaryDrawer from '../Sidebar/SideNav'
import { faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const { Option } = Select;
const { TextArea } = Input; 


const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};


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

class Contact_Field extends Component{
    state = {
      AllowUser : false,

        contacts : [],
        loading : true,
        error : null ,

        emails :null ,
    }

    //Redirects to storing client page
    create_client(){
      window.location.replace('/store_client/')
    }

    redirectPage(){
      window.location.replace('/mailing/')
    }

    Contact_List  = async(token) =>{
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
              axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              };
        const endpoint= host + '/management/contact_list/'
        await axios.get(endpoint)
        .then(res =>{
            this.setState({
                contacts : res.data,
                loading : false
            })
            console.log(res.data)

        })
    }

    delete_contact = async (id) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
        await axios.get(`https://backend-entr.herokuapp.com/management/delete_contact/${id}/`)
        .then(res =>{
          this.openNotification(res.data['Message'])
        })

    }

    //Verifies Membership
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
          if (planMode=='Basic' || planMode == 'Premium'){
            this.setState({
              AllowUser:true
            })
            console.log(this.state.AllowUser)
            this.GrantUser = true
            
        }
      })
     
      
    }

    
      Allocate_Email = async(email_val)=>{
        const Email_list = []
        Email_list.push(email_val)
        this.setState({
          emails : Email_list
        })
        alert(email_val)
      }

      Mail_Clients = (values,err) =>{

        const Heading =  
             values["Heading"] === undefined ? null : values["Heading"] ;
        const Contacts = 
             values['Contacts'] === undefined ? null : values['Contacts'] ;
       
         const Phone_Number = 
           values['Phone'] === undefined ? null : values['Phone'] ;
           const Message = 
           values['Mail_Message'] === undefined ? null : values['Mail_Message'] ; 
        const Email = String(Contacts)
        const Phone  = String(Phone_Number)
        console.log(Email, Phone)
     
           this.setState({
             loading: false
           });
     
           if(!err){
             axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
         axios.defaults.xsrfCookieName = "csrftoken";
             axios.defaults.headers = {
               "Content-Type": "application/json",
               Authorization: `Token ${this.props.token}`
             };
             
             axios.get(`https://backend-entr.herokuapp.com/management/broadcast/`,
              {
               params: {
                  Heading,  Phone ,Message, Email
                 
               }
             }).then(res =>{
                 console.log(res.data)
                 const take_response = res.data['Message']
                 openNotification(take_response)            
             }).catch(e =>{
                 console.log(e)
             })
           }
           
           //process query contents ends here
       }
   

    process_query = (values,err) =>{

         const Name =  
              values["Name"] === undefined ? null : values["Name"] ;
          const Email = 
              values['Email'] === undefined ? null : values['Email'] ;
          const Phone = 
            values['Phone'] === undefined ? null : values['Phone'] ;
          const Address = 
            values['Address'] === undefined ? null : values['Address'] ;
          const City = 
            values['Country'] === undefined ? null : values['Country']
          const Country = 
            values['Country'] === undefined ? null : values['Country'] 
         
      
            this.setState({
              loading: true
            })
      
            if(!err){
              axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
              axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
              };
              
              axios.get(`https://backend-entr.herokuapp.com/management/save_contact/`,
               {
                params: {
                   Name, Email ,  Phone ,Address
                  ,City ,Country
                }
              }).then(res =>{
                  console.log(res.data)
                  const take_response = res.data['Message']
                 
                  this.openNotification(take_response)            
              }).catch(e =>{
                  console.log(e)
              })
            }
            
            //process query contents ends here
        }
    
  
        // Recieve Incoming token
        componentWillReceiveProps(newProps) {
          if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
              this.Contact_List(newProps.token)
              this.accountType(newProps.token)
            }
          }
        }

    componentDidMount(){
      
      this.accountType(this.props.token)
        this.Contact_List(this.props.token)
        
    }

     
    render(){
        const {contacts , loading , error ,AllowUser } = this.state
        return(

            
            <>
                {
                  AllowUser ? (
                    <>

                      
                                <TemporaryDrawer />

                               

                            <div className="main">

                            <div className="container ">
                          <div className="grid grid-cols-8">
                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                   Mail List
                                  </h3>
                              </div>
                                <div className="top-card-text">
                                    {6}
                                </div>
                              </div>
                          </div> 

                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Sent
                                  </h3>
                              </div>
                                <div className="top-card-text">
                                  {45}
                                </div>
                              </div>
                          </div> 


                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Callbacks
                                  </h3>
                              </div>
                                <div className="top-card-text">

                                <p>
                                  {45}
                                </p>
                                      
                                </div>
                              </div>
                          </div> 


                      
                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                              <div className="top-card">
                                  
                              <div className="top-card-title">
                                  <h3 className="top-card-title">
                                    Send 
                                  </h3>
                              </div>
                                <div className="top-card-text">

                                <p>
                                  {45}
                                </p>
                                      
                                </div>
                              </div>
                          </div> 

                          </div>


                          </div>

                       

                            <div className="container">
                     <div className="grid grid-cols-10">
                       <div className="col-span-2">
                       
                       <button
                        onClick={this.create_client}
                              class="create-client-button"
                            htmlType="submit">
                              Create Client
                            </button>
                       </div>

                       <div className="col-span-2">
                       
                       <button
                        onClick={this.redirectPage}
                              class="create-client-button"
                            htmlType>
                              Send Mail
                            </button>
                       </div>
                     </div>
                    </div>

                  <div className="container">
                      <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-8 xl:col-span-8">
                        <div className="">

                        <SimpleTable token={this.props.token} data={contacts} />

                      </div>
                  </div>

                   
                    </div>
                  </div>


                  <div className="container">
                  <div className="grid grid-cols-6">
                  <div className="login-section col-span-6 
                  sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">

                  <h4 
                  style={{fontSize:20}}
                  className="text-center">
                  Send Mail
                  </h4>

                  <Form 
                  onFinish={this.Mail_Clients}>


                  <Form.Item name="Contacts">
                  <Select
                  mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select Email Recipients"

                    optionLabelProp="label"
                  >
                  {
                  contacts.map((c)=>(
                    <Option value={c.ClientEmail}
                    onClick={()=>{this.Allocate_Email(c.ClientEmail)}}
                    label={c.ClientEmail}>
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="China">
                      🇨🇳
                    </span>
                    {c.ClientEmail}
                  </div>
                    </Option>
                      ))
                    }
                  </Select>
                  </Form.Item>

                  <Form.Item name="Phone">
                  <Select
                  mode="multiple"
                    style={{ width: '100%' }}
                    placeholder="Select Phone Recipients"
                  
                    optionLabelProp="label"
                  >
                  {
                  contacts.map((c)=>(
                    <Option value={c.ClientPhone} label={c.ClientPhone}>
                  <div className="demo-option-label-item">
                    <span role="img" aria-label="China">
                    <FontAwesomeIcon icon={faMailBulk} />
                    </span>
                    {c.ClientPhone}
                  </div>
                    </Option>
                      ))
                    }
                  </Select>
                  </Form.Item>

                  <Form.Item name ="Heading">
                              
                    <Input
                    placeholder="Heading"
                    enterButton
                    />

                  </Form.Item>

                  <Form.Item
                      rules={[{ required: true }]}
                      name="Mail_Message">
                    <TextArea 
                    placeholder ="Your text here"
                    rows={4} />
                    
                  </Form.Item>
                    
                  <Form.Item >
                        <button
                       
                          class="login-button"
                        htmlType="submit">
                          Send
                        </button>
                      </Form.Item>

                  </Form>
                  </div>

                  <div className="login-section col-span-6 
                  sm:col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3">
                  </div>        
                    </div>

                  </div>  
                    
                  </div>

                    </>
                  ):(
                    <>
                      <TemporaryDrawer/>
                     <div className="main">
                     <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-4 lg:col-span-4">
                        <p>
                 Upgrade to use this feature
                 </p>
                        </div>
                    </div>
                  </div>
                     </div>
                    </>
                  )
                }
            </>

        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode,
    };
  };
  
   
export default connect(
mapStateToProps,
null
)(Contact_Field);