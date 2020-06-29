import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux"; 
import TemporaryDrawer from '../Sidebar/SideNav'
import { Button , notification ,Switch} from 'antd';

const openNotification = (msg) => {
notification.open({
  message: 'Notification Title',
  description:msg,
  onClick: () => {
    console.log('Notification Clicked!');
  },
});
}


class Logicstics_Details extends React.Component{

    state = {
      AllowUser:false ,

        order_contents : [],
        delivered : null,
        created : null,
        date_delivered : [],
 
    }
    order_id  = this.props.match.params.OrderID
    Get_Order_Contents = async(token) =>{
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`
          };
        axios.get(`http://127.0.0.1:8000/management/view_channel_content/${this.order_id}/`)
        .then(res =>{
           this.setState({
               order_contents: res.data,
               delivered : res.data.Delivered,
               created : res.data.Order_Created,
               date_delivered : res.data.Date_Delivered,
           })
        })
    }

    Change_Delivery_Status = async(checked)=>{
      console.log(`switch to ${checked}`)
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      await axios.post(`http://127.0.0.1:8000/management/change_delivery_status/${this.order_id}/`)  
      .then(res =>{
        openNotification(res.data['Message'])
      })
    
    }

    Delete_Order = async()=>{
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      await axios.post(`http://127.0.0.1:8000/management/delete_logicstics/${this.order_id}/`)
      .then(res =>{
          openNotification(res.data['Message'])
      })
    }

     //Verifies Membership
     GrantUser = true
     
    componentDidMount(){
      //
        if (this.props.token !== undefined && this.props.token !== null){
         // this.accountType()
          this.Get_Order_Contents(this.props.token)
    }
        
        
    }
    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Get_Order_Contents(newProps.token)
          }
        }
      }

      

    render(){
        console.log(this.state)
        const {order_contents, delivered,  created, date_delivered , AllowUser  } = this.state
        console.log(delivered)
        let delivery_status = false
        if(delivered == true){
            delivery_status = 'Delivered Succesfully'
        }else{
            delivery_status = "Pending"
        }
        return(

            <>
                {
                  this.GrantUser ? (
                    <>
                    <TemporaryDrawer />
           
           <div className="container mx-auto my-auto">

           <div className="grid grid-cols-12 
           sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-12 xl:grid-cols-12 ">
              <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                   <div className="top-card">
                       
                   <div className="top-card-title">
                       <h3 className="top-card-title">
                         Delivery Status
                       </h3>
                   </div>
                     <div className="top-card-text">
                         {delivery_status}  
                         {
                           delivery_status == 'Pending'?(
                             <Switch checked={false} onChange={this.Change_Delivery_Status} />
                           ):(
                             <Switch checked={true} onChange={this.Change_Delivery_Status} />
                           )
                         }
                     </div>
                   </div>
               </div> 

              <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                   <div className="top-card">
                       
                   <div className="top-card-title">
                       <h3 className="top-card-title">
                         Date Ordered
                       </h3>
                   </div>
                     <div className="top-card-text">
                           {created}
                     </div>
                   </div>
               </div> 

               <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                   <div className="top-card">
                       
                   <div className="top-card-title">
                       <h3 className="top-card-title">
                         Date Delivered
                       </h3>
                   </div>
                     <div className="top-card-text">
                             {date_delivered}
                     </div>
                   </div>
               </div> 

              <div className="col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                   <div className="top-card">
                       
                   <div className="top-card-title">
                       <h3 className="top-card-title">
                         Delete Order
                       </h3>
                   </div>
                     <div className="top-card-text">
                     <Button 
                     onClick={this.Delete_Order}
                     type="danger">
                         Delete
                     </Button>
                     </div>
                   </div>
               </div> 

         </div>


           </div>
         <div className="container mx-auto  my-auto ">
                 <div className="flex flex-wrap">
                     <div className= "w-full md:w-12/12 ">

                     <div className="logictics-card">
                         <div className="card-container">
                             <div style={{textAlign:"center"}} className="card-title">
                                 Order
                             </div>

                             <table>
                                     <tr>
                                     <th>First Name</th>
                                     
                                     <th>Email</th>
                                     <th>Phone</th>
                                     <th>Address</th>
                                     <th>Address 2</th>
                                     <th>City</th>
                                     <th>Country</th>
                                     </tr>
                                     <tr>
                                     <td>{order_contents.Client_Name}</td>
                                     <td>{order_contents.Client_Email}</td>
                                     
                                     <td>{order_contents.Client_Phone}</td>
                                     <td>{order_contents.Client_Adress}</td>
                                     <td>{order_contents.Client_Adress2}</td>
                                     <td>{order_contents.City}</td>
                                     <td>{order_contents.Country}</td>
                                     
                                     </tr>
                                     
                                     </table>

                         </div>


                         
                     </div>

                 </div>
                 </div>
         </div>
                    </>
                  ) :(

                      <>
                      <TemporaryDrawer />
                    <div className="container">
                    <div className="grid-cols-12">
                        <div className="col-span-5">

                        </div>

                        <div className="col-span-5">
                          You are not authorized for this feature
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
      token: state.auth.token ,  
      isAuth: state.auth.token !== null ,
      is_seller: state.auth.is_seller ,
      membership_type: state.membership.mode,
    };
  };

  
  
export default connect(
    mapStateToProps,
    null
  )(Logicstics_Details);