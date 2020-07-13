import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from "react-redux";
import * as actions from "./store/actions/auth";

// import * as actions from "./store/actions/auth";
import "tailwindcss/dist/base.css";
import "./styles/globalStyles.css";

import './assets/css/enterprise.css'
import './assets/css/dashboard.css'
import './assets/css/payment.css'
import './assets/css/logicstics.css'
import './assets/css/inventory.css'
import './assets/css/post_item_cards.css'
import './assets/css/post_create.css'
import './assets/css/Auth.css'
import './assets/css/unveil.css'
import './assets/css/sidebar.css'
import './App.css'
import './assets/css/antd-override.css'

import './assets/css/cart.css'

import './assets/styles/Navigation.less'

import './assets/excite_style/dashboard.css'
import './assets/excite_style/home.css'
import './assets/excite_style/nav.css'



import './assets/excite_style/shop.css'
import CustomLayout from "./layout"
//import CustomLayout from "./excite_components/containers/layout"
import PageRouter from './routes'

class App extends Component {
  
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

    render() {
        return (
            <div>
            <Router>
              <CustomLayout >
                  <PageRouter />
              </CustomLayout>
            </Router>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      onTryAutoSignup: () => dispatch(actions.authCheckState())
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(App);