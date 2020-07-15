import React , {Component,  createElement, useState } from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import { Form, Input, InputNumber, Button, Select,Modal, notification , Slider, message} from 'antd';

import Nav from '../../containers/nav'
import Paystacker from './Paystack'
//import orderTable from './Table'
import BillingInformation from './billingForm'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
 

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

        orderId:0,

        cartLength : 0,
        loading : true, 
        error : null ,

        isPaid : false ,
        modal2Visible: false,
        Selected : false, 
    }


     //Control Modal
     setModal2Visible(modal2Visible) {
      this.setState({ modal2Visible });
    }
    

    proceedPayment = async()=>{
      this.setModal2Visible(true)
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


    getOrder = async(token)=>{
      const endpoint = host + `/retail/customer-orders/`
      
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        
      await axios.get(endpoint)
      .then(res=>{
          if (res.status ==  200){
              this.setState({
                  
                  orderId : res.data[0].id,
                  
              })
              console.log('the order', res.data)
          }else{  
            //  message.error('') 
          }
      })
  }

    //Ends here
    removeItem = async (id) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      console.log()
     
        await axios.get(`https://backend-entr.herokuapp.com/retail/remove-item/${id}/`)
        .then(res =>{
          if (res.status == 200){
            this.openNotification(res.data['Message'])
          }else{

          }
        })
    
    }
    
    

    promptOrder = async()=>{
      this.setState({
        isPaid : true,
      })
    }

    componentDidMount = () =>{
        
        if (this.props.token !== undefined && this.props.token !== null) {
            this.getCart(this.props.token)  
            this.getOrder(this.props.token)  
            this.userEmail(this.props.token)
         }    
   };

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
             this.getCart(newProps.token)
             this.getOrder(newProps.token)
             this.userEmail(newProps.token)
          }
        }
      }

      
      render(){
          const {cartData , isPaid , Selected , email} = this.state
          const {orderId} = this.state.orderId
          const billingEndpoint = `/chechout/${orderId}/`
          

          let indexNumber = 0
          return(
              <>
                <Nav />


              
                <div className="fitter">
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

                                          <td >
                                            <p >
                                            
                                                              <FontAwesomeIcon 
                                      onClick={()=>{this.removeItem(c.id)}}
                                      icon={faTrash} />
                                            </p>

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
          

  
                    <div className="fitter">
                      <div className="left">
                                     {
                                       isPaid ?(
                                          <BillingInformation />
                                       ):(  
                                          <>
                                          <p>

                                          </p>
                                          </>
                                       )
                                     }
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
                  redirect_billing ={billingEndpoint}
                  changePay={this.promptOrder} 
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
   