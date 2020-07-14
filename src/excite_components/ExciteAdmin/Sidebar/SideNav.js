import React from 'react'

import axios from "axios";
import {notification,message} from 'antd'
import { connect } from "react-redux";

import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {MenuItem, MenuList} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const host = 'https://backend-entr.herokuapp.com'


const Profile_id_url  = host + `/stream/get_profile_id/`
const Profile_url = host + `/stream/profile_view/`
const UserMembership_url  = host + '/stream/user_membership/'
const Membership_url = host + '/stream/list_membership/'
const Post_Analytics_url = host + '/analytics/rankings/'

const UserPost_url = host + '/stream/view_post/'

const products_analysis_endpoint = host + `/analytics/product_views/`



 class TempoaryDrawer extends React.Component{
    

    render(){
     
      return(
        <>
           <div class="sidenav">
                

                <MenuList>
              <div  className = "menu-link">
              <MenuItem 
            className="menu-link-text"
            component={Link} to="/Admin/" >
            Dashboard
            </MenuItem>
              </div>


          
              <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/admin/user-management/" >
            User Management
            </MenuItem>
          </div>

              <div  className = "menu-link">
          <MenuItem 
          className="menu-link-text"
          component={Link} to="/admin_logistics/" >
            Logistics
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/admin/campaigns/" >
            Campaigns
            </MenuItem>
          </div>
          
          <div  className = "menu-link">
            <MenuItem component={Link} to="/campaign-list/">
           Influencer Marketing
            </MenuItem>
            </div>

          <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/user_uploads/" >
              Products 
            </MenuItem>
          </div>

          
            


          </MenuList>
         
            
        </div>
        </>
      )
    }


}



const mapStateToProps = state => {
  return {
    token: state.auth.token ,
    isAuth: state.auth.token !== null ,
    is_seller: state.auth.is_seller ,
    membership_type: state.membership.mode,
  };
};

// const mapDispatchToProps = dispatch => {
// return {
//   member: (token) => dispatch(getMembership(token))
// }
// }

export default connect(
  mapStateToProps,
  
)(TempoaryDrawer) 
