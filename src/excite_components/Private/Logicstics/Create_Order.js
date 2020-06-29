import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 
import Pusher from 'pusher-js';
 
import TemporaryDrawer from '../Sidebar/SideNav'
import {Row, Statistic,Col , List, Avatar ,Rate,Input ,
  Select, Spin ,Card ,notification, Form, Button ,} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined , ArrowUpOutlined, ArrowDownOutlined,
     EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'

 
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Search = Input.Search;
const { Option } = Select; 

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

class Create_New_Order extends React.Component{

  state ={
    post_list:[],
  }
  Get_Post = async(token)=>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
   await axios.get(`http://127.0.0.1:8000/stream/view_post`)
    .then(res =>{
            this.setState({
                  post_list:res.data
            })
        })
    }

    test_ws(){
      var pusher = new Pusher('8b827980b6cb1e62195c', {
        cluster: 'eu'
      });
      
      var channel = pusher.subscribe('my-channel');
      channel.bind('my-event', function(data) {
        alert(JSON.stringify(data));
        console.log(JSON.stringify(data))
      });
      console.log('tryiing...')
     
    }


    process_query = (values,err) =>{
      
      const Post =  
          values["Post"] === undefined ? null : values["Post"] ;
       const name =  
            values["Name"] === undefined ? null : values["Name"] ;
        const email = 
            values['Email'] === undefined ? null : values['Email'] ;
        const phone = 
          values['Phone'] === undefined ? null : values['Phone'] ;
        const phone2 = 
          values['Phone2'] === undefined ? null : values['Phone2'] ;
        const address = 
          values['Address'] === undefined ? null : values['Address'] ;
        const address2 = 
          values['Address2'] === undefined ? null : values['Address2'] ;
        const city = 
          values['Country'] === undefined ? null : values['Country']
        const country = 
          values['Country'] === undefined ? null : values['Country'] 
        const code = 
          values['Code'] === undefined ? null : values['Code']
    
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
            console.log(
             name, email ,  phone, phone2 ,address, address2
                ,city ,country, code,  
            
            )
            axios.get(`http://127.0.0.1:8000/management/create_channel/`,
             {
              params: {
                Post, name, email ,  phone, phone2 ,address, address2
                ,city ,country, code, 
              }
            }).then(res =>{
                openNotification(res.data['Message'])            
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
            this.Get_Post(newProps.token)
          }
        }
      }
      componentDidMount(){
        this.Get_Post(this.props.token)
      }

    render(){
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 6 }
      };
      const {post_list} = this.state
        return(

            <>
                 <TemporaryDrawer />

                <div className="container">
                  
                  <div className="grid grid-cols-2">

                      <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                      <Form  {...formItemLayout} onFinish={this.process_query}>
                <Form.Item>
                  <h1 className="ant-form-text">Create Order</h1>
                </Form.Item>

                <Form.Item name ='post' hasFeedback>

                <Select placeholder="Select The Post ">
                {
                    post_list.map((p)=>(
                        <Option value={p.id}>{p.GigTitle}</Option>
                    ))
                }
                
                  </Select>

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

                <Form.Item name ='Phone2'> 

                    <Input
                      placeholder="Phone Number (Optional)"
                      
                      enterButton
                    />
                  
                </Form.Item>

                <Form.Item name ='Address'> 

                <Input
                  placeholder="Address"
                  
                  enterButton
                />

                </Form.Item>

                <Form.Item name ='Adress2'> 

                <Input
                  placeholder="Second Address  (Optional)"
                  
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
  )(Create_New_Order);