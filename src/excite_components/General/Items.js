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
                   
                   <div class="products">

                            {
                                items_props.map((item)=>(
                                                            <>
                                                            
                                                            <div class="card">
                                    <div class="">
                                        <img class="card-img"
                                        src={item.Image1} 

                                        />
                                    </div>
                                    <div class="card-content">
                                        <p class="p-title">{item.Title}</p>
                                        <p class="p-owner">Sold by {item.Owner} </p>
                                        
                                        <div className="item-rating">
                                                            <Rate disabled defaultValue={item.Rating} />
                                                            </div>
                                                        
                                        <p class="p-price">Price:₦{item.Price}</p>
                                        <button 
                                        onClick={()=>this.openItem(`/categories/${item.Category}/${item.id}`)}
                                        class="btn">Open</button>
                                    </div>
                                </div>
                                                            </>
                                                        ))
                                                    }


                            </div>
                                
              </>
              
    );
  

}

export default Uploaded_Post