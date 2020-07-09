import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification,  } from 'antd';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faHamburger } from "@fortawesome/free-solid-svg-icons";


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const  openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
    }

var host = 'https://backend-entr.herokuapp.com'

export default function New_Book(props) {
  const classes = useStyles();
  const  token = props.token
  var indexNumber = 0
  const delete_item = (item_id)=>{ 
  
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + `/management/bk-delete/${item_id}/`
       axios.post(endpoint)
      .then(res=>{
          if (res.status == 200){
            openNotification(res.data['Message'])
          }else{
            openNotification('Error deleting item')
          }
      })
    }
  
    const QuantityChanger = async(Quantity_needed)=>{
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };
      const endpoint = host + "/management/inventory_data/"
      await axios.get(endpoint, {
        
        params:{
          Quantity_needed
        }
      })
      .then(res=>{
            if (res.status == 200){
              openNotification(res.data['Message'])
            }else{
              openNotification('Error deleting item')
            }
      })
    } 

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Name</TableCell>
            
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{indexNumber++}</TableCell>
              <TableCell align="left">{row.Name}</TableCell>
              <TableCell align="left">{row.Price}</TableCell>
              <TableCell align="left">
              <InputNumber min={1} max={100}
            defaultValue={row.Quantity}  
            
            onChange={()=>{QuantityChanger(row.Quantity)}} />
            </TableCell>
              
                <TableCell align="left">
                     <FontAwesomeIcon 
                     onClick={()=>{delete_item(row.id)}}
                     icon={faTrash} />
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


