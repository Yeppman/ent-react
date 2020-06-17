import React from "react";

import { connect } from "react-redux";
import { Link, NavLink, Redirect } from "react-router-dom";
import { authLogin } from "../store/actions/auth";

import {
  Form,
  Select,
  Input,
  notification
} from "antd";

const Search = Input.Search;
const { Option } = Select;


class LoginForm extends React.Component {
  state = {
    username: "",
    password: ""
  };
 
  //handleChange = e => {
    //this.setState({ [e.target.name]: e.target.value });
  //};

  handleSubmit = (values) => {
    
  const username = values['username'] 
  const password  = values['password']

    this.setState({
      username :  values['username'] ,
      password : values['password']
    })
    this.props.login(username, password)
    .then((res) => {
        alert('works')  
    }).catch((err) => {
      alert('failed')  
    });
  }

  openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  render() {
    const { error, loading, token } = this.props;
    const { username, password } = this.state;
    if (token) {
      this.openNotification('Login Successful')
      return <Redirect to="/" />;
    }
    const formItemLayout = {
      wrapperCol: { span: 12, offset: 6 }
    };
    return (

            <>
 
              
    
              <div className="container  mx-auto">
                
        <div className="grid grid-cols-6">
             <div className=" login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6 ">

                <Form className="" {...formItemLayout} onFinish={this.handleSubmit}>
          <Form.Item rules={[{ required: true, message:'Username is required' }]}>
            <h3 className="mt-2  text-center  text-3xl leading-8explore-text tracking-tight 
             text-gray-900 sm:text-4xl sm:leading-10" style={{fontSize:27}}>
              Login into Your Account
            </h3>
          </Form.Item>
          <Form.Item 
          rules={[{ required: true, message:'Username is required' }]}
          name ="username">
          <Input
          
           placeholder="Username" />

            
          </Form.Item>
          <Form.Item
          rules={[{ required: true, message:'Password is required' }]}
           name ='password'> 

          <Input.Password placeholder=" password" />
            
          </Form.Item>

          <Form.Item >
            <button
              class="login-button"
             htmlType="submit">
              Login
            </button>
          </Form.Item>

          </Form>
              
            <div className="container">
              <div className="grid grid-cols-2">
                  <div className="sm:col-span-2 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="text-center">
                      <Link to="/register/">
                        Sign up here 
                      </Link>
                      <br/>
                      <Link to="/passwordReset/">
                        Forgot Password ? 
                      </Link>
                    </div>
                  </div>
                </div>
            </div>

          </div>
        </div>
              </div>


            </>

    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,    
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);
