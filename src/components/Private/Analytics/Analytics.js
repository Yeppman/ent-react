import React, { Component } from 'react'
import Pusher from 'pusher-js';
 
import { Link, withRouter } from 'react-router-dom';
import {Bar, Line} from 'react-chartjs-2';
import axios from "axios";
import { connect } from "react-redux";
import {notification,message, Statistic} from 'antd'
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

import TemporaryDrawer from '../Sidebar/SideNav'

const Post_Analytics_url = 'http://127.0.0.1:8000/analytics/full_analysis/'
class User_Analysis extends Component{
    state = {
       
        chartData : [],
        loading : false ,
        error : null , 
        post_views_x : [],
        post_name_y :[] ,
        average_views : [],
        total_post :null ,
        total_views: null,
        user_post : [], 
          }
    

    Analysis = async(token) =>{
        const Data_Labels = []
        const Data_Points = []
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        await axios.get(Post_Analytics_url)
        .then(
            res =>{
             const Fetched_Data = res.data
              const New_Data ={
               'Labels': res.data.PostLabels,
               'Points': res.data.PostViews,
             }
             
              this.setState({
                chartData:{
                  labels: Fetched_Data.PostLabels,
                  datasets:[
                    {
                      label:'Impressions',
                      data: Fetched_Data.PostViews ,
                      backgroundColor:[
                        
                        'rgb(148,0,211)'
                      ]
                    }
                  ]
                }
              })
               console.log('Analysis',New_Data)
            } )

        }

        Insights = (token)=>{
            axios.defaults.headers = {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`
            };
          axios.get(Post_Analytics_url)
          .then(res =>{
              this.setState({
                post_name_y : res.data.PostLabels,
                post_views_x : res.data.PostViews,
                average_views : Math.round(res.data.Average_view),
                total_post : res.data.Count_Uploads ,
                total_views: res.data.Total_Views,
              }); console.log('Impression',res.data)
          })
          .catch(e =>{
              console.log(e)
          })
      }

        componentDidMount(){
            //this.test_ws()
              this.Analysis(this.props.token)
              this.Insights(this.props.token)
             }
          
         
      
            componentWillReceiveProps(newProps) {
              if (newProps.token !== this.props.token) {
                if (newProps.token !== undefined && newProps.token !== null) {
                  this.Analysis(newProps.token)
                  this.Insights(newProps.token)
                }
              }
            }

            render(){
                const {profile , average_views, user_post, total_post , total_views} = this.state
                return(
                
                    <>

                        <TemporaryDrawer />

                        <div
                  style={{paddingLeft:20}}
                   className="container mx-auto ">
                    
                    <div className="grid grid-cols-4 ">
                    
  
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="top-card">
                            
                        <div className="top-card-title">
                            <h3 className="top-card-title">
                            Average  Inmpressions
                            </h3>
                        </div>
                          <div className="top-card-text">
                         <Statistic
                            title
                            value={average_views} 
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="views"
                        />       
                          </div>
                        </div>
                    </div> 
   
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="top-card">
                            
                        <div className="top-card-title">
                            <h3 className="top-card-title">
                              Total Impressions
                            </h3>
                        </div>
                          <div className="top-card-text">
                         <Statistic
                            title
                            value={total_views} 
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<ArrowUpOutlined />}
                            suffix="views"
                        />       
                          </div>
                        </div>
                    </div> 
   
  
                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="top-card">
                            
                        <div className="top-card-title">
                            <h3 className="top-card-title">
                              Quotes
                            </h3>
                        </div>
                          <div className="top-card-text">
                          <a href={`/vendor_quotes/`}>
                          Click
                          </a>
                          </div>
                        </div>
                    </div>


                    <div className="col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 xl:col-span-1">
                        <div className="top-card">
                            
                        <div className="top-card-title">
                            <h3 className="top-card-title">
                              Uploads
                            </h3>
                        </div>
                          <div className="top-card-text">
                            {total_post}
                          </div>
                        </div>
                    </div>

  
                    </div>
  
                  </div>   

                   
                   <div className="container mx-auto">
                            <div className="grid grid-cols-10">
                        <div className="col-span-10  sm:col-span-10 md:col-span-10 lg:col-span-10 xl:col-span-10 ">
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