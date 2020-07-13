import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker ,Modal , Upload, message,notification} from 'antd';

import moment from 'moment'

import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'https://backend-entr.herokuapp.com/stream/view_post/'

const dateFormat = 'YYYY/MM/DD';
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


const host = 'https://backend-entr.herokuapp.com'

const Vehicle_Type = ['Sedan','Truck','Coupe', 'Bus', 'Van', 'Mini-Van']
const Vehicle_Model = ['Audi', 'Volvo','Ford', 'Mecerdes Benz','Toyota']
const Condition = ['New', 'Foriegn Used']
const Transmission = ['Manual', 'Automatic']
const Fuel_Type = ['Disel', 'Petrol', 'Electric','Hybrid']
const Body_Type  = ['Metal','Carbon-Fibre']
const Color = ['Blue','Black','Bespoke']


class Vehicles_Item_Create extends Component{
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
        Location : '',
        Price : '',
        Image_Post:'',
    }

    handleImageChange = (e) => {
      this.setState({
        Image_Post: e.target.files[0]
      })
    };

    Category_ID= this.props.match.params.categoryID
  

Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        const Category = parseInt(this.Category_ID)
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Address = 
           values["Address"] === undefined ? null : values["Address"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
        const Vehicle_Type =
          values["Vehicle_Type"] === undefined ? null : values["Vehicle_Type"] ;
        const Vehicle_Model =
          values["Vehicle_Model"] === undefined ? null : values["Vehicle_Model"] ;
        const Transmission =
          values["Transmission"] === undefined ? null : values["Transmission"] ;
          const Color =  values["Color"] === undefined ? null : values["Color"] ; 
      const Fuel_Type =
          values["Fuel_Type"] === undefined ? null : values["Fuel_Type"] ;  
        const Year_Made = values['Year_Made'].format("YYYY-MM-DD") 
       const Body_Type =
          values["Body_Type"] === undefined ? null : values["Body_Type"] ;  
     const State =
          values["State"] === undefined ? null : values["State"] ;  
       const Country =
          values["Country"] === undefined ? null : values["Country"] ; 
  
          const Original_User_id = this.state.Owner
          
          const Image_Post = this.state.Image_Post
          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Location',Location);
          form_data.append('Year_Made', Year_Made);
          form_data.append('Price', Price);
          form_data.append('Owner', Original_User_id);
          form_data.append('Vehicle_Type',Vehicle_Type)
          form_data.append('Vehicle_Model',Vehicle_Model)
          form_data.append('Transmission',Transmission)
          form_data.append('Fuel_Type',Fuel_Type)
          form_data.append('Body_Type',Body_Type)
          form_data.append('Color',Color)
          form_data.append('Address',Address)
          form_data.append('State',State)
          form_data.append('Country',Country)
          form_data.append('Image_Post',Image_Post);
  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_vehicles/`
            axios.post(upload_url,form_data, {
              headers : {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              }
            } )
            .then(res =>{
               if (res.status == 200 || res.status == 201){
                console.log(res.data)
                const take_response = res.data['Message']
                this.openNotification(take_response)   
               }else{
                 this.openNotification('Upload Failed') 
               }        
            })
            .catch(e =>{
                console.log(e)
              }) 
          }
        
      
          componentDidMount(){
           
            }
      
          componentWillReceiveProps(newProps) {
              if (newProps.token !== this.props.token) {
                if (newProps.token !== undefined && newProps.token !== null) {
                  
                }
              }
            }
  
            render(){
                const {user_post, loading, error, categories ,Title, Price,Location,Description,Image_Post } = this.state
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
                                placeholder="Title"
                                enterButton
                                />
                            
                            </Form.Item>

                            
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='Price'> 
                            
                                <Input
                                value={Price}
                                placeholder="Price" 
                                enterButton
                                />
                            
                            </Form.Item>
                            <Form.Item 
                            rules={[{ required: true }]}
                            name="Year_Made">
                              <DatePicker defaultValue={moment('2020/01/01', dateFormat)} format={dateFormat} />

                            </Form.Item>


                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Description">
                          <TextArea 
                            placeholder="Description" rows={4} />
                          </Form.Item>

                          <Form.Item
                             rules={[{ required: true }]}
                             name ="Color" >
                                
                                <Select placeholder="Select Color">
                                {
                                  Color.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Vehicle_Type" >
                                
                                <Select placeholder="Select Vehicle Type">
                                {
                                  Vehicle_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Vehicle_Model" >
                                
                                <Select placeholder="Select Vehicle Model">
                                {
                                  Vehicle_Model.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Transmission " >
                                
                                <Select placeholder="Select Transmission">
                                {
                                  Transmission.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Condition" >
                                
                                <Select placeholder="Select Condition">
                                {
                                  Condition.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>
                            
                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Fuel_Type" >
                                
                                <Select placeholder="Select Fuel Type">
                                {
                                  Fuel_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Body_Type" >
                                
                                <Select placeholder="Select Body Type">
                                {
                                  Body_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Address">
                            
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
                                
                                <Select placeholder="Select Country">
                                <Option value="Lagos">Nigeria</Option>
                                <Option   value="Ibadan">Ghana</Option>
                                <Option  value="Osun">Cameroon</Option>
                                </Select>
                              
                            </Form.Item>


                          <Form.Item 
                           rules={[{ required: true }]}
                          name="Post_Image1">

                          <Input  type="file"
                          value = {Image_Post}
                          onChange={this.handleImageChange}
                          name="Post_Image1" />

                          </Form.Item>

                         

                          <Form.Item >
                          <button
                            class="login-button"
                          htmlType="submit">
                            Login
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
  )(Vehicles_Item_Create);