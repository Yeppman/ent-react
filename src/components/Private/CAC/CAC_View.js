import React, { Component } from 'react'
import { connect } from "react-redux";
import {Row, Col , List, Avatar ,Rate,Input , 
Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';
    

export default class BkCreation extends Component {

    handleSubmit = async(values)=>{
        const cac_name = values['cac_name']
        const cac_location = values['cac_location']
        const cac_logo = values['cac_logo']

        let formData = new FormData();
        formData.append('item_name', cac_name)
        formData.append('item_price', cac_location)
        formData.append('item_quantity', cac_logo)

        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
        }
        axios.post(postURL, formData)
            .then(res => {
            console.log(res.data);
               // this.props.history.push("/products")
            })
            .catch(err => console.log(err))
        };
    }

    render() {
        return (
            <div>
                <Form  onFinish={this.handleSubmit}>
        
                     <Form.Item rules={[{ required: true }]}  name ="cac_name">
                                <Input placeholder="Name" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]}  name ="cac_location">
                                <Input placeholder="Price" enterButton />
                     </Form.Item>

                     <Form.Item rules={[{ required: true }]} name="cac_logo">
                          <input  type="file" name="Logo"/>
                          {/* onChange={this.FileSelected1} */}
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
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       refreshCart: (token) => dispatch(fetchCart(token))
//     };
//   };

  
  export default connect(
    mapStateToProps,
    null
  )(CheckoutPage);
  