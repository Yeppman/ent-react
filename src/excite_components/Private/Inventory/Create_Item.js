import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 

import {Input ,Select,  Form, Button ,notification, Slider, Modal} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'

class Create_Inventory extends React.Component{

  state ={
    post_list:[],
    modal2Visible: false,
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
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
   await axios.get(`https://backend-entr.herokuapp.com/stream/view_post`)
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
            const host = "https://backend-entr.herokuapp.com"
           const endpoint = host + '/management/create_inventory/'
            axios.get(endpoint,
             {
              params: {
                Name, Quantity  ,Price
              }
            }).then(res =>{
                if(res.status == 200){
                  
                this.openNotification(res.data['Message'])   
                } else{
                  this.openNotification('Error Creating Item')
                }    
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
         
              <div className="main">
              <div
               style={{paddingBottom:10}}
              >
                
                    <p 
                  className
                  type="primary" onClick={() => this.setModal2Visible(true)}>
                         <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    /> 
                         </p>
   
                         <Modal
                 centered
                 visible={this.state.modal2Visible}
                 onOk={() => this.setModal2Visible(false)}
                 onCancel={() => this.setModal2Visible(false)}
                 >
   
                 <div className="container">
                   
                   <div className="grid grid-cols-4">
                   
                     <div className="
                     col-span-4 sm:col-span-4 md:col-span-4  lg:col-span-4 xl:col-span-4 ">
                             <Form  onFinish={this.process_query}>
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
                           <button class="login-button" type="primary" htmlType="submit">
                             Submit
                           </button>
                         </Form.Item>
   
                             </Form>
   
                           </div>
                           </div>
                         </div> 
                 </Modal>
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