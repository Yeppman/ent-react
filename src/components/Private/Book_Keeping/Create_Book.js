import React, { Component } from 'react'
import { connect } from "react-redux";
import {Input, Form, Button ,Select ,notification} from 'antd';

import TemporaryDrawer from '../Sidebar/SideNav'
import axios from "axios";

const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }


const host = 'back-ent.herokuapp.com/'
const endpoint = host + 'bk-create';

class New_Book extends Component {

    handleSubmit = async(values)=>{
        const item_name = values['item_name']
        const item_price = values['item_price']
        const item_quantity = values['item_quantity']

        let formData = new FormData();
        formData.append('item_name', item_name);
        formData.append('item_price', item_price);
        formData.append('item_quantity', item_quantity);

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        axios.post(endpoint, formData)
        .then(res => {
            if (res.status == 200){
                console.log(res.data);
            // this.props.history.push("/products")
                openNotification(res.data['Message'])
            }else{
                openNotification('Task Failed')
            }
        })
        .catch(err => {
            console.log(err)
        })
        }
    

    render() {
        return (
            <div>
                
            
                <Form  onFinish={this.handleSubmit}>
        
                     <Form.Item rules={[{ required: true }]}  name ="item_name">
                                <Input placeholder="Name" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]}  name ="item_price">
                                <Input placeholder="Price" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]}  name ="item_quantity">
                                <Input placeholder="Quantity" enterButton id='slug'/>
                     </Form.Item>

                      <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
               </Form>
            </div>
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
  )(New_Book);
  