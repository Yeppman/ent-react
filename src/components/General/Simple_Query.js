import React, { Component  } from 'react' 
import {
  Form,
  Input,  
} from "antd";

import axios from "axios";

class Basic_Query  extends Component {



    state={
        results:[],
        loading: false
    }
    
    Query = async()=>{
        await axios.get()
        .then(res=>{
            this.setState({})
        })
    }

    

}