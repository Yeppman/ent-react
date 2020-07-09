import React from 'react';
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

var host = 'http://127.0.0.1:8000'


 

export default function MoneySimpleTable(props) {
  const classes = useStyles();
  const  token = props.token
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Customer Email </TableCell>
            
            <TableCell align="left">Customer Code </TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="left">Amount </TableCell>


          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{row.Customer_Email}</TableCell>
              <TableCell align="left">{row.Customer_Code}</TableCell>
              <TableCell align="left">{row.Status}</TableCell>
              <TableCell align="left"> {row.Created}</TableCell>
              <TableCell align="left"> {row.Requested_Amount}</TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


