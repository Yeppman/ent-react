import React, { Component  } from 'react' 
import axios from "axios";

import {Rate} from 'antd'
//import Uploaded_Post from './Items'

const host = 'back-ent.herokuapp.com'
const search_url = host + `/retail/search_models/`


var Main = []

export default class Basic_Query  extends Component {

    state={
        results:[],
        loading: false ,

        electronics_results: true,
        services_results : false,
        phones_results : false,
        property_results : false,
        home_app_results : false ,
        vehicles_results: false,
        fashion_results: false,
        
        Allocated_Results:[],

    }
    
    
    Query = async()=>{
        const Title = this.props.match.params.Title
        await axios.get(search_url, {'params':{Title}})
        .then(res=>{
            this.setState({
                results:res.data
            })
           

            if (this.state.results.Electronics.length > 0){
                var electronics_data = this.state.results.Electronics
                
                electronics_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })
               
            }

            if (this.state.results.Fashion.length > 0){
                var fashion_data = this.state.results.Fashion
                
                
                fashion_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.Services.length > 0){
                var services_data = this.state.results.Services
                
                
                services_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.HomeAppliances.length > 0){
                var home_app = this.state.results.HomeAppliances
               
                home_app.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })


            }
            
            if (this.state.results.Phones.length > 0){
                var phone_data = this.state.results.Phones
           
                phone_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

            }

            if (this.state.results.Property.length > 0){
                var property_data = this.state.results.Property
         
                property_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

                
            }
            
            if (this.state.results.Vehicles.length > 0){
                var vehicle_data = this.state.results.Vehicles
          
                
                vehicle_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    Title : i['Title'],
                    Description: i['Description'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['Price'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                   
                })
                this.setState({
                    Allocated_Results:Main
                })

                
            }
            //Complies and Append
            console.log('these are the results data', this.state.Allocated_Results)
            console.log(res.data)
        })
        .catch(e=>{console.log(e)})
    }

    componentDidMount(){
        this.Query()

    }

    render(){
        const {Allocated_Results} = this.state
        console.log(Main)
        
        return(
            <>
                <div className="container">
                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                                 Allocated_Results.map((item)=>(
                                       <>
                                       <div className=" col-span-4  sm:col-span-4
                            md:col-span-4 lg:col-span-4 xl:col-span-4 gap-3">
                                        <div className="post-box">
                                        <div className="post-image">
                                            <img className="post-image-render"
                                                href={`/categories/${item.category}/${item.id}`}
                                                src={item.Image1}
                                                />
                                        </div>    
                                        <div className="post-content-prime">
                                            <div className="post-content-header">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            {item.Title}
                                            </a>
                                            
                                            </div>
                                            <div className="post-content-star-rating">
                                            <Rate disabled defaultValue={item.Rating} />
                                            </div>

                                            <div className="post-content-body">
                                                 <p
                                                  style={{color:"#434343"}}>
                                                    Category : {item.category}
                                                </p>
                                            </div>
                                            <div className="post-content-body">
                                                
                                                <br/>
                                                <p>
                                                <a 
                                                href={`/categories/${item.category}/${item.id}`}
                                                style={{color:"#434343"}} >
                                                {item.Description.length < 50 ? 
                                                `${item.Description}` : `${item.Description.substring(0, 300)}...` }
                                                </a>
                                                </p>
                                            </div>
                                            <div className="post-content-price">
                                            <a  
                                            style={{color:"#434343"}}
                                            href={`/categories/${item.category}/${item.id}`}>
                                            ₦{item.Price}
                                            </a>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                       </>
                                        ))
                                    } 
          
    
        
                         
                    </div>
                </div>
            </>
        )
    }

}