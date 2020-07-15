import React , {Component,  createElement, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification  } from 'antd';


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


 

export default function orderTable(props) {

  const redirect = (item_id)=>{
    props.history.push(`/admin-campaign-detail/${item_id}`)
  }

  
  
  const classes = useStyles();
  const  token = props.token
  let indexNumber = 0

  const removeItem = async (id) =>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    console.log()
   
      await axios.get(`https://backend-entr.herokuapp.com/retail/remove-item/${id}/`)
      .then(res =>{
        if (res.status == 200){
          this.openNotification(res.data['Message'])
        }else{

        }
      })
  
  }

  return (
    <>

    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Name</TableCell>
            
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{indexNumber++}</TableCell>
              <TableCell align="left">{row.Item}</TableCell>
              <TableCell align="left">{row.Quantity}</TableCell>
              <TableCell align="left">
              {
                row.Price
              }
            </TableCell>
              
                <TableCell align="left">
                     <FontAwesomeIcon 
                     onClick={()=>{removeItem(row.id)}}
                     icon={faTrash} />
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </>


  );
}


