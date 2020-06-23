import React, { Component } from 'react';
import axios from 'axios'
import {notification} from 'antd'
//import the library
import PaystackButton from 'react-paystack';

const Payment_Upgrade_Url = 'http://back-ent.herokuapp.com/stream/process_plan_upgrade/'
class Paystacker extends Component {

    state = {
        key: "pk_test_96deeb613ab8f21138a6d59a1740cb3a3a1bacff", //PAYSTACK PUBLIC KEY
        email: "foobar@example.com",  // customer email
        amount: this.props.pricing * 100 ,//equals NGN100,multiply by 100 to get actual price
        the_membership : this.props.Membership,
        the_membership_id : this.props.Membership_id

    }

    openNotification = (msg) => {
      notification.open({
        message: 'Notification Title',
        description:msg,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }
    
    callback = async (response) => {
        console.log(response)
        console.log(this.state.the_membership); // card charged successfully, get reference here
        const Paid_Membership = this.state.the_membership
        const Membership_Query_id = this.state.the_membership_id
       await axios.get(Payment_Upgrade_Url,{
          params:{
            Paid_Membership ,Membership_Query_id
          }
        })
        .then(res =>{
          this.openNotification(res.data['Message'])
        })
        .then(res =>{
          console.log('Paid for ')
        })
    }

    close = () => {
        console.log("Payment closed");
    }

    getReference = () => {
        //you can put any unique reference implementation code here
        let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-.=";

        for( let i=0; i < 15; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    componentDidMount(){
      console.log('this is the price to be paid',this.props.pricing );
      
    }

  render() {
    return (
      <div>
        <p>
          <PaystackButton
            text="Make Payment"
            class="payButton"
            callback={this.callback}
            close={this.close}
            disabled={true} 
               embed={true} 
            reference={this.getReference()}
            email={this.state.email}
            amount={this.state.amount}
            paystackkey={this.state.key}
            tag="button"
          />
        </p>
      </div>
    );
  }
}

export default Paystacker;