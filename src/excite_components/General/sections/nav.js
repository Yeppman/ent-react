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


class Nav extends React.Component{
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

   handleLogout = () =>{
    window.location.reload()
    this.props.logout();
   
  }
   

    componentDidMount(){
        this.Categories()
    }

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
                    <div className="nav-list-link " ><a href="#home"><span className="link-a">Excite</span></a></div>
                    <div className="nav-list-link"><a  href="#news">News</a></div>
                    <div className="nav-list-link"><a  href="#news">About</a></div>
                    <div className="nav-list-link link-k">
                        <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    </div>
                    
                    {
                 is_seller ?(
                    <div className="nav-list-link link-b" style={{float:"right"}}
                            >
                           <Link to="/dashboard">
                    Dashboard
                    </Link>
                             </div>

                  ):
                  (
                      <li></li>
                      )
                }

                    {
                        isAuth ? (
                             <>
                            <div className="nav-list-link link-b" style={{float:"right"}}
                            ><a 
                             onClick={ this.handleLogout()}
                             href="#contact">Logout</a>
                             </div>
                            </>
                        ) : (

                            <>
                            <div className="nav-list-link link-b" style={{float:"right"}}><a href="/login">Login</a></div>
                    <div className="nav-list-link link-b" style={{float:"right"}}><a   href="/register">Register</a></div>
                            </>        
                    
                        )
                    }
                
                    {
                        isAuth ? (
                            <>
                            <div >
                        <a  href="#contact" style={{float:"right"}}> 
                            <span className=" cart">My Cart</span>
                        </a>
                    </div>
                            </>
                        ) : (
                                <>
                                    <p></p>
                                </>
                        )
                    }
                    

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
