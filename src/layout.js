import React , { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as actions from '../../store/actions/auth';

import axios from  'axios';
// import Category_Fetch from "./Category";
// import Fiter_Results_Form from './Filter_Post'

///Basic Navbar with Body Conent for wrapping List of gigs
const profile_url = 'http://127.0.0.1:8000/stream/profile_view/'


export default class CustomLayout extends Component{
 
  Try_getting_user_Detail = async() =>{
      axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
      axios.defaults.xsrfCookieName = "csrftoken";
      axios.defaults.headers = {
        "Content-Type": "application/json",
         Authorization: `Token ${this.props.token}`
       };
       axios.get(profile_url).then(res =>{
       console.log(res.data)
      })
    }
    
    render(){
      const {token, isAuth,is_seller, is_buyer} = this.props
      console.log(isAuth);  
      
      

        return(
        <div>
          {this.props.children}        
        </div>
        )
    }

} 
 
// const mapStateToProps = state => {
//     return {
//       token: state.auth.token,
//       isAuth: state.auth.token !== null ,
//       is_seller: state.auth.is_seller ,
//       is_buyer:state.auth.is_buyer,
//     };
//   };
  

// const mapDispatchToProps = dispatch => {
//     return {
//         logout: () => dispatch(actions.logout()) 
//     }
// }

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));


