import React , {Component, createElement, useState } from "react";
import axios from  'axios';
import { connect } from "react-redux";
import {Link} from 'react-router-dom';

import {Row, Col , Button , 
    Carousel ,Skeleton, Switch,
    Card, Avatar , Comment, Tooltip, Form,Select, Input, InputNumber , Upload, message } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined  , UploadOutlined } from '@ant-design/icons';
import renderEmpty from "antd/lib/config-provider/renderEmpty";
const { Meta } = Card; 

const Quotes_url = 'http://127.0.0.1:8000/stream/quotes_list/'
class Quotes_listing extends Component{
    state = {
        list: [] ,
        loading : true,
        error : null
    }

    Vendor_Quotes = async(token)=>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        await axios.get(Quotes_url)
        .then(res =>{
            this.setState({
                list : res.data
            })
            console.log(this.state)
        })
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Vendor_Quotes(newProps.token)
            
          }
        }
      }

      componentDidMount(){
          this.Vendor_Quotes(this.props.token)
      }
    render(){
            const {list} = this.state
        return(
           
            <div className="flex-container">
                <div className="shift90">
                                <div className="">

                {
                list.map((i)=>(
                <>
               

                <Comment
                author={[i.Requested_by," " ,i.email]}
                avatar={
                    <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                    />
                }
                content={
                    <div className="">
                        <p style={{color: 'black'}}>
                            {i.message}
                        </p>
                        <a href={`/user_post_detail/${i.post}/`}>
                        View Post
                        </a>
                    </div>
                }
                datetime={
                    <Tooltip title>
                    <span>{i.created}</span>
                    </Tooltip>
                }
                />
                </>
                ))
                }

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
  )(Quotes_listing);