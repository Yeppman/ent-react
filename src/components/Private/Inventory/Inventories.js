import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import axios from "axios";
import { connect } from "react-redux"; 
import TemporaryDrawer from '../Sidebar/SideNav'
import {Row, Col , Button , 
     Card, Avatar , Comment, Tooltip, Form,
     InputNumber  ,notification,
     Input, Rate  } from 'antd';
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
     
const  openNotification = (msg) => {
  notification.open({
    message: 'Notification Title',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
  }

class Inventory_Store extends Component{
    state ={
      inventory_objects : [],
      Price : null,
      Total_Obj: null ,
      total : null ,
      loading : true,
      error : null,
    }

    Inventories = async(token) =>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get('https://ent-react.vercel.app/management/view_inventory/')
      .then(res =>{
        this.setState({
          inventory_objects : res.data,
          total: 0,
          loading: false
        })
         console.log(res.data)
      })
    }

    Inventory_Data  = async(token)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      await axios.get('https://ent-react.vercel.app/management/inventory_data/')
      .then(res=>{
        this.setState({
          Price : res.data.Price ,
          Total_Obj : res.data.Total
        })
      })
    } 

    delete_item = (item_id)=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
       axios.post(`https://ent-react.vercel.app/management/delete_inventory_record/${item_id}/`)
      .then(res=>{

          openNotification(res.data['Message'])
      })
    }

    QuantityChanger = async()=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      await axios.get('https://ent-react.vercel.app/management/inventory_data/')
      .then(res=>{
        
      })
    } 

     

     componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Inventories(newProps.token)
            this.Inventory_Data(newProps.token)
          }
        }
      }

      componentDidMount(){
        this.Inventories(this.props.token)
        this.Inventory_Data(this.props.token)
      }

    render(){
        const {inventory_objects, loading, error, Price, Total_Obj} = this.state
        return(

                <>

              <TemporaryDrawer />

                <div className="container ">
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
                      ₦ {Price}
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
                            <Link to="/create_item/">
                                  New Item
                            </Link>
                      </div>
                    </div>
                </div> 

          </div>

              <div class="container mx-auto">
                <div className="grid grid-col-6">
               
                  <div 
                  style ={{marginleft:20}}
                  className=" col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                  <table>
                            <tr>
                              <th>Item</th>
                              <th>Name</th>
                              <th>Quantity</th>
                              <th> Created </th>
                              <th>Price</th>
                              
                              <th>Delete</th>
                            </tr>
                            {
                              inventory_objects.map((i) =>(
                                <tr>
                              <td>{i.The_Post}</td>
                              <td>{i.Name}</td>
                              <td> <InputNumber min={1} max={100}
                               defaultValue={i.Quantity}  
                               onChange={this.QuantityChanger} />
                                </td>
                              <td>{i.Date_Created}</td>
                              <td> {i.Price}</td>
                              <td>
                              
                              <a onClick={()=>{this.delete_item(i.id)}}>
                              <FontAwesomeIcon 
                              
                              icon={faTrash} />
                              </a>

                              </td>
                              
                            </tr>
                              ))
                            }
                          
                          </table>
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

  };
};

export default connect(
  mapStateToProps,
  null
)(Inventory_Store);