import React, { Component , useState } from 'react' 
import axios from "axios";
import {Row, Col,
  Form,
  Select,
  InputNumber,
  Input,
  Radio,
  Button,List,
  DatePicker,
  Spin , Slider
} from "antd";
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

import Results from './Filter_results'
//import Load_Posts from './Posts'
//import Posts from '../General/Post_list'
const IconText = ({ icon, text }) => (
    <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
      {text}
    </span>
  );
  
const Search = Input.Search;
const { Option } = Select;
const { RangePicker } = DatePicker;

const category_url = 'https://backend-entr.herokuapp.com/core_api/category_list/'

 //Components Starts here
class Category_Post extends Component{
  search_url = 'https://backend-entr.herokuapp.com/core_api/post_filter/'
  state = {
    results: [],
    loading: false,
    error: null ,
    show_res : true,
    categories : [],
    category_post: [],
  };

    category_id = this.props.match.params.categoryID
    Category_Post =async()=>{
        await axios.get(`https://backend-entr.herokuapp.com/core_api/category_related/${this.category_id}/`)
        .then(res=>{
            this.setState({
            category_post : res.data
            })
            console.log('cagts', res.data)
        })
    }

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
    const price = 
        values['price'] === undefined ? null : values['price'] ;
    const location = 
      values['location'] === undefined ? null : values['location'] ;

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
            title ,price ,
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
      this.Category_Post()
    }
    // end pf process query function`

    render() {
      const { error, loading, results , categories, show_res,category_post} = this.state;
     
      const formItemLayout = {
        wrapperCol: { span: 12, offset: 3 }
      };
      return (
        
          <>



          <div className="flex-container">
            <div className="shift40">
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
            <Form.Item name = "City">
                <Select placeholder ="Select a location">
                <Option value="Sport">Lagos</Option>
                <Option value="Sport">Calabar</Option>
                <Option value="Sport">Uyo</Option>
                </Select>
            </Form.Item>
            
            <Form.Item name ='category' hasFeedback>
           
                <Select placeholder="Select a category">
                {
                 categories.map((c)=>(
                    <Option value={c.CategoryName}>{c.CategoryName}</Option>
                 ))
             }
             
                   </Select>
             
            </Form.Item>
  
            <Form.Item name = "date-range">
            <RangePicker />
          </Form.Item>

            <Form.Item name = 'price'>
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
             className="shift60">
              {
              show_res ?(

                    
                <List
                      itemLayout="vertical"
                      size="large"
                      pagination={{
                        onChange: page => {console.log(page);},
                        pageSize: 3,
                      }}
                      dataSource={category_post}
                      
                  renderItem={item => (
                    <List.Item
                      key={item.GigTitle}
                      actions={[
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                      ]}
                      extra={
                        <img
                          width={272}
                          alt="logo"
                          src={item.GigImage1}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={<a href={`/post_detail/${item.id}`}> {item.GigTitle} </a>}
                        description={item.GigDescription}
                      />
                      {item.content}
                    </List.Item>
                  )}
                />


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

export default Category_Post