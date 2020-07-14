import React, { Component , useState } from 'react' 
import { List, Card} from 'antd';
import axios from "axios";
import Results from './Filter_results'
import { Link, withRouter } from 'react-router-dom';
import {Input} from 'antd'
// import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import Gallery from '../containers/Card_Carousel'

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const { Search } = Input

const post_list_url = 'https://backend-entr.herokuapp.com/core_api/post_list/'
const latest = 'https://backend-entr.herokuapp.com/core_api/latest_uploads/'
class All_Uploads extends Component{
    state = {
        'posts' : [] ,
        latest_posts : [] ,
        'error' : null ,
        'loading': true ,
        results: [],
        categories : [],
        skelenton  : true,
      } 
    
      Categories =async()=>{
        const categories_url = 'https://backend-entr.herokuapp.com/core_api/category_list/'
        await axios.get(categories_url)
        .then(res =>{
          this.setState({
            categories : res.data,
            skelenton: false
          })
          console.log('Categories include', res.data)
        })
      }

      Get_All_Uploads = async() => {

        const get_data = await fetch(post_list_url)
        const processed_data =  await get_data.json()
        console.log(processed_data)
        this.setState({
          'posts' : processed_data ,
        'error' : null ,
        'loading': false ,
        })

    }

    Latest_Uploads = async() =>{
        const get_data = await fetch(post_list_url)
        const processed_data =  await get_data.json()
        console.log(processed_data)
        this.setState({
          'latest_posts' : processed_data.slice(0,4) ,
        'error' : null ,
        'loading': false ,
        })

    }

    

