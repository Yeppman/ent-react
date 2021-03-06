import React, { Component } from 'react'
import Pusher from 'pusher-js';
 
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import {notification,message, Statistic} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import TemporaryDrawer from '../Sidebar/SideNav'

const Post_Analytics_url = 'https://backend-entr.herokuapp.com/analytics/full_analysis/'

const host = 'https://backend-entr.herokuapp.com'
const products_analysis_endpoint = host + `/analytics/product_views/`
const views_count_endpoint = host + '/analytics/count_products/'

var Main = []

class User_Analysis extends Component{
    state = {
       
        chartData : [],
        loading : false ,
        error : null , 

        productsFetched : [],
        post_views_x : [],
        post_name_y :[] ,
        average_views : [],
        total_post :null ,
        total_views: null,
        user_post : [], 

        results :[],
        Allocated_products_analysis_data:[],
        Total_Product_Views:0,
        Average_Product_Views:0,
        Count_Products:0,
          }
    
    Products_Analysis = async(token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get(products_analysis_endpoint)
      .then(res=>{
        this.setState({
          productsFetched : res.data
        })
      })


    //Assign Gotten Data into Chart.js for Processing and Visualization
    var Labels = []
    var DataPoints = []
    var Products_for_charts = this.state.productsFetched;
    console.log(Products_for_charts)
    //Maps Data to assigns data point and labels
     Products_for_charts.map((i)=>{
       var a = i['Title']
        var b = i['Views']
      Labels.push(a)
      DataPoints.push(b)
      console.log('The Labels',Labels)
     })

    this.setState({
        chartData:{
          labels: Labels.slice(0,3),
          datasets:[
            {
              label:'Impressions',
              data: DataPoints.slice(0,3),
              backgroundColor:[
                'rgb(148,0,211)'
              ]
            }
          ]
        }
    })
    console.log('Products Data',Main)
    console.log('Chart Labels', this.state.Allocated_products_analysis_data)

    //Caculates Average and Total Impressions
    Products_for_charts.map((i)=>{
       var b = i['Views']
     DataPoints.push(b)
     console.log('The Labels',Labels)
    })
    
    const len = DataPoints.length
    var Average_Impression = Math.round(DataPoints / len)
    var Total_Impression  = 100
    console.log('Impressions Here',Average_Impression,Total_Impression ,len)
    this.setState({
      average_views :Average_Impression,
      total_views:Total_Impression ,
      total_post:len
    })
 
    //Products Analysis Functions ends here
    }


        Insights = (token)=>{
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`
            };
            axios.get(views_count_endpoint)
            .then(res =>{
                this.setState({
                  Total_Product_Views:res.data.TotalViews,
                  Average_Product_Views:Math.round(res.data.AverageViews),
                  Count_Products:res.data.Count,
                });
                console.log('Impression',res.data)
            })
            .catch(e =>{
                console.log(e)
            })
        }

        componentDidMount(){
            
              this.Insights(this.props.token)
              this.Products_Analysis(this.props.token)
             }
          
         
      
            componentWillReceiveProps(newProps) {
              if (newProps.token !== this.props.token) {
                if (newProps.token !== undefined && newProps.token !== null) {
               
                  this.Insights(newProps.token)
                  this.Products_Analysis(newProps.token)

                }
              }
            }

            render(){
                const { Total_Product_Views,  Average_Product_Views , Count_Products} = this.state
                return(
                
                    <>

                        <TemporaryDrawer />

                        <div className="main">


                        <div className="fitter">
                        
                        <div className="infograph-card">
  
                                  <ul>
                                    
  
                                    <li className="">
                                    <div className="">
                                        <p className="Header">
                                        Average  Inmpressions
                                        </p>
  
                                        <div className="subHeader">
                                          <div className="left">
                                        
                                        <p>
                                        {Average_Product_Views} 
                                        </p>
  
                                          </div>
  
                                          <div className="right">
                                          
                                          </div>
  
                                        </div>
  
                                      </div>
                                    </li>
  
                                    <li className="">
                                    <div className="">
                                        <p className="Header">
                                        Total Impressions
                                        </p>
  
                                        <div className="subHeader">
                                          <div className="left">
                                         <p>{Total_Product_Views}</p> 
                                          </div>
  
                                          <div className="right">
                                          
                                          </div>
  
                                        </div>
  
                                      </div>
                                    </li>
  
                                    <li className="">
                                      <div className="">
                                          <p className="Header">
                                            Account Type
                                          </p>
  
                                          <div className="subHeader">
                                            <div className="left">
                                               
                                            <a href={`/vendor_quotes/`}>
                                                Click
                                                </a>
  
                                            </div>
  
                                            <div className="right">
                                            
                                            </div>
  
                                          </div>
  
                                      </div>
                                    </li>

                                    <li className="">
                                      <div className="">
                                          <p className="Header">
                                           Products
                                          </p>
  
                                          <div className="subHeader">
                                            <div className="left">
                                               
                                            {Count_Products}

                                            </div>
  
                                            <div className="right">
                                            
                                            </div>
  
                                          </div>
  
                                      </div>
                                    </li>
  
  
                                  </ul>
  
  
                                  </div>
  
                        </div>
  
                   
                   <div className="fitter">
                            <div className="oneBox-section">
                        <div className=".box ">
                        <div 
                     className="base-card ">
                     <Bar
                           className =""
                           data={this.state.chartData}
                           options={{
                            responsive: true,
                           maintainAspectRatio : true,
                           title:{
                           display:this.props.displayTitle,
                           text:'Largest Cities In '+this.props.location,
                           fontSize:25
                           },
                           legend:{
                           display:this.props.displayLegend,
                           position:this.props.legendPosition
                           
                           }
                           }}
                      />
                     </div>
                        </div>
                    </div>

                            </div>



                        </div>

                    </>


                )
            }


}



const mapStateToProps = state => {
    return {
      token: state.auth.token ,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
    };
  };
  
export default connect(
    mapStateToProps,
    null
  )(User_Analysis);