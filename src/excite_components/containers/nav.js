import React , { useState, Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

import {UserOutlined, LoginOutlined , ShoppingCartOutlined} from '@ant-design/icons'

import axios from  'axios';

///Basic Navbar with Body Conent for wrapping List of gigs
const profile_url = 'http://backend-entr.herokuapp.com/stream/profile_view/'

const host = 'http://backend-entr.herokuapp.com'
class Nav extends Component{
 
  state= {
    categories:[] ,
  }

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

    Categories = async() =>{
    
      const category_url = host + `/retail/categories/`
      
      await axios.get(category_url).then( res =>{
          this.setState({
              categories : res.data ,
              loading : false
          });console.log(res.data)
              });  
     };
     
    render(){
      const {token, isAuth,is_seller, is_buyer} = this.props
      const {categories} = this.state
      console.log(isAuth);  
      
        return(
            <div className="">

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
                   <UserOutlined/> Dashboard
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

                <li className ="navlist">
                    <Link to="/cart/">
                    <ShoppingCartOutlined /> Cart
                    </Link>
                    </li>

              {
                isAuth   ? (
                  <>
                   
                    <li className ="navlist">
                    <Link onClick={() => this.props.logout()}>
                    <LoginOutlined />  Logout
              </Link>
                    </li>

                  </>
                ) : (
                  <>
                  <li className ="navlist">
                  <Link to="/login">
                Login
                </Link>
                  </li>

                  </>
                )
              }
            </ul>
          
            <div className="cat-box">

                  {
                      categories.map((c)=>(
                          <>
                          <p>jioewo</p>

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));


