import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import axios from "axios";
import { connect } from "react-redux"; 
import {InputNumber  ,notification } from 'antd';


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




export default function UsersSimpleTable(props) {
    console.log('The Users', props.data) 
  const classes = useStyles();
  const  token = props.token
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="left">UserName</TableCell>
            
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Bank Account</TableCell>
            <TableCell align="left">Verifed</TableCell>

            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
              <TableCell align="left">{row.user}</TableCell>
              <TableCell align="left">{row.User_First_Name}</TableCell>
              <TableCell align="left"> {row.User_LastName} </TableCell>
              <TableCell align="left"> {row.User_LastName} </TableCell>
                <TableCell align="left">
                     {
                      row.Verified ? (
                        <>
                          <p>
                          Verifed
                          </p>
                        </>
                        ):
                        (
                          <>
                          <p>
                          Pending
                          </p>
                          </>
                        )
                      
                     }
                </TableCell>
                <TableCell align="left"> 
                <a href={`/review-vendor/${row.id}`} >
                  View
                </a>
                 </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


