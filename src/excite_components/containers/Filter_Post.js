import React, { Component , useState } from 'react' 
import {Row, Col,
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Button,
  DatePicker,
  Spin , Slider
} from "antd";
import axios from "axios";
import Results from '../General/Filter_results'

import Load_Posts from './Posts'
import Posts from '../General/Post_list'

//import Results from "./Results";

const Search = Input.Search;
const { Option } = Select;
const { RangePicker } = DatePicker;

const category_url = 'https://backend-entr.herokuapp.com/core_api/category_list/'



 //Components Starts here
class Filter_Post_Form extends Component{
  search_url = 'https://backend-entr.herokuapp.com/core_api/post_filter/'
  state = {
    results: [],
    loading: false,
    error: null ,
    show_res : true,
    categories : [],
  };

 Get_categories = async() =>{

    await axios.get(category_url).then( res =>{
        this.setState({
            categories : res.data ,
            loading : false
        });console.log(res.data)
            });
  
   };

  process_query = (values,err) =>{
    console.log()
   const title =  
        values["title"] === undefined ? null : values["title"] ;
    const category = 
    values["category"] === undefined ? null : values["category"] ;
    const price = 
        values['price'] === undefined ? null : values['price'] ;
    const location = 
      values['Location'] === undefined ? null : values['Location'] ;

    const rangeValue = values['date-range']
    const date_min =
    rangeValue === undefined ? null : rangeValue[0].format("YYYY-MM-DD");
    const date_max =
      rangeValue === undefined ? null : rangeValue[1].format("YYYY-MM-DD");

      this.setState({
        loading: true
      })

      if(!err){
        axios.get(this.search_url, {
          params: {
            title ,price ,category,
             date_min,
              date_max ,
               location
          }
        }).then(res =>{
          this.setState({
            results: res.data ,
            loading : false,
            show_res:false,
          }); console.log(res.data)
          
        }).catch(e =>{
            console.log(e)
        })
      }
      
      //process query contents ends here
  }

 
    componentWillMount = ()=>{
      this.Get_categories()
    }
    // end pf process query function`

    render() {
      const { error, loading, results , categories, show_res} = this.state;
     
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 3 }
      };
      return (
        
     
         

          <>


<div className="flex-container">
              <div className="shift60">
                <h3 className="intro_header">
                    Welcome to Base Your <br/>Soluton for Business
                </h3>
              <p className="intro_text">
                    Base Enterprise is a virtual market place for small 
                    and medium business owners. The advantage of the Base marketplace
                     has to do with marketing and 
                  branding which have a compelling attraction to buyers and users.
            Base Enterprise is to create a virtual market place for businesses and 
            sustainably capturing data and insights on the Market
                    </p>
              </div>
              <div className="shift40">
                    <img 
                      className =""
                      style = {{height: 270}}
                      src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" />
                    </div>
         
            </div>




          <div className="flex-container">
            <div className="shift30">
          {error && <span>There was an error</span>}
  
          <Form  {...formItemLayout} onFinish={this.process_query}>
            <Form.Item>
             
            </Form.Item>
            <Form.Item name ="title">
            
            <Search
                  placeholder=" Title "
                  onSearch={value => console.log(value)}
                  
                />
              
            </Form.Item>
            <Form.Item name = "Location">
                <Select placeholder ="Select a location">
                <Option value="Lagos">Lagos</Option>
                <Option value="Calabar">Calabar</Option>
                <Option value="Uyo">Uyo</Option>
                </Select>
            </Form.Item>
            
            <Form.Item name ='category' hasFeedback>
           
                <Select placeholder="Select a category">
                {
                 categories.map((c)=>(
                    <Option value={c.id}>{c.CategoryName}</Option>
                 ))
             }
             
                   </Select>
             
            </Form.Item>
  
            <Form.Item name = "date-range">
            <RangePicker />
          </Form.Item>

            <Form.Item name = 'price'>b
            <Slider placeholder = 'price-range' defaultValue={100} tooltipVisible />
            </Form.Item>
            
  
            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          
  
        
        </div>

          
            <div
              style={{paddingRight:10}}
             className="shift70">
              {
              show_res ?(
                <Posts/>
              ):(
                <Results post_results={results} />
              )
            }

            </div>
          </div>

          </>
         

      );
          }
}

export default Filter_Post_Form