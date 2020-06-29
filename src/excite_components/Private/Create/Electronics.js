import React, { Component } from 'react'
import {Input ,   Form, 
  Select ,notification} from 'antd';
  import TemporaryDrawer from '../Sidebar/SideNav'
     
import axios from "axios";
import { connect } from "react-redux";

//import TemporaryDrawer from '../Sidebar/SideNav'

const UserPost_url = 'http://127.0.0.1:8000/stream/view_post/'


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


const Electronic_Category = ['Audio','Video']
//const  Electronic_Type = ['']
const Color = ['Blue','Black', 'Red']
const Size = ['Large','Medium','Small']
const Brand = ['Hi-Sense', 'O`Riely', 'LG', 'Samsung']
const Condition = ['New', 'Foriegn Used']

const host = 'http://127.0.0.1:8000'

class Electronics_Item_Create extends Component{
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
        
        const Price =  
          values["Price"] === undefined ? null : values["Price"] ; 
        const Location = 
           values["Location"] === undefined ? null : values["Location"] ; 
        const Description =
          values["Description"] === undefined ? null : values["Description"] ;
      const  Color =
          values["Color"] === undefined ? null : values["Color"] ;
        const  Brand =
          values["Brand"] === undefined ? null : values["Brand"] ;
        const  Size =
          values["Size"] === undefined ? null : values["Size"] ;
       const  State =
          values["State"] === undefined ? null : values["State"] ;
      const  Country =
          values["Country"] === undefined ? null : values["Country"] ;
          
       const  Electronic_Category =
          values["Electronic_Category"] === undefined ? null : values["Electronic_Category"] ;

        
          const Original_User_id = this.state.Owner
          const Category = parseInt(this.Category_ID)
          const Image_Post = this.state.Image_Post


          //Assigns New Form Data
          let form_data =  new FormData()
          form_data.append('Title',Title);
          form_data.append('Category', Category);
          form_data.append('Description',Description);
          form_data.append('Location',Location);
          form_data.append('Price', Price);
          //form_data.append('Owner', Original_User_id);
          form_data.append('Electronic_Category', Electronic_Category)

          form_data.append('Image_Post',Image_Post);
          form_data.append('Color',Color);
          form_data.append('Brand',Brand);
          form_data.append('Size',Size);
          form_data.append('Condition',Condition);

          form_data.append('Country',Country)
          form_data.append('State', State)

  
          
              axios.defaults.headers = {
                "Content-Type": "multitype/form-data",
                Authorization: `Token ${this.props.token}`
              };
            const upload_url= host + `/retail/create_electronics/`
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
                const { Price,Image_Post } = this.state
                return(
                    <>

                    <TemporaryDrawer/>
                    

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

                          <Form.Item
                             rules={[{ required: true }]}
                             name ="Electronic_Category" >
                                
                                <Select placeholder="Select Electronic Category ">
                                {
                                  Electronic_Category.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
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
                             name ="Size" >
                                
                                <Select placeholder="Select Size ">
                                {
                                  Size.map((c)=>(
                                    <Option 
                                    value={c}>{c}</Option>
                                  ))
                              }
                              
                                    </Select>
                              
                            </Form.Item>

                            <Form.Item
                             rules={[{ required: true }]}
                             name ="Brand" >
                                
                                <Select placeholder="Select Brand">
                                {
                                  Brand.map((c)=>(
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
                             name ='Location' hasFeedback>

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
                          name="Post_Image1" />

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
  )(Electronics_Item_Create);