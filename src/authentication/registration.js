import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";

import * as actions from "../store/actions/auth";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { registrationURL} from '../constants'

class RegistrationForm extends React.Component {
  state = {

  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   this.props.form.validateFieldsAndScroll((err, values) => {
  //     if (!err) {
  //       let is_buyer = false;
  //       if (values.userType === "buyer") is_buyer = true;
  //       this.props.onAuth(
  //         values.userName,
  //         values.email,
  //         values.password,
  //         values.confirm,
  //         is_buyer
  //       );
  //       this.props.history.push("/");
  //     }
  //   });
  // };

  handleSubmit = (values) => {

      const username = values['username']
      const email = values['email']
      const password1 = values['password']
      const password2 = values['confirm']
      const option = values['option']
      console.log(username);
      console.log(option);
      console.log(password1);
      console.log(password2);
      let is_buyer = false;
      if (values.option === "buyer") is_buyer = true;
      const user = {
        username,
        email,
        password1,
        password2,
        is_buyer,
        is_seller: !is_buyer
      };
      console.log(user);
      axios
        .post(registrationURL, user)
        .then(res => {
          const user = {
            token: res.data.key,
            username,
            userId: res.data.user,
            is_buyer,
            is_seller: !is_buyer,
            expirationDate: new Date(new Date().getTime() + 3600 * 1000)
          };
          localStorage.setItem("user", JSON.stringify(user));
          console.log(user);
          this.props.history.push("/")
          window.location.reload();

        //  dispatch(authSuccess(user));
          //dispatch(fetchCart())
        //  dispatch(checkAuthTimeout(3600));
        })
        .catch(err => {
        //  dispatch(authFail(err));
        console.log(err);
        });
      // console.log(is_buyer);
      // this.props.Signup(
      //   values.userName,
      //   values.email,
      //   values.password,
      //   values.confirm,
      //   is_buyer
      // );
//      this.props.history.push("/");

  };


render() {


      const layout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };

      const Demo = () => {
        const onFinish = values => {
          console.log('Success:', values);
        };
      }

        const onFinishFailed = errorInfo => {
          console.log('Failed:', errorInfo);
        };


return (
      <div className="container mx-auto my-10">
              <div className="w-full md:w-6/12 px-4 ml-auto mr-auto">
              <div className="base-card">

              <Form  onFinish={this.handleSubmit}>

                  <Form.Item>
                    <h1 className="">Login</h1>
                    <hr />
                  </Form.Item>

                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[{ required: true, message: 'Please input your username!' }]}
                      >
                      <Input />
                    </Form.Item>

                    <Form.Item
                          name="email"
                          label="Email"
                          rules={[
                            {
                              required: true,
                              type: 'email',
                            },
                          ]}
                        >
                          <Input />
                      </Form.Item>

                    <Form.Item
                      name="password"
                      label="Password"
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

                    <Form.Item
                      name="confirm"
                      label="Confirm Password"
                      dependencies={['password']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject('The two passwords that you entered do not match!');
                          },
                        }),
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>

                    <Form.Item label="Option" name="option" rules={[{ required: true }]}>
                    <Select >
                      <Select.Option value="buyer">Buyer</Select.Option>
                      <Select.Option value="seller">Vendor</Select.Option>
                    </Select>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
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
    Signup: (username, email, password1, password2, is_buyer) =>
      dispatch(
        actions.authSignup(username, email, password1, password2, is_buyer)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationForm);
