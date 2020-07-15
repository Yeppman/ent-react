import React ,{Component} from 'react'
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { Form, Input, InputNumber, Button, Select,Modal, notification , Slider, message} from 'antd';


const host = 'https://backend-entr.herokuapp.com'
const Request_Order_url = host + '/management/new_order/'


const Search = Input.Search;
const { Option } = Select;
const {TextArea} = Input

const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

class BillingInformation extends Component{
    state = {

    }

    
    // Order Query
    create_order = async( values) =>{
        
        const cartID =  this.props.match.params.orderID
        const buyerID = this.props.match.params.BuyerID
        const vendorID = this.props.match.params.VendorID


        
      //  const cartOrderID = this.state.cartID
      const cartOrderID = cartID
        //const Post_id = this.props.post_id
        const Vendor_Email = this.props.share_vendor_email
        const Post_Owner = this.props.vendor_id
        const Buyer_id = this.state.BuyerID
        const item_class = this.props.item_class
        const item_name = this.props.item_name
    
        console.log('this is the post id for quotes', Vendor_Email )
        
     
        const Quantity =  
            values["Quantity"] === undefined ? null : values["Quantity"] ;
        const Name =  
            values["Name"] === undefined ? null : values["Name"] ;
        const Email = 
            values['Email'] === undefined ? null : values['Email'] ;
       const Note = 
            values['Note'] === undefined ? null : values['Note'] ;
        const Phone = 
          values['Phone'] === undefined ? null : values['Phone'] ;
        const Address1 = 
          values['Address1'] === undefined ? null : values['Address1'] ;
         const Address2 = 
          values['Address2'] === undefined ? null : values['Address2'] ;
        const Postal = 
          values['Postal'] === undefined ? null : values['Postal'] ;
        const State = 
          values['State'] === undefined ? null : values['State'] ;
        const Country = 
          values['Country'] === undefined ? null : values['Country'] ;
          
          axios.defaults.headers = {
            "Content-Type": "application/json",
              Authorization: `Token ${this.props.token}`
              };
          await axios.get(Request_Order_url, {
            params:{  
              cartOrderID,
              item_class, Buyer_id,
                      Post_Owner, Name ,item_name,
                     Email, Note,  Phone,
                      Vendor_Email, Quantity ,Address1,Address2, 
                    Country,State, Postal }
          })
          .then(res =>{
              if (res.status == 200){
                const response = res.data['Message']
              console.log(response)
              openNotification(response)
              } 
              else if(res.status == 401){
                message.error('Login to create order')
              }
              else{
                message.error('Order Failed')
              }
          })
      }

      render(){
        return(
            <>

                
<div className="container">
                                      <div className="grid grid-cols-8">
                      <div className="col-span-4">
                      <Form onFinish={this.create_order}>
              <Form.Item>
              <h1 
              style={{fontSize:19}}
              className>Create Order</h1>
              </Form.Item>



              <Form.Item
               rules={[{ required: true, message:'Full Name is required' }]}
               name ="Name">

                <Input
                  placeholder="Full Name" 
                  enterButton
                />

              </Form.Item>
              <Form.Item 
               rules={[{ required: true, message:'Email Address is required' }]}
              name ='Email'> 

                <Input
                  placeholder="Email"
                  enterButton
                />

              </Form.Item>

              <Form.Item
               rules={[{ required: true, message:'Select  Quantity' }]}
               name ="Quantity">
              <Slider defaultValue={1} tooltipVisible />
              </Form.Item>

              <Form.Item
               rules={[{ required: true, message:'Phone Number is required' }]}
               name ='Phone'> 

                <Input
                  placeholder="Phone"
                  enterButton
                />

              </Form.Item>
                  
              <Form.Item 
              
              rules={[{ required: true, message:'Address is required' }]}
              name ='Address1'> 

                <Input
                  placeholder="Address"
                  enterButton
                />

                </Form.Item>

                <Form.Item 
                 
                name ='Address2'> 

                <Input
                  placeholder="Second Address (Optional)"
                  enterButton
                />

                </Form.Item>


                
                <Form.Item
                 
                 name ='Postal'> 

                <Input
                  placeholder="Postal Code"
                  enterButton
                />

                </Form.Item>

                <Form.Item 
                 rules={[{ required: true, message:'State is required' }]}
                name ='State'> 

                <Input
                  placeholder="State"
                  enterButton
                />

                </Form.Item>

                <Form.Item 
                 rules={[{ required: true, message:'Country is required' }]}
                name = "Country">
                <Select placeholder ="Select Country">
                <Option value="Lagos">Nigeria
                </Option> 
                <Option value="Calabar">Calabar</Option>
                <Option value="Uyo">Uyo</Option>
                </Select>
               </Form.Item>

              <Form.Item 
               rules={[{ required: true, message:'Note is required' }]}
               name="Note">
              
              <TextArea 
              placeholder ="Send us a short note of any extra info you'd like us 
                          to have"
              rows={4} />
              </Form.Item>

              

              <Form.Item >
              <button
              className="login-button"
               type="primary" htmlType="submit">
                Order 
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
  )(BillingInformation);