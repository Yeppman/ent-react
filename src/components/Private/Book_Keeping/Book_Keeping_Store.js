import React, { Component } from 'react'
import axios from "axios";
import { connect } from "react-redux";
import TemporaryDrawer from '../Sidebar/SideNav'

import SimpleTable from './table'
import {PlusCircleOutlined} from '@ant-design/icons'

const host = 'https://theebs.pythonanywhere.com'
const endpoint = host + '/management/book_keeping_list/'

class BookKeepingList extends Component {
    
    state = {
      book_data: [],
        loading: false
    }

    Fetch_Legder = async(token) => {
        this.setState({ loading: true });
        axios.defaults.headers = {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        };
        axios.get(endpoint)
        .then(res => {
            this.setState({
                book_data:res.data, 
                loading:false
            })
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
          this.Fetch_Legder(this.props.token)
        }
      }
    
      componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
          if (newProps.token !== undefined && newProps.token !== null) {
            this.Fetch_Legder(newProps.token)
          }
        }
      }

    render() {
      const {book_data} =  this.state
        return (
            <>
             <TemporaryDrawer />

             <div className="container">
                <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-4">
                    <p onClick>
                    <PlusCircleOutlined 
                       style={{ fontSize: '30px' }} 
                    /> Create 
                    </p>
                    </div>

                </div>
            </div>

            <div className="container">
              <SimpleTable data={book_data}/>
            </div>

            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.auth.token,
    };
  };
  
//   const mapDispatchToProps = dispatch => {
//     return {
//     //   farmerInfo: (token, userId) => dispatch(information.FarmerDetails(token,userId))
//     };
//   };
  
export default connect(
    mapStateToProps,
    null
  )(BookKeepingList);
  