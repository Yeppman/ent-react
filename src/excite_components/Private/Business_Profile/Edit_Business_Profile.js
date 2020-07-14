import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 

import {Input ,Select, Form, Button ,notification} from 'antd';

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


class Business_Profile_Edit extends Component{
    
  state ={
    Business_Picture : '',
  }

  handleImageChange = (e) => {
    this.setState({
        Business_Picture: e.target.files[0]
    })
  };
    process_query = (values,err) =>{
      
        
         const Business_Name =  
              values["Business_Name"] === undefined ? null : values["Business_Name"] ;
              const Business_Email =  
              values["Business_Email"] === undefined ? null : values["Business_Email"] ;
          const Business_Address = 
              values['Business_Address'] === undefined ? null : values['Business_Address'] ;
          const Business_Phone = 
            values['Business_Phone'] === undefined ? null : values['Business_Phone'] ;  
          
        const Business_Website = 
            values['Business_Website'] === undefined ? null : values['Business_Website'] ; 
        const Business_Bio = 
            values['Business_Bio'] === undefined ? null : values['Business_Bio'] ;  
            const The_Business_Pic = this.state.Business_Picture
            //Assigns Form Data for POST request
            const fd  = new FormData()
            fd.append('Business_Picture', The_Business_Pic);
            fd.append('Business_Name', Business_Name);
            
            fd.append('Business_Website', Business_Website);
            fd.append('Business_Email', Business_Email);
            fd.append('Business_Phone', Business_Phone);
            fd.append('Business_Address', Business_Address);
            fd.append('Business_Bio', Business_Bio);


            if(!err){

              axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
              axios.defaults.xsrfCookieName = "csrftoken";
              axios.post(`https://backend-entr.herokuapp.com/stream/edit_business_profile/`,fd, {
                headers : {
                  "Content-Type": "multitype/form-data",
                  Authorization: `Token ${this.props.token}`
                }
              }).then(res =>{
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
          const {Business_Picture} = this.state
        return(
           
            <>
 
          <TemporaryDrawer />

              <div className="container">
                <div className="grid grid-cols-2 ">
              
                  <div className="col-span-2 sm:col-span-2 md:col-span-2
                                  lg:col-span-2
                                   xl:col-span-2 ">
                      
                <Form  {...formItemLayout} onFinish={this.process_query}>
            <Form.Item>
              <h1
              style={{fontSize:23}}
               className="ant-form-text">Edit Business Profile</h1>
            </Form.Item>

            

            <Form.Item name ="Business_Name">
            
                <Input
                  placeholder="Your Business Name"
                  
                  enterButton
                />
              
            </Form.Item>

            <Form.Item name ="Business_Email">
            
                <Input
                  placeholder="Your Business Email"
                  
                  enterButton
                />
              
            </Form.Item>
            <Form.Item name ='Business_Address'> 
            
                <Input
                  placeholder="Address"
                  enterButton
                />
              
            </Form.Item>

            <Form.Item name ='Business_Phone'> 
            
                <Input
                  placeholder="Phone Number"
                  
                  enterButton
                />
              
            </Form.Item>
            
            <Form.Item name ='Business_Website'> 
            
                <Input
                  placeholder="Company`s website ?"
                  
                  enterButton
                />
              
            </Form.Item>


        <Form.Item 
         name="Business_Bio">
        <TextArea 
        placeholder = 'Tell us about your company'
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
          name="Business_Image">

          <Input  type="file"
          value = {Business_Picture}
          onChange={this.handleImageChange} 
          name="Post_Image1" />
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
      token: state.auth.token ,
      

    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(Business_Profile_Edit);