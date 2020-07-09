import React , {  Component }from 'react';
import {Rate} from 'antd'
import { Link, withRouter } from 'react-router-dom';


const User_Uploaded_Post = props =>{
    const searched_items =  props.Items
    
    return(
        <>
                         
               {
                searched_items.map((item)=>(
                    <div className="col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-2 lg:col-span-3" >
                    <div className="post-box">
                    <div className="post-image">
                        <img className="post-image-render"
                          src={item.Image1}
                          />
                    </div>    
                    <div className="post-content-prime">
                        <div className="post-content-header">
                        {item.Title}
                        </div>
                        <div className="post-content-star-rating">
                        <Rate disabled defaultValue={3} />
                        </div>
                        <div className="post-content-body">
                            <p>
                            <a 
                            href={`/post_detail/${item.id}`}
                            style={{color:"#434343"}} >
                            {item.Description.length < 50 ? 
                             `${item.Description}` : `${item.Description.substring(0, 300)}...` }
                            </a>
                            </p>
                        </div>
                        <div className="post-content-price">
                            <p>
                           {item.Price}
                            </p>
                        </div>
                    </div>
                </div>
                                </div>
                   ))
               } 
                
          
                    </>
    )
}


export default User_Uploaded_Post