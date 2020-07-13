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
    state= {
      profile:[],
      profile_id:0,
            loading: false,
    }

    Profile_detail = (token,profile_id) =>{
      axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        
        axios.get(`https://backend-entr.herokuapp.com/stream/profile_view/${profile_id}/`)
        .then(res =>{
          this.setState({
            profile: res.data
          })
          console.log('profile details',res.data['Edited'])
          const CheckEdit = res.data['Edited']
          const checkVerification = res.data['Verified']
          console.log(res.data)
          
          if (CheckEdit == false){
            message.error('Please Edit Your profle, For Us to Process Your Data', 10)
            //this.props.history.push("/edit_profile/")
           // this.props.history.push("/edit_profile/")
          }
          if(checkVerification == false){
            this.setState({
              isVerified:true
            })
          }
        })
    
      
    }
    
    Profile_ID = async (token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(Profile_id_url)
      .then(res =>{
        const the_id = res.data
        this.setState({
          profile_id: res.data
        })
      });
      const {profile_id} = this.state
      const parse_profile_id = profile_id['Profile_id']
      console.log(parse_profile_id)
    await this.Profile_detail(token, parse_profile_id)
    
    }


    
    componentDidMount(){
      //this.test_ws()
     
      if (this.props.token !== undefined && this.props.token !== null) {
        this.Profile_ID(this.props.token)
            
      }
    }

    componentWillReceiveProps(newProps) {
      if (newProps.token !== this.props.token) {
        if (newProps.token !== undefined && newProps.token !== null) {
          this.Profile_ID(newProps.token)
           
       }
      }
    }

    render(){
      const {profile} = this.state
      return(
        <>
           <div class="sidenav">
                <div class="sidenav-header">
                    <img
                    style={{marginLeft:'-10'}}
                     src={profile.ProfilePicture}
                      style={{width:'80px', borderRadius: '50%'}} />
                    <p><h3>
                      {profile.User_First_Name}  {profile.User_First_Name} 
                    </h3></p>
                    <p>
                    {profile.Email} 
                    </p>
                    <span>
                    <button
                    href="/edit_profile"
                    className="profile-button login-button">Edit Profile</button></span>
                </div>

                <MenuList>
              <div  className = "menu-link">
              <MenuItem 
            className="menu-link-text"
            component={Link} to="/dashboard/" >
            Dashboard
            </MenuItem>
              </div>

              <div  className = "menu-link">
          <MenuItem 
          className="menu-link-text"
          component={Link} to="/profile/" >
            Profile
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/analysis/" >
            Analysis
            </MenuItem>
          </div>

          <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/user_uploads/" >
              Products 
            </MenuItem>
          </div>

          <div  className = "menu-link">
            <MenuItem component={Link} to="/campaign-list/">
           Influencer Marketing
            </MenuItem>
            </div>
            

          <div  className = "menu-link">
            <MenuItem component={Link} to="/book_keeping/">
            Book Keeping
            </MenuItem>
            </div>
            
            
            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/inventories/">
            Inventories
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/contacts/">
            Email Marketing
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/">
            Home
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
