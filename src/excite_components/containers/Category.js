import React , { createElement, useState } from "react";
import axios from  'axios';
import { connect } from "react-redux";


import {Row, Col ,Form, Input, InputNumber,Card,
     Select,
     
    } from 'antd';
     
import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import renderEmpty from "antd/lib/config-provider/renderEmpty";
const { Meta } = Card; 

const category_url = 'https://backend-entr.herokuapp.com/core_api/category_list/'

const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
  

const Search = Input.Search;
const { Option } = Select;

class Category_Fetch extends React.Component{

    state ={
        categories : [] ,
        loading : true ,
        error: null ,
    }

    Get_categories = async() =>{

    await axios.get(category_url).then( res =>{
        this.setState({
            categories : res.data ,
            loading : false
        });console.log(res.data)
            });

        };
    
    componentWillMount =() =>{
        this.Get_categories()
    }
    
    // render and return here
    render(){
        const {categories} = this.state
        const formItemLayout = {
            wrapperCol: { span: 12, offset: 6 }
          };
    return(
        
        <Row>

        <Col span ={4}>

        <Form {...formItemLayout} onFinish={this.process_query}>
        <Form.Item name ='category' hasFeedback>
           
           <Select placeholder="Select a category">
             {
                 categories.map((c)=>(
                    <Option value="Sport">{c.CategoryName}</Option>
                 ))
             }
             
              </Select>
        
       </Form.Item>
        </Form>

        </Col>

        </Row>

       
       

    )};

}

export default Category_Fetch