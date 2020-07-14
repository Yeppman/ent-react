import React , { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import axios from  'axios';
import Category_Fetch from "./Category";
import Fiter_Results_Form from './Filter_Post'



///Basic Navbar with Body Conent for wrapping List of gigs
const profile_url = 'https://backend-entr.herokuapp.com/stream/profile_view/'


class CustomLayout extends Component{
 
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

    handleLogout = () =>{
      window.reload()
      this.props.logout();
     
    }
     
    render(){
      const {token, isAuth,is_seller, is_buyer} = this.props
      console.log(isAuth);  
      
      
        return(
            <div>

            <ul className ="navblock">
              <li className ="navlist">
              <Link to="/">
                Enterprise
              </Link>
              </li>
               <li className ="navlist">
                    <Link to="/showcase/">
                    Product/Services
                    </Link>
               </li>
             
                {
                  is_seller ?(
                    <li className ="navlist">
                    <Link to="/dashboard">
                    Dashboard
                    </Link>
                    </li>
                  ):(<li></li>)
                }

                {
                  is_buyer ?(
                    <li className ="navlist">
                    <Link to="/profile/user/">
                   User Dashboard
                    </Link>
                    </li>
                  ):(<li></li>)
                }

                {
                  is_buyer ?(
                    <li className ="navlist">
                    <Link to="/my_orders/">
                   Orders
                    </Link>
                    </li>
                  ):(<li></li>)
                }

              {
                isAuth   ? (
                  <>
                   
                    <li className ="navlist">
                    <a onClick={ this.handleLogout()}>
                Logout
              </a>
                    </li>

                  </>
                ) : (
                  <>
                  <li className ="navlist">
                  <a href="/login">
                Login
                </a>
                  </li>

                  </>
                )
              }
            </ul>

            <div className="cat-box">

{
    categories.map((c)=>(
        <>
        <div className="cat-link">
        <a
         onClick={()=>{this.redirect_page(c.CategoryKey)}}
         href> {c.CategoryName}</a>
        </div>
        </>
    ))
}


</div>
</div>

            
          {this.props.children}
  

  
          
        </div>


        )
    }

} 
 
const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      is_buyer:state.auth.is_buyer,
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CustomLayout));


