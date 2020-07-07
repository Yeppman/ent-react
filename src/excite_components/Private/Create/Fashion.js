import React, { Component } from 'react'
import {Input ,  Spin ,Card , Form, Button ,
  List, Avatar ,
  Select , DatePicker , Upload, message,notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'https://backend-ent.herokuapp.com/stream/view_post/'


const TextArea = Input.TextArea
const { Option } = Select;


const IconText = ({ icon, text }) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
);

const openNotification = (msg) => {
  notification.open({
    message: 'Alert!',
    description:msg,
    
  });
}


const formItemLayout = {
  wrapperCol: { span: 12, offset: 6 }
};

const host = 'https://backend-ent.herokuapp.com'


const Color = ['Blue','Black', 'Red']
const Size = ['S','M','L','XL']
const Fashion_Type = ['Western', 'Native']
const Brand = ['Bespoke','Gucci', 'Fendi','Ankara', 'Guniea']
const Gender = ['Male', 'Female','Unisex']

class Fashion_Item_Create extends Component{
  
  state = {

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

    handleImageChange = (e) => {
      this.setState({
        Image_Post: e.target.files[0]
      })
    }

    Create_Query = async(values, err)=>{
        const Title =  
          values["Title"] === undefined ? null : values["Title"] ;
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Address = 
           values["Address"] === undefined ? null : values["Address"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
        const Size =
          values["Size"] === undefined ? null : values["Size"] ;
        const Fashion_Type =
          values["Fashion_Type"] === undefined ? null : values["Fashion_Type"] ;
        const Color =
          values["Color"] === undefined ? null : values["Color"] ;
       const Gender =
          values["Gender"] === undefined ? null : values["Gender"] ;

        const Brand =
          values["Brand"] === undefined ? null : values["Brand"] ;
          
       const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;

          const Original_User_id = this.state.Owner
          const Original_form_image = this.state.Image_Post
          const Category = parseInt(this.Category_ID)

          
          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          
          form_data.append('Price', Price);
          form_data.append('Owner', Original_User_id);
          form_data.append('Image_Post',Original_form_image);

          form_data.append('Size',Size)
          form_data.append('Address',Address)
          form_data.append('Fashion_Type', Fashion_Type)
          form_data.append('Color',Color)
          form_data.append('Gender', Gender)
          form_data.append('Brand', Brand)
      
          form_data.append('Country',Country)
          form_data.append('State', State)
           
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_fashion/`
            axios.post(upload_url,form_data)
            .then(res =>{
                console.log(res.data)
                const take_response = res.data['Message']
                openNotification(take_response) 
                this.props.history.push("/dashboard/")        
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
              const {user_post, loading, error,Title, Price,Location,Description,Image_Post } = this.state
                return(
                    <>

                    <TemporaryDrawer/>
                    <div className ="container ">
                    <div className = "grid grid-cols-6">

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
                                placeholder="Product or Service name"
                                enterButton
                                />
                            
                            </Form.Item>

                          

                            <Form.Item 
                             rules={[{ required: true }]}
                            name="Description">
                          <TextArea
                           value placeholder="Description" rows={4} />
                          </Form.Item>


                          <Form.Item
                             rules={[{ required: true }]}
                             name ="Fashion_Type" >
                                
                                <Select placeholder="Select Fashion_Type ">
                                {
                                  Fashion_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Brand" >
                                
                                <Select placeholder="Select Brand ">
                                {
                                  Brand.map((b)=>(
                                    <Option 
                                    value={b}>{b}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Color" >
                                
                                <Select placeholder="Select Color ">
                                {
                                  Color.map((b)=>(
                                    <Option 
                                    value={b}>{b}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Size" >
                                
                                <Select placeholder="Select Size ">
                                {
                                  Size.map((b)=>(
                                    <Option 
                                    value={b}>{b}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            
                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Gender" >
                                
                                <Select placeholder="Select Brand ">
                                {
                                  Gender.map((b)=>(
                                    <Option 
                                    value={b}>{b}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
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
                                
                                <Select placeholder="Selec Country">
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
  )(Fashion_Item_Create);