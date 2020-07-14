
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
const host = 'https://backend-entr.herokuapp.com'


  
  const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

class MalingParty extends Component{
    
    state = {
        contacts :[],
        loading : false
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


    Mail_Clients = (values,err) =>{

        let Email = []
        const EmailsList= this.state.contacts['ClientPhone']


        this.state.contacts.map((c)=>{
            var a = {
                email: c['ClientEmail'] ,
            }
            
        
            Email.push(a)
           
        })

        
        const Heading =  
             values["Heading"] === undefined ? null : values["Heading"] ;
        const Contacts = 
             values['Contacts'] === undefined ? null : values['Contacts'] ;
       
       //.  const Phone_Number = 
         //  values['Phone'] === undefined ? null : values['Phone'] ;
           const Message = 
           values['Mail_Message'] === undefined ? null : values['Mail_Message'] ; 
     //   const Email = String(Contacts)
        
        console.log(Email)
     
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
                  Heading ,Message, Email
                 
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
   

   
 

    // Recieve Incoming token
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Contact_List(newProps.token)
            this.Mail_Clients(newProps.token)
          }
        }
      }

  componentDidMount(){
    
    if (this.props.token !== undefined && this.props.token !== null) {
      this.Contact_List(this.props.token)
      this.Mail_Clients(this.props.token)
    }

      
  }

    render(){
        return(
            <>

            <TemporaryDrawer />

            <div className="main">
                  <div className="container">
                        <div className="grid grid-cols-10">
                        <div className="login-section col-span-4
                        sm:col-span-4 md:col-span-4 lg:col-span-4 xl:col-span-4">

                        <h4 
                        style={{fontSize:20}}
                        className="text-center">
                        Send Mail
                        </h4>

                        <Form 
                        onFinish={this.Mail_Clients}>


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
)(MalingParty);