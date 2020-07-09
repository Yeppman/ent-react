import React , {  Component }from 'react';
import {Rate} from 'antd'
//import { Link, withRouter } from 'react-router-dom';
import axios from 'axios'
import TemporaryDrawer from '../Sidebar/SideNav'

const host = 'https://backend-entr.herokuapp.com'

class InflunencerMarketingPortal extends Component{
    state ={
        categories:[] ,
        loading: true,
    }

    

    redirect_page=()=>{
    
        const endpoint = '/create-campaign/'
        window.location.replace(endpoint)
       }
       

       componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
        }
        }
      }

    render(){
        const {categories} = this.state
        return(
            <>
                <TemporaryDrawer />

                <div className="container">
                    <div className="grid-cols-4 grid ">
                        <div className="col-span-4">
                        <p style={{fontSize:30, textAlign:"center", paddingTop:10}}>
                        Select A Category
                    </p>
                        </div>
                    </div>
                </div>

            <div className="container">
                <div className="grid grid-cols-8 gap-4">
                    
                <div
                            
                            className=" col-span-4 sm:col-span-4
                            md:col-span-4 xl:col-span-2 lg:col-span-2">
                               
                                   <div 
                                   onClick={this.redirect_page}
                                   className="create-post-box">
                                    <div className="create-post-box-content">
                                       <div className="create-post-box-content-icon">
                                       </div>
                                       <div className="create-post-box-title">
                                       <p onClick>
                                        Online
                                       </p>
                                           
                                   </div>
                               </div>
                               </div>

                            </div>

                            <div
                            
                            className=" col-span-4 sm:col-span-4
                            md:col-span-4 xl:col-span-2 lg:col-span-2">
                               
                                   <div className="create-post-box">
                                    <div className="create-post-box-content">
                                       <div className="create-post-box-content-icon">
                                       </div>
                                       <div className="create-post-box-title">
                                       <p onClick>
                                        Offline
                                       </p>
                                           
                                   </div>
                               </div>
                               </div>

                            </div>
                    
                </div>
            </div>

        </>
        )
    }

}

export default InflunencerMarketingPortal;