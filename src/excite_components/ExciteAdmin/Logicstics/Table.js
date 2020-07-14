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
import { faTrash, faBoxOpen } from "@fortawesome/free-solid-svg-icons";


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


 

export default function LogisticsTable(props) {
  const classes = useStyles();

  const delete_order = async(order_id)=>{
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${props.token}`
    };
    await axios.post(host + `/management/delete_logicstics/${order_id}/`)
    .then(res =>{
        openNotification(res.data['Message'])
    })
}

  const  token = props.token
  let data = props.data
  let indexNumber = 1
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">Name</TableCell>
            
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Deleivered</TableCell>
            <TableCell align="left">Order Created</TableCell>
            <TableCell align="left">Open</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{indexNumber++}</TableCell>
              <TableCell align="left">{row.Client_Name}</TableCell>
              <TableCell align="left">{row.Client_Email}</TableCell>
              <TableCell align="left">{row.Client_Adress}</TableCell>
              <TableCell align="left">{row.Client_Phone}</TableCell>
              <TableCell align="left">
              <>
              {
                row.Delivered?(
                    <p>
                    Success
                    </p>
                ):(
                    <p>
                        Pending
                    </p>
                )
            }
              </>
              </TableCell>
              <TableCell align="left">{row.Order_Created}</TableCell>
              <TableCell align="left">
              <a
                    class="open-button_view" 
                href={`/logistics_order/${row.id}`}>
                
                <FontAwesomeIcon icon={faBoxOpen} /> Open
               
                </a>
              </TableCell>



            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


