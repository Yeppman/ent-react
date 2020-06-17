import React , { useState, Component }from 'react';
//import {Row, Col , List, Avatar ,Rate,Input , Spin ,Card , Form, Button } from 'antd';
//import { MessageOutlined, LikeOutlined, StarOutlined, LoadingOutlined  } from '@ant-design/icons'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';

import {  Rate} from 'antd';
    
const Uploaded_Post = props =>{
  const items_props = props.Items
  const slug = props.slug_class
  console.log('item props',items_props )
  console.log('slug',slug)
  
    
    return (
      
      <>
                   
       
                   {
          items_props.map((item)=>(
              <div className="post-box">
              <div className="post-image">
                  <img className="post-image-render"
                    href={`/categories/${slug}/${item.id}`}
                    src={item.Image1}
                    />
              </div>    
              <div className="post-content-prime">
                  <div className="post-content-header">
                  <a  
                  style={{color:"#434343"}}
                  href={`/categories/${slug}/${item.id}`}>
                  {item.Title}
                  </a>
                  
                  </div>
                  <div className="post-content-star-rating">
                  <Rate disabled defaultValue={item.Rating} />
                  </div>
                  <div className="post-content-body">
                      <p>
                      <a 
                      href={`/categories/${slug}/${item.id}`}
                      style={{color:"#434343"}} >
                      {item.Description.length < 50 ? 
                       `${item.Description}` : `${item.Description.substring(0, 300)}...` }
                      </a>
                      </p>
                  </div>
                  <div className="post-content-price">
                  <a  
                  style={{color:"#434343"}}
                  href={`/categories/${slug}/${item.id}`}>
                  ₦{item.Price}
                  </a>
                      
                  </div>
              </div>
          </div>

             ))
         } 
          
    
              </>
              
    );
  

}

export default Uploaded_Post