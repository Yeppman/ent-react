import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import * as actions from '../../store/actions/auth';

import * as actions from '../../../store/actions/auth'

import { Input } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import axios from 'axios'



const host = 'https://backend-entr.herokuapp.com'

const Search = Input.Search;


class ExciteNav extends React.Component{
    state = {
        categories : [],
        loading:true,
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

   promptSearch = async(e)=>{
    e.preventDefault()
    
    const search_input = e.target.elements.searching_box.value;
    const endpoint = `/search_query/${search_input}/`
   window.location.replace(endpoint)

    }

   handleLogout = () =>{
    window.location.reload()
    this.props.logout();
   
  }
   

    componentDidMount(){
        this.Categories()
        console.log(this.props.token);

    }

    // componentDidMount(){

    //     if (this.props.token !== undefined && this.props.token !== null) {
    //       this.Categories() 
    //     }
    //   }
      
    //   componentWillReceiveProps(newProps) {
    //     if (newProps.token !== this.props.token) {
    //       if (newProps.token !== undefined && newProps.token !== null) {
    //         this.Categories(newProps.token)
    //         this.Latest_Products(newProps.token)
    //        // this.Account_Type(this.props.token)
    //           this.Latest_Products(newProps.token)
    //      }
    //     }
    //   }
    

    render(){
        const {categories} = this.state
        const {token, isAuth,is_seller, is_buyer} = this.props

        const suffix = (
            <AudioOutlined
              style={{
                fontSize: 16,
                color: '#1890ff',
              }}
            />
          );
        return(
            <>
                 <div>
            <div className="nav">
                <div className="nav-box">
                    <div className="nav-list-link " ><a href="#home"><span className="ent-link">Enterprise</span></a></div>
                
                    <div className="nav-list-link link-k">
                   
                    <input 
                    className="nav-search"
                    value=""
                    type="text" placeholder="Search Products or Services" /> 
                    

                    </div>
                    

                {isAuth ? (
                    <>
                        {
                             is_seller ?(
                                <div className="nav-list-link link-b"  style={{float:'right'}}>
                                    <Link to="/dashboard">
                                    Dashboard
                                    </Link>
                                </div>
                        ):(
                            <li> </li>
                        )


                        }
                    <div className="nav-list-link link-b"  style={{float:'right'}}>
                        <a href='#'onClick={this.props.logout} >Logout</a>
                    </div>

                    
                </>
                    ) : (
                    <>
                        <div className="nav-list-link link-b" style={{float:'right'}}>
                        <a href="/login">Login</a>
                        </div>
                        <div className="nav-list-link link-b"  style={{float:'right'}}>
                            <a href="/register/">Sign up</a>
                        </div>
                     </>
                )}

                </div>

                <div className="cat-box">

                    {
                        categories.map((c)=>(
                            <>
                            <div className="cat-link">
                            <a
                             onClick={()=>{this.redirect_page(c.CategoryKey)}}
                             href> {c.CategoryName}</a>
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



const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      is_buyer:state.auth.is_buyer,
    };
  };
  

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExciteNav));