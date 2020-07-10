import React , {Component} from "react";
import { connect } from "react-redux";
import async from 'q'
import axios from "axios";

import {message} from "antd";
import Nav from '../../containers/nav'

import  cartTable  from './cartitemsTable'

const host = 'https://backend-entr.herokuapp.com';


class CartList extends Component{
    state = {
        cartData : [],
        cartLength : 0,
        loading : true, 
        error : null ,
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
                    cartLength : res.data.length
                })
                console.log(res.data)
            }else{  
              //  message.error('') 
            }
        })
    }

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
          const {cartData} = this.state
          return(
              <>
                <Nav />
                <div className="container">
                    <div className="grid grid-cols-6">
                        <div className="col-span-3">
                        
                            <cartTable data={cartData} />
                        </div>
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
   