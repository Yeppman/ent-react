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

var host = 'http://127.0.0.1:8000'


 

export default function SimpleTable(props) {
  const classes = useStyles();
  const  token = props.token
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="center">Name</TableCell>
            
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
              <TableCell align="center">{row.Name}</TableCell>
              <TableCell align="center">{row.Price}</TableCell>
              <TableCell align="center">
              <InputNumber min={1} max={100}
            defaultValue={row.Quantity}  
            
          />
            </TableCell>
              
                <TableCell align="center">
                     <FontAwesomeIcon 
                    =
                     icon={faTrash} />
                </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


