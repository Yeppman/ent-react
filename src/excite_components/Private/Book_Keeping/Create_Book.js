import React, { Component } from 'react'
import { connect } from "react-redux";
import {Input, Form, Button ,Select ,notification , Modal} from 'antd';
import {PlusCircleOutlined} from '@ant-design/icons'
 
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




const host = 'http://127.0.0.1:8000'
const endpoint = host + '/management/bk-create/';

class New_Book extends Component {
    state={
        modal2Visible:false
    }
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
      }
    

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
                        <div className="grid-cols-4">
                            <div className="col-span-4 sm:col-span-4 md:col-span-4
                     xl:col-span-4 lg:col-span-4">

                       
                              <Form  
                               onFinish={this.handleSubmit}>
        
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
                        </div>
                </div>
                </Modal>
            
              
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
  