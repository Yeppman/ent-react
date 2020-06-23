import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 

import {Input ,Select, Spin ,Card , Form, Button ,notification, Slider} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined , ArrowUpOutlined, ArrowDownOutlined,
     EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons'
import TemporaryDrawer from '../Sidebar/SideNav'
 
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

class Create_Inventory extends React.Component{

  state ={
    post_list:[],
  }

  openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  Get_User_Post = async(token)=>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
   await axios.get(`http://back-ent.herokuapp.com/stream/view_post`)
    .then(res =>{
            this.setState({
                  post_list:res.data
            })
        })
    }

    
    process_query = (values,err) =>{
      
      
      const Name =  
            values["Name"] === undefined ? null : values["Name"] ;
      const Quantity =  
            values["Quantity"] === undefined ? null : values["Quantity"] ;
      const Price =  
            values["Price"] === undefined ? null : values["Price"] ;
      
          this.setState({
            loading: true
          })
    
          if(!err){
           
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${this.props.token}`
            };
            const host = "http://back-ent.herokuapp.com"
           const endpoint = host + '/management/create_inventory/'
            axios.get(endpoint,
             {
              params: {
                Name, Quantity  ,Price
              }
            }).then(res =>{
                this.props.history.push('/inventories/')
                this.openNotification(res.data['Message'])         
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
            this.Get_User_Post(newProps.token)
          }
        }
      }

      componentDidMount(){
        this.Get_User_Post(this.props.token)
      }

    render(){
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 6 }
      };
      const {post_list} = this.state
        return(

            <>
                  <TemporaryDrawer/>

      <div className="container">
        
        <div className="grid grid-cols-2">
        
          <div className="
          col-span-2 sm:col-span-2 md:col-span-2
                            lg:col-span-2
                            xl:col-span-2
          ">
          <Form  {...formItemLayout} onFinish={this.process_query}>
      <Form.Item>
        <h1
          style={{fontSize:23}}
        className="ant-form-text">Create a new item</h1>
      </Form.Item>

      

      <Form.Item 
      rules={[{ required: true }]}
      name ="Name">

          <Input
            placeholder="Name of Product"
            
            enterButton
          />
        
      </Form.Item>


      <Form.Item  
      rules={[{ required: true }]}
      name = 'Quantity'>
      <Slider placeholder = 'Quantiy-range' 
      defaultValue={1} tooltipVisible />
      </Form.Item>

      <Form.Item 
      rules={[{ required: true }]}
      name ="Price">

          <Input
            placeholder="Price of Item"
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
  )(Create_Inventory);