import React , { useState, Component }from 'react';
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom';
import { Form,Select, Input} from 'antd';
import Query_Results from '../../Queried_Results'


const host = 'https://backend-entr.herokuapp.com'
class Jobs_Items extends Component{
    state = {
        items : [],
        loading : true,
        error:null,

        search_results :[],
        loading_query : false,

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
        })
    }

    
    Search_Query = (values,err) =>{
    
       const title =  
            values["title"] === undefined ? null : values["title"] ;
        const field =  
            values["field"] === undefined ? null : values["field"] ;
        const salary =  
            values["salary"] === undefined ? null : values["salary"] ;
        const job_type =  
            values["job_type"] === undefined ? null : values["job_type"] ;
    
        if(!err){
            const endpoint_value ='search_jobs'
            const Query_Url = host + `/retail/${endpoint_value}/`
            axios.get(Query_Url,{params:{
                title, field, salary , job_type
            }})
            .then(res=>{
                this.setState({
                    search_results: res.data
                })
            })
            .catch(e=>{
                console.log(e)
            })
        }
          //search query contents ends here
      };

      componentDidMount(){
        this.Get_Items
      }

    render(){
        const {items, loading ,search_results } = this.state
        const query_results = search_results
        return(
            <>


            </>
        )
    }


}

export default Jobs_Items;