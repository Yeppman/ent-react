import React, { Component } from 'react'
import {Input ,  Form,   Select ,notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'

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



const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const host = 'http://backend-entr.herokuapp.com'

const Property_Type = ['House For Sale','House For Rent','House For Purchase','Land For Sale','Land For Purchase']
const House_Quality = ['New','Old']
const Bathrooms = [1,2,3,4,5,,6,7,8]

class Property_Item_Create extends Component{
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

  handleImageChange = (e) => {
    this.setState({
      Image_Post: e.target.files[0]
    })
  };

    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
       
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Address = 
           values["Address"] === undefined ? null : values["Address"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;

     
      const  Land_Area =
          values["Land_Area"] === undefined ? null : values["Land_Area"] ;
     const  House_Quality =
          values["House_Quality"] === undefined ? null : values["House_Quality"] ;
      const  Bathrooms =
          values["Bathrooms"] === undefined ? null : values["Bathrooms"] ;
      const  Property_Type =
          values["Property_Type"] === undefined ? null : values["Property_Type"] ;
      
      const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;
         
          const Original_form_image = this.state.Image_Post
          const Category = parseInt(this.Category_ID)

          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Address',Address);
          form_data.append('Price', Price);
          form_data.append('Land_Area',Land_Area)
          form_data.append('House_Quality',House_Quality)
          form_data.append('Bathrooms',Bathrooms)
          form_data.append('Property_Type', Property_Type)

          form_data.append('Image_Post',Original_form_image);
      
          form_data.append('Country',Country)
          form_data.append('State', State)

          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data", 
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_property/`
            axios.post(upload_url,form_data )
            .then(res =>{
                console.log(res.data)
                const take_response = res.data['Message']
                openNotification(take_response)  
                this.props.history.push("/user_uploads")          
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
              const {Image_Post } = this.state
                return(
                    <>
                    <TemporaryDrawer/>
                      <div className="main">
                      <div className ="container mx-auto">
                    <div className = "grid grid-cols-6">

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
                                placeholder="Product or Service name"
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
                             name ="House_Quality" >
                                
                                <Select placeholder="House_Quality">
                                {
                                  House_Quality.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                          <Form.Item
                             rules={[{ required: true }]}
                             name ="Bathrooms" >
                                
                                <Select placeholder="Bathrooms">
                                {
                                  Bathrooms.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
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
                             
                             name ='State' hasFeedback>
                                
                                <Select placeholder="Select  State">
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
                            name ='Land_Area'> 
                            
                                <Input
                                placeholder="Land Area (Optional)" 
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
                          name="Image_Post">

                          <Input  type="file"
                          value = {Image_Post}
                          onChange={this.handleImageChange}
                          name="Image_Post" />

                          </Form.Item>

                         

                        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                            <button
                             class="login-button"
                             type="primary" htmlType="submit">
                                Submit
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
  )(Property_Item_Create);