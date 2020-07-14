import React, { Component , useState } from 'react' 

import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'


import Nav from './sections/nav'
import Header from './sections/header'
import Boxes from './sections/boxes'
//import Nav from '../containers/nav'

//import '../assets/home/home.css'


const host = 'https://backend-entr.herokuapp.com'
export default class Homepage extends React.Component{
    state = {
        NewProducts : [] ,
    }

    Latest_Products =  async()=>{
        const Title = this.props.match.params.Title
        const endpoint = host + '/retail/latest_uploads/'
        await axios.get(endpoint)
        .then(res =>{
          if (res.status == 200){
            this.setState({
              NewProducts: res.data
            })
            console.log(res.data)
          }else{
            console.log()
          }
        })
      }

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
    
       openItem(url){
         const endpoint = url
         window.location.replace(endpoint)
       }
       
    //    Search_Products(e){
    //      e.preventDefault()
        
    //      const search_input = e.target.elements.searching_box.value;
    //      const endpoint = `/search_query/${search_input}/`
    //     window.location.replace(endpoint)
    //    }

      componentDidMount(){
        
        this.Categories()
        this.Latest_Products()
   
          this.Latest_Products()
        if (this.props.token !== undefined && this.props.token !== null) {
          this.Categories(this.props.token)
        this.Latest_Products(this.props.token)
       
          this.Latest_Products(this.props.token)
              
        }
      }
      
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Categories(newProps.token)
            this.Latest_Products(newProps.token)
           // this.Account_Type(this.props.token)
              this.Latest_Products(newProps.token)
         }
        }
      }
    
    
      render(){
          const {NewProducts}  = this.state
          return(
              <>
                <div>
            <Nav />
                        <div className="container">
                            <Header />
                            <Boxes />
                        </div>
                        
                    </div>
 

                            <div className="fitter">
                                <div className="shop">
                                    <div className="products">
                                  
                                    </div>
                                </div>
                            </div>


                            <div>

            <div class="fitter">
        <section class="shop">
           <div className="s-card">
           <h1 
           
           className="s-text"><b>Latest Products</b></h1>

           <div class="products">

           {
                                        NewProducts.map((item)=>(
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
           </div>
        </section>
    </div>
        </div>



    

              </>
          )
      }

      




}

