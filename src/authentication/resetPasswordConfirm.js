import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from "axios";

//import { reduxForm, Field, propTypes } from "redux-form";
import {changePassword} from '../store/actions/auth'
import {Row, Col , List, Avatar ,Rate,Input , 
  Spin ,Card , Form, Button ,Select , DatePicker , Upload, message,notification} from 'antd';

const openNotification = (msg) => {
    notification.open({
      message: 'Profile Notification',
      description: msg
    });
};
  

class PasswordResetConfirm extends Component {
  
  handleSubmit = (values) => {
    
    const new_password1 = values['new_password1']
    const new_password2 = values['new_password2']
    console.log(new_password1);
    console.log(new_password2);
    const { uid, token } = this.props.match.params;
    const user = {
      new_password1,
      new_password2,
      uid,
      token
      };
    console.log(user);
    axios
      .post('http://127.0.0.1:8000/rest-auth/password/reset/confirm/', user)
      .then(res => {
        console.log(user);
        this.props.history.push("/")
        openNotification('Password Changed')
        window.location.reload();
        //dispatch(authSuccess(user));
        //dispatch(fetchCart())
      //  dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
      //  dispatch(authFail(err));
      console.log(err);
      });
};

    render() {
        return (
            <div className="container mx-auto my-10">
                    <div className="w-full md:w-12/12 px-4">
                    <div className="base-card">

                    <Form  onFinish={this.handleSubmit}>
                    <Form.Item>
                    <h1 className="ant-form-text">Checkout Form</h1>
                    </Form.Item>
                    
                    <Form.Item name="new_password1" label="Password"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                      hasFeedback
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item name="new_password2" label="Confirm Password" dependencies={['new_password1']} hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('new_password1') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
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



// // Sync field level validation for password match
// const validateForm = values => {
//     const errors = {};
//     const { new_password1, new_password2 } = values;
//     if (new_password1 !== new_password2) {
//         errors.new_password2 = "Password does not match."
//     }
//     return errors;
// };


const mapStateToProps = state => {
    return {
      token: state.auth.token
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      changePass: (token) => dispatch(changePassword(token))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(PasswordResetConfirm); 