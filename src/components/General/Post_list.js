import React , { useState, Component }from 'react';
//import {Row, Col , List, Avatar ,Rate,Input , Spin ,Card , Form, Button } from 'antd';
//import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

import { List, Avatar, Space , Input} from 'antd';


import Gigs from  '../General/Post_list'

import Results from '../General/Filter_results'


  
const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};

const category_url = 'http://127.0.0.1:8000/core_api/category_list/'
const post_list_url = 'http://127.0.0.1:8000/core_api/post_list/'
const { Search } = Input;

class Posts extends Component{
    state = {
        'posts' : [] ,
        'error' : null ,
        'loading': true ,
        results: [],
        categories : [],
    
      } 
    
       Get_All_Gigs = async() => {

            const get_data = await fetch(post_list_url)
            const processed_data =  await get_data.json()
            console.log(processed_data)
            this.setState({
              'posts' : processed_data ,
            'error' : null ,
            'loading': false ,
            })

        }

        process_query = (e,err) =>{
          console.log()
         const title =  e.target.Name.value
          const price = e.target.price.value
          const location = e.target.location.value
  
      
            this.setState({
              loading: true
            })
      
            if(!err){
              axios.get(this.search_url, {
                params: {
                  title ,price ,
                     location 
                }
              }).then(res =>{
                this.setState({
                  results: res.data ,
                  loading : false
                }); console.log(res.data)
                
              }).catch(e =>{
                  console.log(e)
              })
            }
            
            //process query contents ends here
        }
      
        Get_categories = async() =>{

          await axios.get(category_url).then( res =>{
              this.setState({
                  categories : res.data ,
                  loading : false
              });console.log(res.data)
                  });
        
         };

        componentDidMount(){
            this.Get_categories()
            this.Get_All_Gigs()
        }

        
        render(){
          const {posts , loading, error, results} = this.state
          return (
            
            <>
                         
            
                
                <div className="post-container">
                <List
                      className="post-list-text"
                      itemLayout="vertical"
                      size="medium"
                      pagination={{
                        onChange: page => {console.log(page);},
                        pageSize: 3,
                      }}
                      dataSource={posts}
                      
                  renderItem={item => (
                    <List.Item
                      key={item.GigTitle}
                      
                      extra={
                        <img
                        href={`/post_detail/${item.id}`}
                          width={272}
                          alt="Image"
                          src={item.GigImage1}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={<a  className="post-list-title" style={{fontSize:26}}  
                        href={`/post_detail/${item.id}`}> {item.GigTitle} </a>}
                        description={
                          <p className="post-list-text">
                            <a 
                            href={`/post_detail/${item.id}`}
                            style={{color:"#434343"}} >
                            {item.GigDescription.length < 50 ? 
                             `${item.GigDescription}` : `${item.GigDescription.substring(0, 300)}...` }
                            </a>
                          </p>
                        }
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
                

            
                </div>

          
                    </>
                    
          );
        }

}

export default Posts