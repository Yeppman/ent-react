import axios from "axios";
import * as actionTypes from "./actionTypes";



import {notification , message} from 'antd'
const UserMembership_url  = 'back-ent.herokuapp.com/stream/user_membership/' 


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

export const getMembership = () => {
    return dispatch => {
        dispatch(getMembershipStart())
        axios.get(UserMembership_url).then(res=>{
        console.log(data)
        const data = {
            mode: res.data.membership
        }
        dispatch(getMembershipSuccess(data))
    })
    .catch(err => {
        dispatch(getMembershipFail())
    })
    }
  };