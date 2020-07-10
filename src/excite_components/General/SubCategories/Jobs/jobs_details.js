import React , { useState, Component }from 'react';
import axios from 'axios'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';


const host = 'https://backend-entr.herokuapp.com'
class Electronics_Item_Detail extends Component{
    state = {
        item:[],
        loading : true,
        error: null ,
        vendor_profile :[],
        comments:[],
        are_there_comments: false,
    }

    Vendor_Profile = async(Vendor_id) =>{
        await axios.get(`https://backend-entr.herokuapp.com/core_api/vendors_profile_public/${Vendor_id}/`)
        .then(res =>{
          this.setState({
            vendor_profile: res.data
        })
         console.log('ven',this.state.vendor_profile)  
       })
      }

      
    Item_Detail = async() => {
        const model_id = this.props.match.params.PostDetailID
        const item_endpoint = 'job_detail'
        const endpoint = host + `/retail/item-detail/${model_id}/`
        await axios.get(endpoint)
        .then(res =>{
            this.setState({
                post_detail : res.data ,
                loading : false
                })
                if (this.state.loading === false){
                    const parse_vendor = this.state.post_detail.Owner_id
                    console.log('this is the  vendor id', parse_vendor)
                    // USED THIS FUNCTION RETRIEVE VENDOR'S ID
                    this.Vendor_Profile(parse_vendor)
                }
            })
    }
      
    //Fetches commetn
    Comments = async() =>{
        const model_id = this.props.match.params.PostDetailID
        const item_endpoint = 'jobs_comment_list'
        const endpoint = host + `/retail/${item_endpoint}/${model_id}/` 
         axios.get()
        .then(res =>{
            this.setState({
                Comments : res.data ,
                are_there_comments: true
                })
        })

    }; 


    componentDidMount(){
        this.Comments()
        this.Item_Detail()
    }

}

const mapStateToProps = state => {
    return {
      token: state.auth.token 
    };
  };
  
  export default connect(
    mapStateToProps,
    null
  )(Electronics_Item_Detail);
  