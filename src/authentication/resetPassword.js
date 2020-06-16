import React, {Component} from 'react'
import axios from "axios";
import { resetPassword } from "../store/actions/auth";
import { connect } from "react-redux";
import {changePasswordUrl, resetPasswordUrl, resetPasswordConfirmUrl,
  activateUserUrl, userProfileUrl
  } from '../constants'
import Password from 'antd/lib/input/Password';
import {Row, Col , List, Avatar ,Rate,Input , 
  Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';


class PasswordReset extends Component {

  handleSubmit = (values) => {
        
    const email = values['email']
    let form_data = new FormData();
    form_data.append('email', email );//this.state.image.name
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`,
    };
    axios.post(resetPasswordUrl, form_data)
    .then(response => {
        // redirect to reset done page
        //history.push("/reset_password_done");
    }).catch((error) => {
        console.log(error);
        
        // If request is bad...
        // Show an error to the user
        //const processedError = processServerError(error.response.data);
        //throw new SubmissionError(processedError);
    });
    console.log(this.props.token);
    console.log(email);
    
    // this.props.history.push("/");

};
    render() {
        return (
            <div className="container mx-auto my-10">
                    <div className="w-full md:w-12/12 px-4">
                    <div className="base-card">

                    <Form  onFinish={this.handleSubmit}>
                    <Form.Item>
                    <h1 className="ant-form-text">Reset Password</h1>
                    </Form.Item>

                    <Form.Item rules={[{ required: true }]}  name ="email">
                        <Input placeholder="email" id='email' enterButton  />
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                    </Form.Item>

                    </Form>

                    </div>
                    </div>  
</div>
        )
    }
}


const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
      resetPass: (token, email) => dispatch(resetPassword(token, email))
    };
};
  
 export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordReset);
  
