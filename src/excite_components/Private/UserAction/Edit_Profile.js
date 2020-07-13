import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 

import {Input ,Select , Form, Button ,notification} from 'antd';
import TemporaryDrawer from '../Sidebar/SideNav'


const Search = Input.Search;
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


class Profile_Edit extends Component{
    
  state ={
    Profile_Image : '',
  }

  handleImageChange = (e) => {
    this.setState({
      Profile_Image: e.target.files[0]
    })
  };
    process_query = (values,err) =>{
      
        
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

          const City = 
            values['City'] === undefined ? null : values['City']
          const Country = 
            values['Country'] === undefined ? null : values['Country'] 
          const Role = 
            values['Role'] === undefined ? null : values['Role']
      
           
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
            fd.append('City', City);
            fd.append('Country', Country);
            fd.append('Role', Role)


            if(!err){

              axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
              axios.defaults.xsrfCookieName = "csrftoken";
              axios.post(`https://backend-entr.herokuapp.com/stream/edit_profile/`,fd, {
                headers : {
                  "Content-Type": "multitype/form-data",
                  Authorization: `Token ${this.props.token}`
                }
              }).then(res =>{
                this.props.history.push('/profile')
                openNotification('Profile edited successfully')             
            }).catch(e =>{
              openNotification(e)
                  })

            }
            
           
        }
         //process query contents ends here
        
        upload_img  =(e)=>{
          const grab = e.target.files[0]
          alert(grab)
          this.setState({
            pic : grab
          }) 

          
        }

        componentDidMount(){

        }
        componentWillReceiveProps(newProps) {
            if (newProps.token !== this.props.token) {
              if (newProps.token !== undefined && newProps.token !== null) {
                
              }
            }
          }
    

    render(){
        const formItemLayout = {
            wrapperCol: { span: 12, offset: 6 }
          };
          const {Profile_Image} = this.state
        return(
           
            <>
            <TemporaryDrawer />
              <div className="container">
                <div className="grid grid-cols-2">
              
                  <div className="col-span-2 sm:col-span-2 md:col-span-2
                                  lg:col-span-2
                                   xl:col-span-2 ">
                     
                        <Form  {...formItemLayout} onFinish={this.process_query}>
                    <Form.Item>
                      <h1 
                       style={{fontSize:23}}
                      className="ant-form-text">Edit Profile</h1>
                    </Form.Item>

                    

                    <Form.Item name ="First_Name">
                    
                        <Input
                          placeholder="First Name"
                          
                          enterButton
                        />
                      
                    </Form.Item>

                    <Form.Item name ="Last_Name">
                    
                        <Input
                          placeholder="Last Name"
                          
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
                    
                    <Form.Item name ='Role'> 
                    
                        <Input
                          placeholder="Your Job Type"
                          
                          enterButton
                        />
                      
                    </Form.Item>

                    <Form.Item name ='Address'> 
                    
                    <Input
                      placeholder="Address"
                      
                      enterButton
                    />
                  
                </Form.Item>

                <Form.Item 
                name="Bio">
                <TextArea 
                placeholder = 'Tell us about Yourself'
                rules={[{ required: true }]}
                rows={4} />
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

                <Form.Item 
                    rules={[{ required: true }]}
                  name="Post_Image1">

                  <Input  type="file"
                  value = {Profile_Image}
                  onChange={this.handleImageChange} 
                  name="Post_Image1" />
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
            </>

         

        )
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      

    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(Profile_Edit);