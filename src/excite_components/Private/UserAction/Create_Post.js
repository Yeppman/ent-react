import React , { createElement, useState } from "react";
import axios from  'axios';
import { connect } from "react-redux";

import {Row, Col , Button , 
    Carousel ,Skeleton, Switch,
    Card, Avatar , Comment, Tooltip, Form,Select, Input, InputNumber , Upload, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined  , UploadOutlined } from '@ant-design/icons';
import renderEmpty from "antd/lib/config-provider/renderEmpty";
const { Meta } = Card; 


const Search = Input.Search;
const { Option,TextArea } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

const FormItem = Form.Item

const category_url = 'https://backend-entr.herokuapp.com/core_api/category_list/'
class Create_Post extends React.Component{
      state = {
        results : [] ,
        error :  null ,
         loading : false,
         categories : [],
      }

     image_uploader = {
        name: 'file',
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
      };

      Get_categories = async() =>{

        await axios.get(category_url).then( res =>{
            this.setState({
                categories : res.data ,
                loading : false
            });console.log(res.data)
                });
      
       };

    process_query = (values,err) =>{
        console.log()
       const title =  
            values["title"] === undefined ? null : values["Title"] ;
        const price = 
            values['price'] === undefined ? null : values['Price'] ;
        const location = 
          values['location'] === undefined ? null : values['Location'] ;
    
        const rangeValue = values['date-range']
        const date_min =
        rangeValue === undefined ? null : rangeValue[0].format("YYYY-MM-DD");
        const date_max =
          rangeValue === undefined ? null : rangeValue[1].format("YYYY-MM-DD");
    
          this.setState({
            loading: true
          })
    
          if(!err){
            axios.defaults.headers = {
              "Content-Type": "multipart/form-data",
              Authorization: `Token ${this.props.token}`
            };
            
            axios.post(this.search_url, {
              params: {
                title ,price ,
                 date_min,
                  date_max ,
                   location
              }
            }).then(res =>{
               console.log(res.data)
              
            }).catch(e =>{
                console.log(e)
            })
          }
          
          //process query contents ends here
      }

      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            
          }
        }
      }
  

    render(){
        const { error, loading, results , categories} = this.state;
     
        const formItemLayout = {
          wrapperCol: { span: 12, offset: 6 }
        };
        return(


           <div className = "cotainer">
                <h3>
                  Upload a Content
                </h3>
              <div className = "flex flex-wrap">
              <div className = "w-full md:w-7/12 ml-auto mr-auto px-4">
              <Form  {...formItemLayout} onFinish={this.process_form}>
            <Form.Item>
             
            </Form.Item>
            <Form.Item name ="Title">
            
                <Input
                  placeholder="Title contains..."
                  onSearch={value => console.log(value)}
                  enterButton
                />
              
            </Form.Item>
            <Form.Item  name ='Location'> 
            
                <Input
                  placeholder="Location"
                  onSearch={value => console.log(value)}
                  enterButton
                />
              
            </Form.Item>
            
            <Form.Item name ='category' hasFeedback>
                <Select placeholder="Select a category">
                {
                 categories.map((c)=>(
                    <Option value="Sport">{c.CategoryName}</Option>
                 ))}
                   </Select>
              </Form.Item>

            <Form.Item name='Description' >
        <Input.TextArea />
           </Form.Item>


           <Form.Item  name ='Price'> 

            <Input
              placeholder="Your Price ?"
              onSearch={value => console.log(value)}
              enterButton
            />
          
        </Form.Item>

            <Form.Item>
                   <Upload {...props}>
                    <Button type ="primary" htmlType="submit">
                    <UploadOutlined /> First Image
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                   <Upload {...props}>
                    <Button type ="primary" htmlType="submit">
                    <UploadOutlined /> Second Image
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
                   <Upload {...props}>
                    <Button type ="primary" htmlType="submit">
                    <UploadOutlined /> Third Image
                    </Button>
                </Upload>
            </Form.Item>

            <Form.Item>
            <Button type ="primary" htmlType="submit">
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

export default connect(
  mapStateToProps,
  null
)(Create_Post);