import React, { Component } from 'react'
import {Input ,  Form, Button ,
  Select , notification} from 'antd';

     
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from './Sidebar/SideNav'



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


const host = 'https://back-ent.herokuapp.com'

const Service_Type = ['Insurance','Mechanic','Pharmacy','Health','Law','Baking']
const Payment_Type = ['Online','OnDelivery']

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
        Address : '',
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
        
        const Service_Type =
          values["Service_Type"] === undefined ? null : values["Service_Type"] ;
        const Payment_Type =
          values["Payment_Type"] === undefined ? null : values["Payment_Type"] ;
        
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
          
          form_data.append('Price', Price);
          
          form_data.append('Service_Type',Service_Type);
          form_data.append('Payment_Type',Payment_Type);
          form_data.append('Image_Post',Original_form_image);
  
          form_data.append('Country',Country)
          form_data.append('State', State)
          form_data.append('Address',Address);

              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_services/`
            axios.post(upload_url,form_data )
            .then(res =>{
                console.log(res.data)
                const take_response = res.data['Message']
                openNotification(take_response)            
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
                const {Price, Image_Post } = this.state
                return(
                    <>
                    <div className ="container mx-auto">
                    <div className = "grid grid-cols-6">

                    <div className="login-section col-span-6 
                sm:col-span-6 md:col-span-6 lg:col-span-6 xl:col-span-6">
                    <div className="">
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
                            name="Description">
                          <TextArea 
                            placeholder="Description" rows={4} />
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
                             name ="Service_Type" >
                                
                                <Select placeholder="Select Service ">
                                {
                                  Service_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            
                            
                            
                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Size" >
                                
                                <Select placeholder="Select Payment ">
                                {
                                  Payment_Type.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>


                            <Form.Item
                             rules={[{ required: true }]}
                             name ='Location' hasFeedback>

                               <Input
                                placeholder="Address"
                                enterButton
                                />
                              
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