import React , { useState, Component }from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { connect } from "react-redux";
import * as actions from "./store/actions/auth";
import './assets/enterprise.css'
import './assets/dashboard.css'
import './assets/payment.css'
import './assets/logicstics.css'
import './assets/inventory.css'
import './assets/post_item_cards.css'
import './assets/post_create.css'

//import './assets/payplan.scss'

//import './assets/sidebar.css'
//import './App.css';
//import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'


//import  CustomLayout from  './components/containers/layout'
import CustomLayout from './components/containers/layout'
import GeneralRouter from './public_routes'


class App extends Component{
 
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

    render() {
        return (
          <div>
          
            <Router>
              <CustomLayout  {...this.props}>
                  <GeneralRouter />
              </CustomLayout>
            </Router>
            
          </div>
        ); 
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