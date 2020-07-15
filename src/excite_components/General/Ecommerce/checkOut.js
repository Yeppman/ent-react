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

const cartID = this.props.match.params.cartID

class PayOut extends Component{
    state = {

    }



    render(){
        return(
            <>

                <div className="fitter">

                    <div className="left">

                            <BillingInformation/>

                    </div>

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
   