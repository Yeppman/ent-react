import React , {Component,  createElement, useState } from "react";
import async from 'q'
import { connect } from "react-redux";
import TemporaryDrawer from './Sidebar/SideNav'
import axios from "axios";
import moment from 'moment';
import Load_Comments from '../General/Comments'
import CommentForm from '../containers/Comment_Form'

import {Button , 
     Card, Avatar , Comment, Tooltip, Rate ,  Tabs , notification } from 'antd';

import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card; 
const { TabPane } = Tabs;

const users_post_detail_url = 'https://backend-entr.herokuapp.com/stream/view_post_contents/'
const user_delete_post_url = 'https://backend-entr.herokuapp.com/stream/delete_post/'

const openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}

class User_Post_Conent extends Component{

    state ={
        post_detail : [] ,
        comments_made : [],
        rating : null,
        chartData :[],
        quotes : [],
         }

    
    model_id = this.props.match.params.UserPostDetailID

         
    Get_Contents = (token) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(users_post_detail_url + `${this.model_id}/`)
        .then(res =>{
            this.setState({
                post_detail : res.data
            }); console.log(res.data)
        })
        .catch(e =>{
            console.log(e)
        }) 
    }

    Delete_Post =()=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
    axios.post(user_delete_post_url + `${this.model_id}/`)
    .then(res =>{
        openNotification(res.data['Message'])
        this.props.history.push("/user_post")
    })
    .catch(e =>{
        console.log(e)
    }) 
    }

    Get_Comments = () =>{
      const model_id = this.model_id
       axios.get(`https://backend-entr.herokuapp.com/core_api/comment_list/${model_id}/`)
      .then(res =>{
          this.setState({
              comments_made : res.data ,
              loading : false
              })   
              console.log(res.data)
      })

     };

    Ratings = async(token)=>{
      const parse_id= this.model_id;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(`https://backend-entr.herokuapp.com/core_api/post_rating/${parse_id}/`)
      .then( res =>{
        const ra = res.data['Rating']
        this.setState({
          rating: Math.round(ra)
        })
        console.log('rated_Data',Math.round(res.data['Rating']))
      })
    } 

    Quotes =async (token) =>{
      const parse_id= this.model_id;
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(`https://backend-entr.herokuapp.com/stream/quotations/${parse_id}/`)
      .then( res =>{
        this.setState({
          quotes : res.data
        })
      console.log(this.state.quotes)
      })
    }

    Post_Analytics = async (token) =>{
      await axios.get()
    }

    
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Get_Contents(newProps.token)
            this.Ratings(newProps.token)
            this.Quotes(newProps.token)
            

          }
        }
      }

      componentDidMount(){
        this.Get_Comments(this.props.token)
        this.Ratings(this.props.token)
        this.Quotes(this.props.token)
      }

    render(){

      const {post_detail, comments_made, rating , quotes} = this.state
      const {is_seller} = this.props
        return(

              <div>
                {
                is_seller ?(
                  <>
                  <TemporaryDrawer />
            <div className="flex-container">
              <div className="shift80">
                  <img 
                  className="post_detail_image"
                  alt ='Image Appears here'
                  src={post_detail.GigImage1} />
               </div>

              <div className="shift20">
                  <div className="contact-card">
                    <div className="card-container">
                    <span>
                          <img
                           src="https://az742041.vo.msecnd.net/vcsites/vcimages/resource/uploads/CompanyLogo/thumbs/636946622002390653_1.jpg" />
                    </span>
                        <div className="card-title">
                        
                          {post_detail.GigTitle}
                        </div>
                        <div className="card-text">
                          {post_detail.GigDescription}
                        </div>

                        <div className="card-location">
                         Location: {post_detail.GigLocation}
                        </div>

                        <div className="card-date">
                        Posted on:  {post_detail.GigPostDate}
                        </div>

                        <div className="card-price">
                        Price  ₦ {post_detail.GigPrice}
                        </div>

                        <div className="card-text">
                          <Button 
                          onClick={this.Delete_Post}
                          type="danger">
                            Delete
                          </Button>
                        </div>
                                              

                    </div>
                  </div>
                </div>
                
            </div> 

            

        
            <div className="flex-container">

                <div className="shift100">
                  
            <Tabs defaultActiveKey="1" >
          <TabPane tab="Description" key="1">
              <div className="shift70">
              
                      <div className="description-card">
                          <div className="description-header">
                            <h2>
                              Description
                            </h2>
                            <Rate disabled defaultValue={rating} />
                          </div>
                        <div className="description-card-text">
                          {post_detail.GigDescription}
                        </div>
                      </div>
            
              </div>
          </TabPane>
          <TabPane tab="Comments and Rating" key="2">

                  <div className="shift50">

                {
                        comments_made.map((c)=>(
                          <>
                          <Rate disabled defaultValue={c.rating} />

                          <Comment
                          author={c.name}
                          avatar={
                            <Avatar
                              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                              alt="Han Solo"
                            />
                          }
                          content={
                            <p>
                              {c.comments}
                            </p>
                          }
                          datetime={
                            <Tooltip title>
                              <span>{c.created}</span>
                            </Tooltip>
                          }
                        />
                        </>
                          ))
                        }

                        </div>

                  </TabPane>
          
          <TabPane tab="Quotes" key="4">
            <div class="grid grid-cols-6">
              <div className="grid-col-6">

              {
                quotes.map((q)=>(
                  <>
                  <Rate disabled defaultValue={q.Requested_by} />

                  <Comment
                  author={q.name}
                  avatar={
                    <Avatar
                      src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      alt="Han Solo"
                    />
                  }
                  content={
                    <p>
                      {q.message}
                    </p>
                  }
                  datetime={
                    <Tooltip title>
                      <span>{q.created}</span>
                    </Tooltip>
                  }
                />
                </>
                 ))
               }                          

              </div>
            </div>
          </TabPane>
          
        </Tabs>
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
  )(User_Post_Conent);