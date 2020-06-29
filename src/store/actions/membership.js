import axios from "axios";
import * as actionTypes from "./actionTypes";



import {notification , message} from 'antd'
const host = 'http://127.0.0.1:8000'
const UserMembership_url  = host + '/stream/user_membership/' 


export const getMembershipStart = () => {
  return {
    type: actionTypes.MEMBERSHIP_START
  };
};

export const getMembershipSuccess = data => {
  return {
    type: actionTypes.MEMBERSHIP_SUCCESS,
    data
  };
};

export const getMembershipFail = error => {
  //message.error('err goes here',10)
  return {
    type: actionTypes.MEMBERSHIP_FAIL,
    error: error
  };
  
};

export const getMembership = (token) => {
    return dispatch => {
        dispatch(getMembershipStart())
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };    
        axios.get(UserMembership_url).then(res=>{
        const data = {
            mode: res.data[0].membership
        }
        console.log(data);
        
        dispatch(getMembershipSuccess(data))
    })
    .catch(err => {
        dispatch(getMembershipFail(err))
    })
    }
  };