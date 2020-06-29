import React , { useState, Component }from 'react';
//import {Row, Col , List, Avatar ,Rate,Input , Spin ,Card , Form, Button } from 'antd';
//import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom';

import { List, Avatar, Space , Input} from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import Gigs from  '../General/Post_list'

import Results from '../General/Filter_results'

const post_list_url = 'http://127.0.0.1:8000/core_api/post_list/'
  
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
const { Search } = Input;

class Load_Posts extends Component{
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
              <div className="flex-container">
                
                <div className=  "shift50">

              <h4 style={{fontSize: 23, paddingTop:40}}>
              Create and manage your online presence
              </h4>
              <p>
              Get rid of managing multiple social media channels 
              from different-different platforms. We bring the solutions 
              where you can get verified and manage 
              your social media profiles, publish posts and get insights to improve further.
              </p>

              <div className ="shift20">
              <Search
                  placeholder="input search text"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
              </div>
              
              </div>

              <div className="shift50">
                    <img src="https://omnibiz.com/wp-content/uploads/2019/12/Funnel.png"/>
              </div>

              </div>

                          
             <div className="flex-container">
                  <div className="shift20">

                  </div>

                <div className="shift80">
                <List
                      itemLayout="vertical"
                      size="large"
                      pagination={{
                        onChange: page => {console.log(page);},
                        pageSize: 3,
                      }}
                      dataSource={posts}
                      
                  renderItem={item => (
                    <List.Item
                      key={item.GigTitle}
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
                        title={<a href={`/post_detail/${item.id}`}> {item.GigTitle} </a>}
                        description={item.GigDescription}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />
                </div>

             </div>
          
                        </>
                    
          );
        }

}

export default Load_Posts