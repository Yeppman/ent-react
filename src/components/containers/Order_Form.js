import React , { createElement, useState } from "react";
import { connect } from "react-redux";
import Pusher from 'pusher-js';
import async from 'q'
import axios from "axios";
import { Form, Input, InputNumber, Button, Select,Modal, notification } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
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

const formItemLayout = {
  wrapperCol: { span: 12, offset:0 }
};
const { Option } = Select; 
const {TextArea} = Input

const Quotation_url = 'http://127.0.0.1:8000/core_api/quotation'

class Order_Form extends React.Component{
   
  state ={
   
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

  connect_quotaiton_ws = ()=>{
    var pusher = new Pusher('8b827980b6cb1e62195c', {
      cluster: 'eu'
    });
    
    var channel = pusher.subscribe('quotation-event');
    channel.bind('quote_notify', function(data) {
      alert(JSON.stringify(data));
      console.log(JSON.stringify(data))
    });
    console.log('tryiing...')
   
  }

  create_order = async( values) =>{
    
    const Post_id = this.props.post_id
    const Vendor_Email = this.props.vendor_email
    
    const Post_Owner = this.props.vendor_id
    console.log('this is the post id for quotes', Post_id)
    const name =  
        values["Name"] === undefined ? null : values["Name"] ;
    const email = 
        values['Email'] === undefined ? null : values['Email'] ;
   const note = 
        values['Note'] === undefined ? null : values['Note'] ;
    const phone = 
      values['Phone'] === undefined ? null : values['Phone'] ;
    
      axios.defaults.headers = {
        "Content-Type": "application/json",
          Authorization: `Token ${this.props.token}`
          };
      await axios.get(Quotation_url, {
        params:{  Post_id,Post_Owner, name , email, note,  phone, Vendor_Email  }
      })
      .then(res =>{
          const response = res.data['Message']
          this.openNotification(response)
      })
  }
 
  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
         
      }
    }
  }

  componentDidMount(){}

    render(){
        return(
                       
              <>
               <button 
               className="post-order-button"
               type="primary" onClick={() => this.setModal2Visible(true)}>
                        Quote
                      </button>
              <Modal
              title="Quotes Vendor"
              centered
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
              >
              <div className="">

              <Form  {...formItemLayout} onFinish={this.create_order}>
              <Form.Item>
              <h1 style={{fontSize:25}}>Quote Vendor</h1>
              </Form.Item>



              <Form.Item name ="Name">

                <Input
                  placeholder="Your Name" 
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
                  placeholder="Phone"
                  enterButton
                />

              </Form.Item>


              <Form.Item  name="Note">
              
              <TextArea 
              placeholder ="Send us a short note of any extra info you'd like us 
                          to have"
              rows={4} />
              </Form.Item>

              

              <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              </Form.Item>

                </Form>

              </div>
              </Modal>
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
)(Order_Form)