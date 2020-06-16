import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import {Row, Statistic,Col ,Calendar , List, Avatar ,Rate,Input ,
     Spin ,Card , Form, Button ,Select, notification } from 'antd';

import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined , ArrowUpOutlined, ArrowDownOutlined,
     EditOutlined, EllipsisOutlined, SettingOutlined ,FolderOpenOutlined } from '@ant-design/icons'
import {Bar} from 'react-chartjs-2';

import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'
import { faTrash, faMailBulk,faBoxOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const {Meta} = Card
const Search = Input.Search;
const { Option } = Select; 
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
        await axios.get('https://theebs.pythonanywhere.com/management/contact_list/')
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
        await axios.get(`https://theebs.pythonanywhere.com/management/delete_contact/${id}/`)
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
              
              axios.get(`https://theebs.pythonanywhere.com/management/save_contact/`,
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
            <div className="grid grid-cols-6">
            
                    <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                          <div className="base-card">

                        <table>
                                <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th> Address </th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Message</th>
                                <th>Remove</th>
                                </tr>
                                {
                                contacts.map((i) =>(
                                    <tr>
                                <td>{i.ClientName}</td>
                                <td>{i.ClientEmail}</td>
                                <td>{i.ClientPhone}</td>
                                <td>{i.ClientAdress}</td>
                                <td> {i.City}</td>
                                <td>{i.Country} </td>
                                <td> 
                                <Link to={`/message_contact/${i.id}`}>
                                
                                  <FontAwesomeIcon icon={faMailBulk} />
                                </Link>
                                </td>
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

            </div>
              </div>

                    <div className="container">
                      <div className="grid grid-cols-6 gap-3">
                      <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-2  xl:col-span-2">
                            
                            <div className="base-card">
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
                                
                                
                                <Form.Item name ='Address'>                           
                                <Input
                                placeholder="Address"
                                enterButton
                                />
                            
                            </Form.Item>
    
                        
    
                            <Form.Item name = "City">
                                    <Select placeholder ="select a location">
                                    <Option value="Sport">Lagos</Option>
                                    <Option value="Sport">Calabar</Option>
                                    <Option value="Sport">Uyo</Option>
                                    </Select>
                            </Form.Item>
                            
                            <Form.Item name ='Country'> 
                                
                                <Input
                                placeholder="Country"
                                
                                enterButton
                                />
                            
                            </Form.Item>
    
                            <Form.Item name ='Code'> 
                                
                                <Input
                                placeholder="Postal Code"
                                
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