    componentDidMount(){
        this.Latest_Uploads()
        this.Categories()
    }
    render(){
        const {posts , loading, error, results , latest_posts , categories} = this.state
        latest_posts.slice(0,4)
        return(

             
            <>
               
     
              <div className=" container mx-auto">
              <div className="grid grid-cols-6 intro_section ">

                <div className="intro_right col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <div className="">
                  <h3 className="intro_header">
                      Welcome to  Enterprise <br/>
                      
                  </h3>
                <p className="intro_text">
                       Enterprise is a virtual market place for small 
                      and medium business owners. The advantage of the  marketplace
                      has to do with marketing and 
                    branding which have a compelling attraction to buyers and users.
               Enterprise is to create a virtual market place for businesses and 
              sustainably capturing data and insights on the Market
                      </p>
                  </div> 
                
                </div>
                <div className=" intro_left col-span-6 sm:col-span-6 sm:ml-3 md:col-span-6 lg:col-span-2 xl:col-span-2 ">
                    <img 
                      className =""
                      style = {{width: 270}}
                      src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" />
                    </div>
         
            </div>
              </div>

                    <div className="container">
                    <div className=" enteprise-features-section">

                    <div className="enteprise-features-section-left">
                       <img 
                      className ="feature-image"               
                      src="https://omnibiz.com/wp-content/uploads/2019/12/contact-management-370x239.png" />
                
                   </div>

                <div className="enteprise-features-section-right">
                    <div className="feature-body">
                        <div className="feature-body-text-section">
                            <h3 className="feature-body-header">
                            Made for medium and small business
                            </h3>
                            <p className="feature-body-text">
                            Enterprise aims at providing a set of tools to develop and deepen
                   markets for micro/small and medium businesses, providing entrepreneurs 
                   across the sectors an opportunity to reach consumers –  boosting
                    brand names, sales, competitiveness and improving services
                            </p>

                        </div>

                    </div>
                </div>

                

              </div>

                    </div>

             <div className="container">
             <div className="stack-section">
                <div className="stack-boxes">

                  <div className="stack-card">
                      <div className="stack-card-body">
                          <div className="stack-card-image">
                          <img class="stack-card-image-display"
                           
                            alt="For International Businesses" 
                          src="https://assets.paystack.com/assets/img/content/For-International-Businesses_180823_165939.svg"/>
                          </div>
                          <h4 className="stack-card-header">
                            Enterprise for Africa
                          </h4>
                          <p className="stack-card-tetxt">
                          We help global brands  Africa to grow in size and yield
                          with our analysis, influencer marketing and utilities 
                          
                          </p>
                      </div>        
                </div>

                <div className="stack-card">
                      <div className="stack-card-body">
                      <div className="stack-card-image">
                          <img class="stack-card-image-display"
                          
                            alt="For International Businesses" 
                          src="https://assets.paystack.com/assets/img/content/For-Large-Corporations_180823_165502.svg"/>
                          </div>
                          <h4 className="stack-card-header">
                            Enterprise for Africa
                          </h4>
                          <p className="stack-card-tetxt">
                          From startup to scale-up, 
                          we can support you at every stage of your businesses’ growth
                          </p>
                      </div>        
                </div>

                <div className="stack-card">
                      <div className="stack-card-body">

                      <div className="stack-card-image">
                          <img class="stack-card-image-display"
                           
                            alt="For International Businesses" 
                          src="https://assets.paystack.com/assets/img/content/For-Entrepreneurs_180823_165709.svg"/>
                          </div>

                          <h4 className="stack-card-header">
                            Enterprise for Africa
                          </h4>
                          <p className="stack-card-tetxt">
                          Enterprise helps many of the SMEs businesses and 
                           organizations in Africa get paid quickly and securely.
                          </p>
                      </div>        
                </div>

                </div>
              </div>
             </div>


            
            
              <div class="py-12 bg-white container">
  <div class="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="lg:text-center">
      
      <h3 class="mt-2 text-3xl leading-8
      explore-text
        tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
      Explore the market place
      </h3>
      <p class="mt-4 max-w-2xl text-xl leading-7 text-gray-500 lg:mx-auto">
        
      </p>
    </div>

    <div class="mt-10">
      <ul class="md:grid md:grid-cols-2 md:col-gap-8 md:row-gap-10">
        <li>
          <div class="flex">
            <div class="flex-shrink-0">
              
            </div>
            <div class="ml-4">
              <h5

               class="text-lg explore-text  leading-6 font-medium text-gray-900">
                Branding
              </h5>
              <p class="mt-2 text- leading-6 text-gray-500">
                Enterprise  helps brand business assuring growth for registered businesses 
                on the platform
              </p>
            </div>
          </div>
        </li>
        <li class="mt-10 md:mt-0">
          <div class="flex">
            
            <div class="ml-4">
              <h5 class="text-lg explore-text  leading-6 font-medium text-gray-900">
              Content development
              </h5>
              <p class="mt-2 text- leading-6 text-gray-500">
                 Enterprise comes with content development to enable 
                growth for business registered on the platform
              </p>
            </div>
          </div>
        </li>
        
        <li class="mt-10 md:mt-0">
          <div class="flex">
            <div class="flex-shrink-0">
              
            </div>
            <div class="ml-4">
              <h5 class="text-lg explore-text leading-6 font-medium text-gray-900">
              Digital marketing
              </h5>
              <p class="mt-2 text- leading-6 text-gray-500">
                  The advantage of the Enterprise marketplace has to do with marketing
                  and branding which have a compelling attraction to buyers and users
              </p>
            </div>
          </div>
        </li>

        <li class="mt-10 md:mt-0">
          <div class="flex">
            <div class="flex-shrink-0">
              
            </div>
            <div class="ml-4">
              <h5 class="text-lg explore-text leading-6 font-medium text-gray-900">
              Data and analytics
              </h5>
              <p class="mt-2 text- leading-6 text-gray-500">
                Enterprise provides data and analytics for users
                to the  monitor growth of their products and services
              </p>
            </div>
          </div>
        </li>

        
      </ul>
    </div>
  </div>
</div>
            

          
                        </>

        )
    }


}

export default All_Uploads 