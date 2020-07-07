import React, { Component , useState } from 'react' 
import {
  Form,
  Select,
  Input,
  Button,
  DatePicker ,
  
} from "antd";
import axios from "axios";
import Results from './Filter_results'

import Posts from './Post_list'
import uploaded_post from './Items'

//import Results from "./Results";

const Search = Input.Search;
const { Option } = Select;


const category_url = 'http://127.0.0.1:8000/core_api/category_list/'
const search_url  = 'http://127.0.0.1:8000/core_api/post_filter/'

 //Components Starts here
class All_Post extends Component{
  search_url = 'http://127.0.0.1:8000/core_api/post_filter/'
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

   process_search = async(values)=>{
    const title =  
        values["Title"] === undefined ? null : values["Title"] ;

    await axios.get(this.search_url, {
      params :{title}
    })
    .then(res =>{
      this.props.history.push(`/search/${title}`)
    })

  }

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

      <div className="introduction-section">
      <div className=" container  mx-auto mx-3">
              <div className="grid grid-cols-6 ">
                <div className="col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 xl:col-span-4">
                  <div className="">
                  <h3 style={{fontSize:36, paddingTop:40}}>
                      Get the best of products and 
                      <br/>
                      services in Nigeria
                      
                  </h3>
                <p className="intro_text">
                      
                      </p>

                  <div className="grid grid-cols-3">
                    <div className="col-span-3 sm:col-span-3 lg:col-span-3 md:col-span-3 xl:col-span-3">
                    <Form 
                     layout="inline"
                     
                    onFinish={this.process_search}>
                      <Form.Item name ="Title" >
                      <Search 
                      
                       placeholder="Find Products/Services"
                       />
                      </Form.Item>

                      <Form.Item>
                        <button className="market-search-button">
                          Search
                        </button>
                      </Form.Item>

                    </Form>
                    </div>
                  </div>

                  </div> 
                
                </div>
                <div className="col-span-6 sm:col-span-6 sm:ml-3 md:col-span-6 lg:col-span-2 xl:col-span-2 ">
                    <img 
                      className =""
                      style = {{height: 270}}
                      src="https://omnibiz.com/wp-content/uploads/2018/11/work2.png" />
                    </div>
         
            </div>
              </div>
              </div>

   <div
    style={{paddingTop:50}}
    className="container mx-auto ">
            <div className="grid grid-cols-8  mx-auto">
          {error && <span>There was an error</span>}
  
          <div className="col-span-8  sm:col-span-8  md:col-span-8 lg:col-span-2 xl:col-span-2">
                <Form   onFinish={this.process_query}>
                  <Form.Item>
                  
                </Form.Item>
                <Form.Item name ="title">
                  
                <Search placeholder=" Title " onSearch={value => console.log(value)} />
                    
                </Form.Item>
                <Form.Item name = "Location">
                      <Select placeholder ="Select a location">
                      <Option value=""></Option>
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
        
                
               
                  <Form.Item >
                  
                  <div>
                
                  <Form.Item name = "Price Range" style={{ marginBottom: 0 }}>
        <Form.Item
          name="year"
          
          style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
        >
          <Input placeholder="Starting Price" />
        </Form.Item>
        <Form.Item
          name="month"
         
          style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
        >
          <Input placeholder="Closing Price" />
        </Form.Item>
      </Form.Item>

              </div>

                  </Form.Item>


                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Filter
                    </Button>
                  </Form.Item>
                </Form>
          
                 

          </div>
                  
              <div className=" mx-3 col-span-8  sm:col-span-8
                md:col-span-8 lg:col-span-6 xl:col-span-6 gap-3">
                  {
                  show_res ?(
                    <Posts/>
                  ):(
                    <Results post_results={results} />
                  )
                }
 
              </div>
            </div>
        </div>

          </>    
      );
 }
}

export default All_Post