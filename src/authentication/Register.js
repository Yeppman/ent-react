import React from "react";
import { Form, Input, Select, message, notification } from "antd";
//import { MessageOutlined,  LikeOutlined, StarOutlined } from '@ant-designs';
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import * as actions from "../store/actions/auth";
import 'antd/dist/antd.css';

const FormItem = Form.Item
const Option = Select.Option;

const openNotification = (msg) => {
  notification.open({
    message: 'Profile Notification',
    description: msg
  });
};


class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  handleSubmit = (values )=> {

    const form_regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const password_1 = values['password']
    const password_2 = values['password2']
    
    if (password_1.match(form_regex)){
            
          if (password_1 != password_2){
            message.error('Your Passwords don`t match')
        }
        else if(password_1 && password_2 <= 8){
          message.error('Your Passwords must not be lesser than 8 letters')
        }
        
        else{
          var email_regex= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
          const email = values['email']
          if (email.match(email_regex)){
            //Email Validation passes
            let is_buyer = false
            if (values['userType']  === "buyer"){
              is_buyer = true
              } 
            this.props.onAuth(
              values['username'],
              values['email'] ,
              values['password'],
              values['password2'],
              is_buyer
            );
            openNotification('Account created successfully')
            this.props.history.push("/showcase");
          }else{
            //Email validation verifies its wrong
            message.error('Please enter a valid email adress')
          }

      }

    }
    else{
      message.error('Your Passwords must contain at least one Uppercase \n one special character \n and one numeric digit ')
    }
  
  };


  render() {
   

    return (
            <div className="container mx-auto">
               <div className="grid grid-cols-6">
                <div className="   login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                
                <Form onFinish={this.handleSubmit}>
        <FormItem 
        rules={[{ required: true, message:'Username is required' }]}
        name ="username">
          
            <Input
              prefix
              placeholder="Username"
            />
         
        </FormItem>

        <FormItem
        rules={[{ required: true, message:'Email is required' }]}
         name = "email">
          
            <Input
              prefix
              placeholder="Email"
            />
        
        </FormItem>

        <FormItem 
        rules={[{ required: true, message:'Paswword is required' }]}
        name="password">
          
            <Input.Password
              prefix
              type="password"
              placeholder="Password"
            />
          
        </FormItem>

        <FormItem 
        rules={[{ required: true, message:'You need to confirm your password' }]}
        name = "password2">
          
            <Input.Password
              prefix
              type="password"
              placeholder="Type Password Again"
              
              onChange={this.Validate_Passowrds}
            />
        
        </FormItem>

        <FormItem 
        rules={[{ required: true, message:'You need to select a user type' }]}
        name='userType'>
         
            <Select placeholder="Select a user type">
              <Option value="buyer">User</Option>
              <Option value="seller">Vendor</Option>
            </Select>
         
        </FormItem>

        
        <Form.Item >
            <button
              class="login-button"
             htmlType="submit">
              Sign Up
            </button>
          </Form.Item>
      </Form>
                </div>
          </div>
            </div>
    );
  }
}



const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, email, password1, password2, is_buyer) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_buyer)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
