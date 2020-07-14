import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker , Upload, message,notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'https://backend-entr.herokuapp.com/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>

);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};

const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    onClick: () => {
      console.log('Notification Clicked!');
    },
  });
}


const host = 'https://backend-entr.herokuapp.com'

const Applicanes = ['Kitchen Wares','Air Conditon','Lighiting']

class HomeApp_Item_Create extends Component{
    state = {
        user_post : [], 
        loading: false,
        error: null ,
        categories : [],

        //Used for form conntrol
        Owner : '',
        Title : '',
        Category :'',
        Description : '',
        Address : '',
        Price : '',
        Image_Post:'',
    }

    Category_ID= this.props.match.params.categoryID

    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Address = 
           values["Address"] === undefined ? null : values["Address"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
       const Appliance_Type =
          values["Appliance_Type"] === undefined ? null : values["Appliance_Type"] ;
      const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;
  
          const Original_User_id = this.state.Owner
          
          const Category =  this.props.match.params.categoryID
          const Image_Post = this.state.Image_Post
          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Address',Address);
          form_data.append('Price', Price);
          form_data.append('Owner', Original_User_id);
          form_data.append('Appliance_Type',Appliance_Type)
          form_data.append('Image_Post',Image_Post);
  
          form_data.append('Country',Country)
          form_data.append('State', State)
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_home_appliances/`
            axios.post(upload_url,form_data, {
              headers : {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              }
            } )
            .then(res =>{
              if (res.status == 200){
                console.log(res.data)
            const take_response = res.data['Message']
            openNotification(take_response)   
            }  else{
               openNotification('Error Creating Product') 
            }           
            })
            
          }
        
          handleImageChange = (e) => {
            this.setState({
              Image_Post: e.target.files[0]
            })
          };
      
          componentDidMount(){
           
            }
      
          componentWillReceiveProps(newProps) {
              if (newProps.token !== this.props.token) {
                if (newProps.token !== undefined && newProps.token !== null) {
                  
                }
              }
            }
  
            render(){
                const {user_post, loading, error, categories ,Title, Price,Address,Description,Image_Post } = this.state
                return(
                    <>
                    
                    <TemporaryDrawer/>
                    
                    <div className="main">
                    <div className ="container mx-auto">
                    <div className = "grid grid-cols-6">

                    <div className="login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                    <h4 
                      style={{fontSize:30}}
                    className="text-center">
                      Create A New Product
                    </h4>
                </div>

                <div className="login-section col-span-3 
                sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                    <div className="">
                        <Form 
                        {...formItemLayout}
                         onFinish={this.Create_Query}>
                            
                
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Title">
                            
                                <Input
                                placeholder="Product Name"
                                enterButton
                                />
                            
                            </Form.Item>

                            
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='Price'> 
                            
                                <Input
                                
                                placeholder="Price" 
                                enterButton
                                />
                            
                            </Form.Item>


                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Description">
                          <TextArea 
                            placeholder="Description" rows={4} />
                          </Form.Item>

                          <Form.Item
                             rules={[{ required: true }]}
                             name ="Appliance_Type" >
                                
                                <Select placeholder="Select Appliance ">
                                {
                                  Applicanes.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='Address'> 
                            
                                <Input
                                
                                placeholder="Address" 
                                enterButton
                                />
                            
                            </Form.Item>
                            

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='State' hasFeedback>
                                
                                <Select placeholder="Select State">
                                <Option value="Lagos">Lagos</Option>
                                <Option   value="Ibadan">Ibadan</Option>
                                <Option  value="Osun">Osun</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Country' hasFeedback>
                                
                                <Select placeholder="Selec Country">
                                <Option value="Lagos">Nigeria</Option>
                                <Option   value="Ibadan">Ghana</Option>
                                <Option  value="Osun">Cameroon</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ='Address' hasFeedback>

                               <Input
                                placeholder="Address"
                                enterButton
                                />
                              
                            </Form.Item>

                          <Form.Item 
                           rules={[{ required: true }]}
                          name="Image_Post">

                          <Input  type="file"
                          value = {Image_Post}
                            onChange={this.handleImageChange}
                           />

                          </Form.Item>

                        <Form.Item >
                          <button
                            class="login-button"
                          htmlType="submit">
                            Create
                          </button>
                        </Form.Item>

                       </Form>
                    


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
  )(HomeApp_Item_Create);