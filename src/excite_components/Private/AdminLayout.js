import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import {  LaptopOutlined, NotificationOutlined ,MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined, } from '@ant-design/icons';
import ProfileDashboard from './dashboard' 
import Load_User_Post from './UserPost'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;


class AdminLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }); 
  };
  
  render() {
    //console.log(this.state.token);
   console.log(this.props.token);
   

    return (

     
           <ProfileDashboard />
        

    )
  }
}



const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

 
export default connect(
  mapStateToProps,
  null
)(AdminLayout);

