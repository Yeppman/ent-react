import React, { Component  } from 'react' 
import axios from "axios";

import {Rate} from 'antd'
//import Uploaded_Post from './Items'

const host = 'http://127.0.0.1:8000'
const search_url = host + `/retail/search_models/`

const Electronics_Array = new Array()
const Services_Array = new Array()
const Fashion_Array = new Array()
const Phones_Array = new Array()
const Property_Array = new Array()
const Vehicles_Array = new Array()
const Home_App_Array = new Array()

var Main = new Array()

export default class Basic_Query  extends Component {

    state={
        results:[],
        loading: false ,

        electronics_results: false,
        services_results : false,
        phones_results : false,
        property_results : false,
        home_app_results : false ,
        vehicles_results: false,
        fashion_results: false,
        

    }
    
    
    Query = async()=>{
        const Title = this.props.match.params.Title
        await axios.get(search_url, {'params':{Title}})
        
        .then(res=>{
            this.setState({
                results:res.data
            })
           

            if (this.state.results.Electronics.length > 0){
                var ele_data = this.state.results.Electronics
                this.state.electronics_results =  true
                var dummy = []
                dummy.push(ele_data)
                Electronics_Array.push(ele_data)
                
                ele_data.map((i)=>{
                    var a = {
                        id : i['id'] ,
                    category : i['Category'],
                    title : i['Title'],
                    Owner : i['Owner'],
                    Owner_id : i['Owner_id'],
                    PostDate : i['PostDate'],
                    Price : i['PostDate'],
                    Image1  : i['Image1'],
                    Rating : i['Rating'] ,
                   }
                   JSON.stringify(a)
                   Main.push(a)
                    
                })
               

            }

            if (this.state.results.Fashion.length > 0){
                var fashion_data = this.state.results.Fashion
                this.state.fashion_results =  true
                Fashion_Array.push(fashion_data)
                

            }

            if (this.state.results.Services.length > 0){
                var services_data = this.state.results.Services
                this.state.services_results =  true
                Services_Array.push(services_data)

            }

            if (this.state.results.HomeAppliances.length > 0){
                var home_app = this.state.results.HomeAppliances
                this.state.home_app_results =  true
                Home_App_Array.push(home_app)


            }
            
            if (this.state.results.Phones.length > 0){
                var phone_data = this.state.results.Phones
                this.state.phones_results =  true
                Phones_Array.push(phone_data)

            }

            if (this.state.results.Property.length > 0){
                var property_data = this.state.results.Property
                this.state.property_results =  true
                Property_Array.push(property_data)

                
            }
            
            if (this.state.results.Vehicles.length > 0){
                var vehicle_data = this.state.results.Vehicles
                this.state.vehicles_result =  true
                Vehicles_Array.push(vehicle_data)

                
            }
            //Complies and Append
            
            console.log(res.data)
        })
        .catch(e=>{console.log(e)})
    }

    componentDidMount(){
        this.Query()

    }

    render(){
        const {results, electronics_results, services_results, phones_results, property_results,
            home_app_results, vehicles_result, fashion_results} = this.state
        console.log(Main)
        //<Uploaded_Post slug_class={slug}  Items={items}/>
        return(
            <>
               <div>
                   {
                       electronics_results ?(
                        <div className="container">
                    <div className="grid grid-cols-8 gap-3">
                            
                    {
                                    Electronics_Array.map((item)=>(
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
                       ):(
                            <p>
                                
                            </p>
                       )
                   }
               </div>
            </>
        )
    }

}