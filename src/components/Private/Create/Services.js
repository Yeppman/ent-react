import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker , Upload, message,notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from './Sidebar/SideNav'

const UserPost_url = 'https://ent-react.vercel.app/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const host = 'https://ent-react.vercel.app'


class Services_Item_Create extends Component{
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
        The_Image_1:'',
    }

    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        const Category =  
          values["Category"] === undefined ? null : values["Category"] ; 
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Location = 
           values["Location"] === undefined ? null : values["Location"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
        
  
          const Original_User_id = this.state.Owner
          const Original_form_image = this.state.The_Image_1
          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Location',Location);
          form_data.append('Price', Price);
          form_data.append('Owner', Original_User_id);
          form_data.append('Image_Post',Original_form_image);
  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_property/`
            axios.post(upload_url,form_data, {
              headers : {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              }
            } )
            .then(res =>{
                console.log(res.data)
                const take_response = res.data['Message']
                this.openNotification(take_response)            
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
                const {user_post, loading, error, categories ,Title, Price,Location,Description,The_Image_1 } = this.state
                return(
                    <>
                    <div className ="container mx-auto">
                    <div className = "grid grid-cols-10">

                    <div className="col-span-10 sm:col-span-10 md:col-span-10 lg:col-span-3 xl:col-span-3">
                    <div className="base-card">
                        <Form  onFinish={this.Create_Query}>
                            
                
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ="Title">
                            
                                <Input
                                placeholder="Product or Service name"
                                enterButton
                                />
                            
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Category" >
                                
                                <Select placeholder="Select a category">
                                {
                                  categories.map((c)=>(
                                    <Option 
                                    onChange={this.handleChange}
                                    value={c.id}>{c.CategoryName}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Description">
                          <TextArea onChange={this.handleChange}
                           value={Description} placeholder="Description" rows={4} />
                          </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Location' hasFeedback>
                                
                                <Select placeholder="Select a Location">
                                <Option value="Lagos">Nigeria</Option>
                                <Option   value="Ibadan">Ghana</Option>
                                <Option  value="Osun">Cameroon</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='State' hasFeedback>
                                
                                <Select placeholder="Select a Location">
                                <Option value="Lagos">Lagos</Option>
                                <Option   value="Ibadan">Ibadan</Option>
                                <Option  value="Osun">Osun</Option>
                                </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Country' hasFeedback>
                                
                                <Select placeholder="Select a Location">
                                <Option value="Lagos">Nigeria</Option>
                                <Option   value="Ibadan">Ghana</Option>
                                <Option  value="Osun">Cameroon</Option>
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
                            name ='Land_Area'> 
                            
                                <Input
                                placeholder="Land Are" 
                                enterButton
                                />
                            
                            </Form.Item>
                          
                            <Form.Item 
                             rules={[{ required: true }]}
                            name ='Price'> 
                            
                                <Input
                                value={Price}
                                onChange={this.handleChange}
                                placeholder="Price" 
                                enterButton
                                />
                            
                            </Form.Item>
                        
                            <Form.Item
                             rules={[{ required: true }]}
                             
                             name ='Bathrooms' hasFeedback>
                                
                                <Select placeholder="How Many Bathroona">
                                <Option value="0">0</Option>
                                <Option   value="1">1</Option>
                                <Option  value="2">2</Option>
                                <Option  value="3">3</Option>
                                </Select>
                              
                            </Form.Item>

                          <Form.Item 
                           rules={[{ required: true }]}
                          name="Post_Image1">

                          <Input  type="file"
                          value = {The_Image_1}
                         
                          name="Post_Image1" />

                          </Form.Item>

                         

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                            </Form.Item>

                       </Form>
                    


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
  )(Services_Item_Create);