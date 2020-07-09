import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker , Upload, message,notification} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined ,
     EditOutlined, EllipsisOutlined, SettingOutlined ,UploadOutlined  } from '@ant-design/icons'

     
import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from './Sidebar/SideNav'

const UserPost_url = 'http://127.0.0.1:8000/stream/view_post/'

const Search = Input.Search;
const TextArea = Input.TextArea
const { Option } = Select;
const { RangePicker } = DatePicker;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);


const category_url = 'http://127.0.0.1:8000/core_api/category_list/'  
const My_User_id_url = "http://127.0.0.1:8000/stream/get_my_user_id_and_email/"

class Load_User_Post extends Component {

    state = {
        user_post : [], 
        loading: false,
        error: null ,
        categories : [],

        //Used for form conntrol
        Owner : '',
        Title : '',
        Category :'',
        Description : '',
        Location : '',
        Price : '',
        The_Image_1:'',
    }

    Get_categories = async(token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(category_url).then( res =>{
          this.setState({
              categories : res.data ,
              loading : false
          });console.log(res.data)
              });
    
     };
  
     My_User_id = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
     await axios.get(My_User_id_url)
     .then(res =>{
       this.setState({
        Owner : res.data['userID']
       })
       alert(this.state.Owner)
     })

     }

    Get_User_post = (token) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(UserPost_url)
        .then(res =>{
            this.setState({
              user_post : res.data
            }); console.log('rep', res.data)
        })
        .catch(e =>{
            console.log(e)
        })
    } ;

    
    
    openNotification = (msg) => {
      notification.open({
        message: 'Notification Title',
        description:msg,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
    }

    handleChange = (e) => {
      this.setState({
        [e.target.id]: e.target.value
      })
    };
  
    handleImageChange = (e) => {
      this.setState({
        The_Image_1: e.target.files[0]
      })
    };
  

    process_query = async(values, err)=>{
      const Title =  
        values["Title"] === undefined ? null : values["Title"] ;
      const Category =  
        values["Category"] === undefined ? null : values["Category"] ; 
      const Price =  
        values["Price"] === undefined ? null : values["Price"] ; 
      const Location = 
         values["Location"] === undefined ? null : values["Location"] ; 
      const Description =
        values["Description"] === undefined ? null : values["Description"] ;
      

        const Original_User_id = this.state.Owner
        const Original_form_image = this.state.The_Image_1
        //Assigns New Form Data
        let form_data =  new FormData()
        form_data.append('Title',Title);
        form_data.append('Category', Category);
        form_data.append('Description',Description);
        form_data.append('Location',Location);
        form_data.append('Price', Price);
        form_data.append('Owner', Original_User_id);
        form_data.append('Image_Post',Original_form_image);

        axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
        axios.defaults.xsrfCookieName = "csrftoken";
            axios.defaults.headers = {
              "Content-Type": "multitype/form-data",
              Authorization: `Token ${this.props.token}`
            };
          
          axios.post(`http://127.0.0.1:8000/stream/create_post/`,form_data, {
            headers : {
              "Content-Type": "multitype/form-data",
              Authorization: `Token ${this.props.token}`
            }
          } )
          .then(res =>{
              console.log(res.data)
              const take_response = res.data['Message']
              this.openNotification(take_response)            
          })
          .catch(e =>{
              console.log(e)
            }) 
        }
      
    
    
    componentDidMount(){
      this.Get_User_post(this.props.token)
      this.Get_categories(this.props.token)
      }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Get_User_post(newProps.token)
            this.Get_categories(newProps.token)
          }
        }
      }
  
        render() {
            console.log(this.props.token);
            const {user_post, loading, error, categories ,Title, Price,Location,Description,The_Image_1 } = this.state
            const {is_seller} = this.props
            
            return (
                
                <div>
                  {
                    is_seller ?(
                      <>
                  <TemporaryDrawer />

                <div className ="container mx-auto">
                    <div className = "grid grid-cols-10">

                    <div className="col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-3 xl:col-span-3">
                    <div className="base-card">
                        <Form  onFinish={this.process_query}>
                            <Form.Item>
                            <h1 className="ant-form-text">Create Post</h1>
                            </Form.Item>
                
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Title">
                            
                                <Input
                                 onChange={this.handleChange}
                                placeholder="Product or Service name"
                                value ={Title}
                                enterButton
                                />
                            
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Category" >
                                
                                <Select placeholder="Select a category">
                                {
                                  categories.map((c)=>(
                                    <Option 
                                    onChange={this.handleChange}
                                    value={c.id}>{c.CategoryName}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>
                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Location' hasFeedback>
                                
                                <Select placeholder="Select a Location">
                                <Option onChange={this.handleChange} value="Lagos">Lagos</Option>
                                <Option  onChange={this.handleChange} value="Ibadan">Ibadan</Option>
                                <Option onChange={this.handleChange} value="Osun">Osun</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Description">
                          <TextArea onChange={this.handleChange}
                           value={Description} placeholder="Description" rows={4} />
                          </Form.Item>

                          
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='Price'> 
                            
                                <Input
                                value={Price}
                                onChange={this.handleChange}
                                placeholder="Price" 
                                enterButton
                                />
                            
                            </Form.Item>
                        
                          <Form.Item 
                           rules={[{ required: true }]}
                          name="Post_Image1">

                          <Input  type="file"
                          value = {The_Image_1}
                          onChange={this.handleImageChange} 
                          name="Post_Image1" />
                          </Form.Item>

                         

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>

                       </Form>
                    


                        </div>

                        </div>
                   
                        <div className=" py-3 col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-7 xl:col-span-7">

                        <List
                    
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 3,
                    }}
                    dataSource={user_post}
                    footer={
                    <div>
                        <b>ant design</b> footer part
                    </div>
                    }
                    renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                        extra={
                        <img
                            width={272}
                            alt="logo"
                            src={item.GigImage1}
                        />
                        }
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<a href={`/user_post_detail/${item.id}`}>{item.GigTitle}</a>}
                        description={item.GigDescription}
                        />
                        {item.content}
                    </List.Item>
                    )}
                />

                        </div>
                        </div> 

                    </div>
                
                

                </>
               
                    ):(
                      <div className="container">
                    <div className="grid-cols-12">
                        <div className="col-span-5">

                        </div>

                        <div className="col-span-5">
                          You are not authorized for this channel
                        </div>


                    </div>
                </div>
                    )
                  }
                </div> 

            )
        }
}



const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(Load_User_Post);