import React , {Component} from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { Form, Input, InputNumber, Button, Select,Modal, notification , Slider, message} from 'antd';
import Nav from '../../containers/nav'
import Paystacker from './Paystack'

 
const Search = Input.Search;
const { Option } = Select;
const {TextArea} = Input

const formItemLayout = {
  wrapperCol: { span: 12, offset:0 }
};



const host = 'https://backend-entr.herokuapp.com'
const Request_Order_url = host + '/management/new_order/'

  
const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}


class CartList extends Component{
    state = {

      email : '' ,
        cartData : [],
        cartID : 0,
        cartLength : 0,
        loading : true, 
        error : null ,

        isPaid : false ,
        modal2Visible: false,
        Selected : false, 
    }


     //Control Modal
     setModal2Visible() {
      this.setState({
         modal2Visible : true
         });
    }

    proceedPayment = async()=>{
      this.setModal2Visible()
      this.setState({
        Selected : true
        });
    }

    userEmail = async(token)=>{
      const userData_endpoint = host + '/stream/get_my_user_id_and_email/'
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
      };
      await axios.get(userData_endpoint)
      .then(res =>{
          const the_id = res.data
          this.setState({
        // user_id: res.data.userID,
        email : res.data.Email,
          })
          console.log('User Email', res.data.Email)
      })
  }

    AuthRequired (){
        message.error('You need to login to submit a review')
      }     
      
    getCart = async(token)=>{
        const endpoint = host + `/retail/cart-list/`
        
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
          
        await axios.get(endpoint)
        .then(res=>{
            if (res.status ==  200){
                this.setState({
                    cartData : res.data ,
                    cartID : res.data['id'],
                    cartLength : res.data.length
                })
                console.log(res.data)
            }else{  
              //  message.error('') 
            }
        })
    }

    // Order Query
    create_order = async( values) =>{
    
      const cartOrderID = this.state.cartID

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

    //Ends here


    componentDidMount = () =>{
        
        if (this.props.token !== undefined && this.props.token !== null) {
            this.getCart(this.props.token)  
         }    
   };

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
             this.getCart(newProps.token)
          }
        }
      }

      
      render(){
          const {cartData , isPaid , Selected , email} = this.state
          
          let indexNumber = 0
          return(
              <>
                <Nav />
                <div className="container">
                    <div className="grid grid-cols-6">
                        <div className="col-span-3">
                        <table>
                                     <tr>
                                     <th>
                                       S/N
                                     </th>
                                     <th>Item</th>
                                    
                                     <th>Quantity</th>
                                     <th>Remove</th>
                                    
                                     
                                     </tr>
                                    
                                     {
                                       
                                       cartData.map((c)=>(
                                         <>
                                         <tr>
                                              <td>{indexNumber++}</td>
                                          <td>
                                            {c.Item}
                                            </td>
                                          
                                          <td>
                                          <div className="">
                                                  <InputNumber min={1} max={100}
                                                    defaultValue={c.Quantity}  
                                                      
                                                  />
                                                  </div>
                                          </td>

                                          <td>
                                            X
                                          </td>
                                         </tr>
                                         </>
                                       ))
                                       
                                     }
                                    
                                     
                                     
                       </table>

                         </div>


                        <div className="col-span-3">
                                     
                        <div className="">
                                    <button 
                                    onClick={this.proceedPayment}
                                     className="login-button">
                                      Pay 
                                    </button>
                                  </div>
                           
                        </div>

                        </div>
                    </div>
          

                                      <div className="container">
                                      <div className="grid grid-cols-8">
                      <div className="col-span-2">
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

                  
              <div className="container">
              {
                Selected ?(
                  <Modal
              centered
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
              >
                  <div className="grid grid-cols-4">
                    <div className="col-span-4">
                    <Paystacker 
                  pricing = {100}
                  Email = {this.state.email}
                   />
                    </div>
                  </div>
                  </Modal>
                ) : (
                 <div className="grid grid-cols-4">
                 <p>
                  
                  </p>
                 </div>
                )
              }
              </div>


              </>
          )
      }



      
}



const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
     
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(CartList);
   