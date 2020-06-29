import React from 'react';
import {Rate} from 'antd';
import { Link, withRouter } from 'react-router-dom';


const Query_Results = props =>{
    const searched_items =  props.Results
    const items_props = props.Items
    const slug = props.slug_class
    
    return(
        <>
                         
               {
                searched_items.map((item)=>(
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
    )
}

export default Query_Results;