import React, { Component , useState } from 'react' 

import axios from "axios";
import { connect } from "react-redux";
import {Rate} from 'antd'
import {EnvironmentOutlined ,TeamOutlined, CreditCardOutlined} from '@ant-design/icons'



//import Nav from './sections/nav'
import Header from './sections/header'
import Boxes from './sections/boxes'
import Nav from '../containers/nav'

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
       // this.Account_Type(this.props.token)
          this.Latest_Products()
        
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
 

                            <div className="wrapper">
                                <div className="shop">
                                    <div className="products">
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
                        <p class="p-owner">Sold by <small>{item.Owner}</small></p>
                        <p class="p-price">Price: <sup>$</sup>{item.Price}</p>
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
                            </div>



    

              </>
          )
      }

      




}

