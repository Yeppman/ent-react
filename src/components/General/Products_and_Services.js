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

const categories_url = 'http://127.0.0.1:8000/category_list/'
class Category_Links extends Component{
    state= {
        Categories : [],
        loading : true,
        error : null
    }

    Categories = async()=>{
        await axios.get(categories_url)
        .then(res =>{
            this.setState({
                Categories : res.data
            })
        })
    }

    componentDidMount(){
        this.Categories()
    }

    render(){
        return(

            <>



            <div classNameName ="container mx-auto my-auto">
                <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="col-span-3 ...">
                    Getting a new business off the ground 
    is a lot of hard work. Here are five ideas you can use to find your first customers
                    </div>

                    Getting a new business off the ground 
    is a lot of hard work. Here are five ideas you can use to find your first customers
        <div className="col-span-1 ...">
        Getting a new business off the ground 
    is a lot of hard work. Here are five ideas you can use to find your first customers
        </div>
                    <div className="col-span-1 ...">
                    Getting a new business off the ground 
    is a lot of hard work. Here are five ideas you can use to find your first customers
                    </div>
                    <div className="col-span-2 ...">

                    Getting a new business off the ground 
    is a lot of hard work. Here are five ideas you can use to find your first customers
                    </div>
                </div>
            </div>

            </>

        )
    }

}


export default Category_Links