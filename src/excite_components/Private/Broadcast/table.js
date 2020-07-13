import React from 'react';
import { connect } from "react-redux"; 
import axios from "axios";
import { notification } from 'antd';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { faTrash, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const openNotification = (msg) => {
    notification.open({
      message: 'Notification Title',
      description:msg,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }


const delete_contact = async (token,id) =>{
  axios.defaults.headers = {
    "Content-Type": "application/json",
    Authorization: `Token ${token}`
  };
    await axios.get(`https://backend-entr.herokuapp.com/management/delete_contact/${id}/`)
    .then(res =>{
      openNotification(res.data['Message'])
    })

}


function SimpleTable(props) {
  const classes = useStyles();
  const token = props.token
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell >S/N</TableCell>
          <TableCell align="right">Name</TableCell>
            
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
            <TableCell >{row.id}</TableCell>
              <TableCell align="right">{row.ClientName}</TableCell>
              <TableCell align="right">{row.ClientEmail}</TableCell>
              <TableCell align="right">{row.ClientPhone}</TableCell>
                <TableCell align="right">
                <p 
                onClick={()=>{delete_contact(token,row.id)}}>
                    <FontAwesomeIcon icon={faTrash} />
                </p>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


const mapStateToProps = state => {
  return {
    token: state.auth.token ,  

  };
};

export default connect(
  mapStateToProps,
  null
)(SimpleTable);