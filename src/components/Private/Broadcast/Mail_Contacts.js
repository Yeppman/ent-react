import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux";
import {Input , Form, Button ,Select, notification } from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'

const { TextArea } = Input;

class Message_Contact extends Component{

    state = {
        Contact: [] ,
        loading : true,
        err : null ,
    }

    contact_id = this.props.match.params.ContactID
    Contact_details = async(token) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(`http://127.0.0.1:8000/management/contact_detail/${this.contact_id}/`)
        .then(res =>{
            this.setState(
                {
                    Contact: res.data,
                    loading:  false
                }
            ) 
            console.log(this.state)
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

    process_query = (values,err) =>{

         const Heading =  
              values["Heading"] === undefined ? null : values["Heading"] ;
     //     const Email = 
       //       values['Email'] === undefined ? null : values['Email'] ;
     //     const Phone = 
       //     values['Phone'] === undefined ? null : values['Phone'] ;
            const Message = 
            values['Mail_Message'] === undefined ? null : values['Mail_Message'] ; 
         
      
            this.setState({
              loading: false
            });
      
           const Email =  this.state.Contact.ClientEmail
           const Phone = this.state.Contact.ClientPhone
            if(!err){
              axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
          axios.defaults.xsrfCookieName = "csrftoken";
              axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
              };
              
              axios.get(`http://127.0.0.1:8000/management/broadcast/`,
               {
                params: {
                   Heading, Email ,  Phone ,Message
                  
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
             this.Contact_details(newProps.token)
            }
          }
        }

    componentDidMount(){
        this.Contact_details(this.props.token)
    }

    

    render(){

            const {Contact, loading} = this.state
        return(
                <>
                <TemporaryDrawer />

                <div className="container mx-auto my-auto py-4">
                    <div className="grid grid-cols-4">
                        
                    <div className=" mx-auto my-auto col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                    <p>
                    Recipient Name : {Contact.ClientName}
                    </p>
                    <p>
                      Recipient Email : {Contact.ClientEmail}
                    </p>
                    <p>
                      Recipient Phone : {Contact.ClientPhone}
                    </p>
                    </div>

                    <div className="base-card col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                    <Form  onFinish={this.process_query}>
                            <Form.Item>
                            <h1 className="ant-form-text"> Message Contact</h1>
                            </Form.Item>
                

                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Heading">
                            
                                <Input
                                placeholder=" Heading"
                                
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
                           

                      
                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>

                </Form>

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
)(Message_Contact);