import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import {Input , Form, Button ,Select, notification } from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

const { TextArea } = Input;

class newContact extends Component{

    state = {
        Contact: [] ,
        loading : true,
        err : null ,
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
                 if(res.status == 200 || res.status == 201){
                  console.log(res.data)
                  const take_response = res.data['Message']
                 
                  this.openNotification(take_response) 
                  window.location.replace('/contacts/')
                 }           
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
            
            }
          }
        }

    componentDidMount(){
        
    }

    

    render(){

            const {Contact, loading} = this.state
        return(
                <>
                <TemporaryDrawer />

            <div className="main">
                  <div className="container mx-auto my-auto py-4">
                          <div className="grid grid-cols-6">
                              
                          

                          <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-4  xl:col-span-4">
                                
                                <div className="login-section">
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
                                    <button
                            
                                    class="login-button"
                                  htmlType="submit">
                                    Send
                                  </button>
                                    </Form.Item>

                        </Form>
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
      token: state.auth.token
    };
  };
  
   
export default connect(
mapStateToProps,
null
)(newContact);