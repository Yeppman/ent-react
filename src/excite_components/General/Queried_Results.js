import React from 'react';
import {Rate} from 'antd';
import { Link, withRouter } from 'react-router-dom';


const Query_Results = props =>{
    const searched_items =  props.Results
    const items_props = props.Items
    const slug = props.slug_class
    
    return(
        <>
                         
                         <div class="products">

{
    searched_items.map((item)=>(
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
    )
}

export default Query_Results;