import React , {  Component }from 'react';
import axios from 'axios'
//import { Link, withRouter } from 'react-router-dom';
 
import {
    Form,
    Select,
    Input,
    Button, 
  } from "antd";

  import ExciteNav from '../../sections/nav'
  import Nav from '../../../containers/nav'

import Query_Results from '../../Queried_Results'

import Uploaded_Post from '../../Items'

 
const Search = Input.Search;
const { Option } = Select;



const host = 'https://backend-entr.herokuapp.com';
const slug = 'vehicles'

const vehicle_model = ['Audi','Honda','BMW','Bentley', 'Ferrari']
const transmission_type = ['Manual', 'Auto']
const Fuel_type = ['Petrol','Diesel','Hybrid','Electric']
const Body_type = ['Aluminuim','Carbon Fibre']
const condition = ['New','Fairly Used']
const color = ['Black', 'Red','Blue','Green']


class Vehicle_Items extends Component{
    state = {
        items : [],
        loading : true,
        error:null,

        search_results :[],
        loading_query : false,


        show_results : true,
        categories : [],

    }

    

    Get_Items = async()=>{
      const endpoint = host + `/retail/item-category-list/`
      await axios.get(endpoint,{
          params:{
              slug
          }
      } )
        .then(res=>{
            this.setState({
                items: res.data,
                loading: false,
            })
            console.log('items', res.data)
        })
    }

    Search_Query = (values,err) =>{
       const title =  
            values["title"] === undefined ? null : values["title"] ;
        const vehicle_model = 
            values["vehicle_model"] === undefined ? null : values["vehicle_model"] ;
        
        const transmission_type = 
            values['transmission_type'] === undefined ? null : values['transmission_type'] ;
        const condition_type = 
            values['condition_type'] === undefined ? null : values['condition_type'] ;
        const mileage = 
            values['mileage'] === undefined ? null : values['mileage'] ;
        const fuel_type = 
            values['fuel_type'] === undefined ? null : values['fuel_type'] ;
       
        const price = 
            values['price'] === undefined ? null : values['price'] ;
        const body_type = 
          values['body_type'] === undefined ? null : values['body_type'] ;
  
       
        if(!err){
            const endpoint_value ='search_vehicles'
            const Query_Url = host + `/retail/${endpoint_value}/`
            
            axios.get(Query_Url,{params:{
                title,mileage,vehicle_model,
                fuel_type, condition_type,transmission_type, 
                price ,body_type
                    
            }})
            .then(res=>{
                this.setState({
                    search_results: res.data,
                    show_results: false,
                })
                console.log('search result', res.data)
            })
            .catch(e=>{
                console.log(e)
            })
        }
          //search query contents ends here
      };

      componentDidMount(){
        this.Get_Items()
      }

    render(){
        const {items,categories,  loading ,search_results , show_results, error } = this.state
        const query_results = search_results
        return(
            <>
      <ExciteNav/>
<div
    style={{paddingTop:50}}
    className="container mx-auto ">
            <div className="grid grid-cols-8 gap-4  mx-auto">
        
  
          <div className="col-span-8  sm:col-span-8  md:col-span-8 lg:col-span-2 xl:col-span-2">
                <Form  onFinish={this.Search_Query}>
                  <Form.Item>
                  
                </Form.Item>
                <Form.Item name ="title">
                  
                <Input placeholder=" Title " />
                    
                </Form.Item>

                <Form.Item name ="vehicle_model">
                      <Select placeholder ="Manufacturer">
                        {
                            vehicle_model.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>


                <Form.Item name ="color">
                      <Select placeholder ="Color">
                        {
                            color.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>
                
                <Form.Item name ="condition_type">
                      <Select placeholder ="Condition">
                        {
                            condition.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name ="fuel_type">
                      <Select placeholder ="Fuel Type">
                        {
                            Fuel_type.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name ="body_type">
                      <Select placeholder ="Body Type">
                        {
                            Body_type.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name ="transmission_type">
                      <Select placeholder ="Body Type">
                        {
                            transmission_type.map((b)=>(
                                <>
                                
                                <Option value={b}>{b}</Option>
                                </>
                            ))
                        }
                      </Select>
                </Form.Item>

                <Form.Item name = "State">
                      <Select placeholder ="Select a State">
                      <Option value=""></Option>
                      <Option value="Lagos">Lagos</Option>
                      <Option value="Calabar">Calabar</Option>
                      <Option value="Uyo">Uyo</Option>
                      </Select>
                </Form.Item>
           

               
                  <Form.Item >
                  
                  <div>
                
                  <Form.Item name = "Price_Range" style={{ marginBottom: 0 }}>
                        <Form.Item
                        name="year"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                        <Input placeholder="Starting Price" />
                        </Form.Item>
                        <Form.Item
                        name="month"
                        
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                        <Input placeholder="Closing Price" />
                        </Form.Item>
                    </Form.Item>

              </div>

                  </Form.Item>

                  <Form.Item >
                    <button className="login-button" type="primary" htmlType="submit">
                      Filter
                    </button>
                  </Form.Item>
                </Form>
          
                  

          </div>
          <div className=" mx-3 col-span-8  sm:col-span-8
                md:col-span-8 lg:col-span-6 xl:col-span-6 gap-3">
                  {
                  show_results ?(
                    <Uploaded_Post slug_class={slug}  Items={items}/>
                  ):(
                   <Query_Results  slug_class={slug} Results={search_results}/>
                  )
                }
 
              </div>
            </div>
        </div>



            </>
        )
    }


}

export default Vehicle_Items;