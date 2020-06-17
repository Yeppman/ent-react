import React, { Component , useState } from 'react' 
import {
  Form,
  Input,
   
  
} from "antd";
import {  ToolOutlined } from '@ant-design/icons';
import axios from "axios";

//import { SnapList, SnapItem } from 'react-snaplist-carousel';

//import Results from "./Results";


const host = 'https://ent-react.vercel.app'

class Enterprise_Showcase extends Component{
  search_url = 'https://ent-react.vercel.app/core_api/post_filter/'
  state = {
    results: [],
    loading: false,
    error: null ,
    show_res : true,
    categories : [],
    
  };

 
 Categories = async() =>{
    
    const category_url = host + `/retail/categories/`
    await axios.get(category_url).then( res =>{
        this.setState({
            categories : res.data ,
            loading : false
        });console.log(res.data)
            });  
   };

   redirect_page=(category_slug)=>{
    
    const endpoint = `/categories/${category_slug}/`
    window.location.replace(endpoint)
   }
   
   Search_Products(e){
     e.preventDefault()
    
     const search_input = e.target.elements.searching_box.value;
     const endpoint = `/search_query/${search_input}/`
    window.location.replace(endpoint)
   }

  componentWillMount = ()=>{
      this.Categories()
    }
    // end of process query function`
 
  render() {
      const { error, loading, results , categories, show_res} = this.state;
     
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 3 }
      };
  return (
                     
          <>

      <div className="introduction-section">

            <div className="grid grid-cols-1">
              
                <div className="">
                    <div className="introduction-section-heading">
                      <p className="introduction-section-heading-text">
                        Buy & Sell with from the
                        <br/> best of 
                        products and Services in
                        Nigeria
                      </p>
                      <div className="introduction-section-search-form">
                      <form onSubmit={this.Search_Products} >
                        <div>
                        <input 
                          name="searching_box"
                          type="text"
                          placeholder="Search for products/services"
                          className="introduction-section-search-input" />  

                        </div>
                          <div className="">
                            <button className="introduction-section-search-button">
                            Search
                           </button>
                          </div>
                     </form>
                        
                      </div>
                  </div>
                </div>

            </div>


       </div>

   <div
            style={{paddingTop:30}}
            className="container mx-auto category-section ">
            <div className="grid grid-cols-8  mx-auto">

                {
                    categories.map((c)=>(
                        <>
                        <div className="col-span-8  sm:col-span-4  md:col-span-4
                 lg:col-span-2 xl:col-span-2">
          
                    <div className="category-box">
                            <div 
                             className="category-box-content">
                                <div 
                               
                                className="category-box-content-icon">
                                
                                </div>
                            </div>
                            <div className="category-box-heading-section">
                                <p
                                onClick={()=>{this.redirect_page(c.CategoryKey)}}
                                 className="category-title">
                                    {c.CategoryName}
                                </p>
                            </div>
                    </div>  

                </div>
                        </>
                    ))
                }
                        
                
              
            </div>
        </div>
                
          </>    
      );
 }
}

export default Enterprise_Showcase