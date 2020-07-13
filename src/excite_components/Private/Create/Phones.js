import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker , Upload, message,notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'http://backend-entr.herokuapp.com/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;

const openNotification = (msg) => {
    notification.open({
      message: 'Alert!',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }
  

const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>

);

const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};


const host = 'http://backend-entr.herokuapp.com'

const Brand = ['LG','Samsung','Sony', 'Hi-Sense']
const Color = ['Black','Red','Rose Gold']
const Year_Made = ['2020','2019','2017','2016','2015']
const Phone_Type = ['Tab','Phone',]
const Size = ['Large','Medium','Small']

class Phone_Item_Create extends Component{
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

    Category_ID= this.props.match.params.categoryID

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
       const Brand =
          values["Brand"] === undefined ? null : values["Brand"] ;
    const Color =
          values["Color"] === undefined ? null : values["Color"] ;
     const Year_Made =
          values["Year_Made"] === undefined ? null : values["Year_Made"] ;
        const Phone_Type = values['Phone_Type']
        const Size = values['Size']
       
    

          const Original_User_id = this.state.Owner
          
          const Image_Post = this.state.Image_Post
          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Location',Location);
          form_data.append('Price', Price);
          form_data.append('Owner', Original_User_id);
          form_data.append('Color',Color)
          form_data.append('Brand',Brand)
          form_data.append('Phone_Type',Phone_Type)
          form_data.append('Size',Size)
          form_data.append('Year_Made',Year_Made)

          form_data.append('Image_Post',Image_Post);
  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_phone/`
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
                this.openNotification(take_response)   
                }  else{
                    this.openNotification('Error Creating Product') 
                }      
            })
            .catch(e =>{
                console.log(e)
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
                const {user_post, loading, error, categories ,Title, Price,Location,Description,Image_Post } = this.state
                return(
                    <>
                    
                    <TemporaryDrawer/>
                    
                  <div className="main">
                    
                  <div className ="container mx-auto">
                    <div className = "grid grid-cols-6">
                    <div className="login-section col-span-3 
                sm:col-span-3 md:col-span-3 lg:col-span-3 xl:col-span-3">
                    <h4 
                      style={{fontSize:30}}
                    className="text-center">
                      Create A New Product
                    </h4>
                </div>

                    <div className="login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
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


                          <Form.Item name ="Year_Made">
                            <Select placeholder ="Year Made">
                        {
                            Brand.map((b)=>(
                                        <>
                                        <Option value={b}>{b}</Option>
                                        </>
                                    ))
                                }
                            </Select>
                         </Form.Item>

                          <Form.Item name ="Year_Made">
                            <Select placeholder ="Year Made">
                        {
                            Year_Made.map((b)=>(
                                        <>
                                        <Option value={b}>{b}</Option>
                                        </>
                                    ))
                                }
                            </Select>
                         </Form.Item>

                         <Form.Item name ="Phone_Type">
                            <Select placeholder ="Phone Type">
                        {
                            Phone_Type.map((b)=>(
                                        <>
                                        <Option value={b}>{b}</Option>
                                        </>
                                    ))
                                }
                            </Select>
                         </Form.Item>

                         <Form.Item name ="Size">
                            <Select placeholder ="Size">
                        {
                            Size.map((b)=>(
                                        <>
                                        <Option value={b}>{b}</Option>
                                        </>
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
  )(Phone_Item_Create);