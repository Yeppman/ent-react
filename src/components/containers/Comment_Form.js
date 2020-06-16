import React , { createElement } from "react";
import axios from  'axios';
import { connect } from "react-redux";
import { Button , Card, Form, Input, Rate,notification, message} from 'antd';
const { Meta } = Card; 

const {TextArea} = Input

const FormItem = Form.Item


const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}
const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];


class CommentForm extends React.Component{

  state ={
    value :3,
    Validate_Autheticated :false,
  }
  
  
  handleChange = value => {
    this.setState({ value });
  };

  Post_Comment = (values) =>{

    const gotten_postObj = {
      Name : values['name'] ,
      Email :values['email'] ,
      Comment : values ['comment']
    }
      // handle form events starts here
    const  token = this.props.token
    const postID = this.props.post_id
    const comment_endpoint = this.props.comment_url
    
    const Name = gotten_postObj['Name']
    const Email = gotten_postObj['Email']
    const Comment = gotten_postObj['Comment']
    const Rating = this.state.value


    console.log('params', Name)
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
        Authorization: `Token ${token}`
        };
      axios.get(comment_endpoint,{
                      params:{ Name, Email , Comment, Rating}
                    })
      .then(res => {
          if (res.status === 200) {
              const get_response = res.data['Message']
              openNotification(get_response)
            }
        })
      .catch(e =>{ console.log(e)})
            
     //process form values ends here
     
  };

  CheckAuth = ()=>{
    const User_is_Authenticated = this.props.isAuth
    if (User_is_Authenticated === true){
      this.setState({
        Validate_Autheticated : true
      })
      
    }else{
      message.error('You need to login to make a comment')
    }
  }

  componentDidMount(){
    //this.CheckAuth()
  }

  componentWillReceiveProps(newProps) {
    if (newProps.token !== this.props.token) {
      if (newProps.token !== undefined && newProps.token !== null) {
          
      }
    }
  }

  //ending editing of value

    render(){
      const { value } = this.state;
     
      return(

        <Form onFinish={this.Post_Comment}>

            <FormItem name="rating">
            
            <div className="">
            <p style={{fontSize:17}}>
              Rate
            </p>
            <Rate tooltips={desc} onChange={this.handleChange} value={value} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
            </div>
        
          </FormItem>


        <FormItem name="name"  >
          <Input 
          rules={[{ required: true }]}
          placeholder="Your Name" />
        </FormItem>

        <FormItem name="email" >
            <Input 
            rules={[{ required: true }]}
            placeholder="Your Email" />
        </FormItem>

        <FormItem 
         name="comment">
            <TextArea 
            placeholder = 'Your Comment ?'
            rules={[{ required: true }]}
            rows={4} />
        </FormItem>
          <FormItem >
            <Button
            onClick ={this.CheckAuth}
                type="primary" htmlType ='submit' shape="box"  size={5}>
                Comment
            </Button>
          </FormItem>
        </Form>


      )
    }

}

const mapStateToProps = state => {
  return {
    token: state.auth.token ,
    isAuth: state.auth.token !== null 
  };
};

export default  connect(mapStateToProps)(CommentForm);
