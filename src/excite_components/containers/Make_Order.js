import React , { createElement, useState } from "react";
import { connect } from "react-redux";
import Pusher from 'pusher-js';
import async from 'q'
import axios from "axios";
import { Form, Input, InputNumber, Button, Select,Modal, notification , Slider, message} from 'antd';


const formItemLayout = {
  wrapperCol: { span: 12, offset:0 }
};
const { Option } = Select; 
const {TextArea} = Input
 

const host = 'https://backend-entr.herokuapp.com'
const Request_Order_url = host + '/management/new_order/'

class Make_Order_Form extends React.Component{
   
  state ={
    Authenticated: false,

     modal2Visible: false,
     BuyerID:null ,
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
    
   // var channel = pusher.subscribe('quotation-event');
  //  channel.bind('quote_notify', function(data) {
   //   alert(JSON.stringify(data));
   //   console.log(JSON.stringify(data))
   // });
   // console.log('tryiing...')
   
  }

  create_order = async( values) =>{
    
    const Post_id = this.props.post_id
    const Vendor_Email = this.props.share_vendor_email
    const Post_Owner = this.props.vendor_id
    const Buyer_id = this.state.BuyerID
    const item_class = this.props.item_class
    const item_name = this.props.item_name

    console.log('this is the post id for quotes', Post_id,Vendor_Email )
    
 
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
        params:{  Post_id,item_class, Buyer_id,
                  Post_Owner, Name ,item_name,
                 Email, Note,  Phone,
                  Vendor_Email, Quantity ,Address1,Address2, 
                Country,State, Postal }
      })
      .then(res =>{
          if (res.status == 200){
            const response = res.data['Message']
          console.log(response)
          this.openNotification(response)
          } else{
            message.error('Comment Failed')
          }
      })
  }
 
  componentDidMount(){
   if (this.props.isAuth){
        this.user_id(this.props.token)
    } 
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
          this.user_id(newProps.token)
      }
    }
  }

    parse_auth = false
    user_id = async(token)=>{
      const endpoint = host + '/stream/get_my_user_id_and_email/'
      console.log(host);
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
          Authorization: `Token ${token}`
          }
      await axios.get(endpoint)
      .then(res=>{
        const id = res.data.userID
        this.setState({
          BuyerID: res.data.userID
        })
        this.parse_auth = true
      })
    }

    RaiseAuthError(){
      message.error('You need to login to make order')
    }

    render(){

      const checkauth = this.parse_auth
      console.log('User is Auth' , checkauth)

        return(
                       
              <>
                {
                  this.props.isAuth ?(
                    <>
                    <button 
               className="post-order-button"
               type="primary" onClick={() => this.setModal2Visible(true)}>
                        Order
                      </button>
              <Modal
              centered
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
              >
              <div className="grid grid-cols-4">

                    <div className="col-span-4 sm:col-span-4 md:col-span-4
                    xl:col-span-4 lg:col-span-4">
                      
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
                <Option value="Lagos">Lagos</Option>
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
              </Modal>
                    </>
                  ):(
                    <button 
               className="post-quote-button"
               type="primary" 
               onClick={this.RaiseAuthError}
               >
                        Order
                      </button>

                  )
                }
              </>
        )
    }

}

const mapStateToProps = state => {
  return {
    token: state.auth.token ,
    isAuth: state.auth.token !== null ,
  };
};

export default connect(
  mapStateToProps,
  null
)(Make_Order_Form)