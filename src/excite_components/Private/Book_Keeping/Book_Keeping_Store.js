import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'

import SimpleTable from './table'
import New_Book from './Create_Book'

const host = 'https://backend-entr.herokuapp.com'
const endpoint = host + '/management/book_keeping_list/'



class BookKeepingList extends Component {
    
    state = {
      book_data: [],
      loading: false,

      Price:0,
      Total_Obj:0,
      AllowUser:false,
    }

    Fetch_Legder = async(token) => {
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios.get(endpoint)
        .then(res => {
            this.setState({
                book_data:res.data, 
                loading:false
            })
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    Book_Data  = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + "/management/bk-data/"
      await axios.get(endpoint)
      .then(res=>{
        this.setState({
          Price : res.data.Price ,
          Total_Obj : res.data.Total
        })
        console.log('Price and Items Count', res.data)
      })
    } 

    
    GrantUser = false
    accountType = async (token)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + '/stream/user_membership'
      await axios.get(endpoint)
      .then(res=>{
          const planMode = res.data[0].membership
          console.log('the plan',planMode)
          if (planMode=='Basic' || planMode == 'Premium'){
            this.setState({
              AllowUser:true
            })
            console.log(this.state.AllowUser)
            this.GrantUser = true
            
        }
      })
     
    }

    //Redirects to create new book store instance
    redirect_to_create(){
      window.location.replace('/create_new_record')
    }

    componentDidMount() {
      
        if (this.props.token !== undefined && this.props.token !== null) {
          this.accountType(this.props.token)
          this.Fetch_Legder(this.props.token)
          this.Book_Data(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Fetch_Legder(newProps.token)
            this.accountType(newProps.token)
            this.Book_Data(newProps.token)
          }
        }
      }

    render() {
      const {book_data, AllowUser , Total_Obj,Price } =  this.state
      const planMode = this.props.membership_type
      
        return (
            <>
             {
               AllowUser?(
                <>
                <TemporaryDrawer />

                <div className="main">
                              <div className="container">

              <div className="grid grid-cols-8">
                        <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                            <div className="top-card">
                                
                            <div className="top-card-title">
                                <h3 className="top-card-title">
                                  Items
                                </h3>
                            </div>
                              <div className="top-card-text">
                                {Total_Obj}
                              </div>
                            </div>
                        </div> 

                        <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                            <div className="top-card">
                                
                            <div className="top-card-title">
                                <h3 className="top-card-title">
                                  Inventory Finance
                                </h3>
                            </div>
                              <div className="top-card-text">
                              ₦{Price}
                              </div>
                            </div>
                        </div> 


                        <div className="col-span-4 sm:col-span-4 md:col-span-4 lg:col-span-2 xl:col-span-2">
                            <div className="top-card">
                                
                            <div className="top-card-title">
                                <h3 className="top-card-title">
                                  Create A Item
                                </h3>
                            </div>
                              <div className="top-card-text">
                                  <New_Book />
                                    
                              </div>
                            </div>
                        </div> 

                        </div>
              </div>

              <div className="container">
              <SimpleTable data={book_data}/>
              </div>
                </div>
                </>
               ) :(
                <>
                      <TemporaryDrawer/>
                      <div className="container">
                    <div className="grid grid-cols-4">
                        <div className="col-span-4 sm:col-span-4 md:col-span-4 xl:col-span-4 lg:col-span-4">
                        <p>
                 Upgrade to use this feature
                 </p>
                        </div>
                    </div>
                  </div>
                    </>
               )
             }

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode,
    };
  };

  
export default connect(
    mapStateToProps,
    null
  )(BookKeepingList);
   