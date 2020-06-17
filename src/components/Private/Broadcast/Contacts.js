import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Input , Form, Button ,Select, notification } from 'antd';


import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'


import { faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const { Option } = Select;
const { TextArea } = Input; 

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};


class Contact_Field extends Component{
    state = {
        contacts : [],
        loading : true,
        error : null ,
    }
 
    Contact_List  = async(token) =>{
        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
              axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${token}`
              };
        await axios.get('https://ent-react.vercel.app/management/contact_list/')
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
        await axios.get(`https://ent-react.vercel.app/management/delete_contact/${id}/`)
        .then(res =>{
          this.openNotification(res.data['Message'])
        })

    }

    openNotification = (msg) => {
        notification.open({
          message: 'Notification Title',
          description:msg,
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
      }

      Mail_Clients = (values,err) =>{

        const Heading =  
             values["Heading"] === undefined ? null : values["Heading"] ;
        const Contacts = 
             values['Contacts'] === undefined ? null : values['Contacts'] ;
       
         const Phone = 
           values['Phone'] === undefined ? null : values['Phone'] ;
           const Message = 
           values['Mail_Message'] === undefined ? null : values['Mail_Message'] ; 
        const Email = String(Contacts)
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
             
             axios.get(`https://ent-react.vercel.app/management/broadcast/`,
              {
               params: {
                  Heading,  Phone ,Message, Email
                 
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
              
              axios.get(`https://ent-react.vercel.app/management/save_contact/`,
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
            }
          }
        }

    componentDidMount(){
        this.Contact_List(this.props.token)
    }

    
    render(){
        const {contacts , loading , error } = this.state
        return(

            
            <>

              <TemporaryDrawer />

                    <div className="container">
                        <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                          <div className="base-card">

                        <table>
                                <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>

                                <th>Remove</th>
                                </tr>
                                {
                                contacts.map((i) =>(
                                    <tr>
                                <td>{i.ClientName}</td>
                                <td>{i.ClientEmail}</td>
                                <td>{i.ClientPhone}</td>
                                
                               
                                <td>
                                <p onClick={()=>{this.delete_contact(i.id)}}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </p>
                                </td>
                                </tr>
                                ))
                                }
                            
                            </table>

                        </div>
                    </div>

                      <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6  xl:col-span-6">
                            
                            <div className="">
                            <Form  onFinish={this.process_query}>
                                <Form.Item>
                                <h1 className="ant-form-text">Create Contact</h1>
                                </Form.Item>
                    
    
                                <Form.Item name ="Name">
                                
                                    <Input
                                    placeholder="Client Name"
                                     
                                    enterButton
                                    />
                                
                                </Form.Item>
                                <Form.Item name ='Email'> 
                                    <Input
                                    placeholder="Email"
                                    enterButton
                                    />
                                </Form.Item>
    
                                <Form.Item name ='Phone'> 
                                    <Input
                                    placeholder="Phone Number"
                                    enterButton
                                    />
                                </Form.Item>
                                
                       
                            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                                </Form.Item>
    
                    </Form>
                        
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
                      <Option value={c.id} label={c.ClientEmail}>
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
                      <Option value={c.id} label={c.ClientPhone}>
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
                

            </>

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
)(Contact_Field);