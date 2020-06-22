import React , {  Component }from 'react';
import {Rate} from 'antd'
//import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'

const host = 'http://127.0.0.1:8000'

class Create_Post_Portal extends Component{
    state ={
        categories:[] ,
        loading: true,
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

    redirect_page=(create_slug, category_id)=>{
    
        const endpoint = `/create/portal/${create_slug}/${category_id}/`
        window.location.replace(endpoint)
       }
       

    componentDidMount(){
        this.Categories()
    }

    componentWillReceiveProps(){}

    render(){
        const {categories} = this.state
        return(
            <>

                <div className="col-span-1">
                    <p style={{fontSize:30, textAlign:"center", paddingTop:10}}>
                        Select A Category
                    </p>
                </div>

            <div className="container">
                <div className="grid grid-cols-8">
                    {
                        categories.map((c)=>(
                            <div className=" col-span-2 sm:col-span-4
                             md:col-span-4 xl:col-span-2 lg:col-span-2">
                                
                                    <div className="create-post-box">
                                     <div className="create-post-box-content">
                                        <div className="create-post-box-content-icon">
                                        </div>
                                        <div className="create-post-box-title">
                                        <p onClick={()=>{this.redirect_page(c.CategoryKey, c.id)}}>
                                        {c.CategoryName}
                                        </p>
                                            
                                        </div>
                                    </div>
                                    </div>

                             </div>
                        ))
                    }
                </div>
            </div>

        </>
        )
    }

}

export default Create_Post_Portal;