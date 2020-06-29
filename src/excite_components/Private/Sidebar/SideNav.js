import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import clsx from 'clsx';
import {MenuItem, MenuList} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { faHamburger } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});



export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
   <div className="menu-container">
      <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >

       
          <MenuList>
              <div  className = "menu-link">
              <MenuItem 
            className="menu-link-text"
            component={Link} to="/dashboard/" >
            Dashboard
            </MenuItem>
              </div>

              <div  className = "menu-link">
          <MenuItem 
          className="menu-link-text"
          component={Link} to="/profile/" >
            Profile
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem 
            className="menu-link-text"
            component={Link} to="/analysis/" >
            Analysis
            </MenuItem>
          </div>

          <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/user_uploads/" >
              Products 
            </MenuItem>
          </div>

          <div  className = "menu-link">
            <MenuItem component={Link} to="/book_keeping/">
            Book Keeping
            </MenuItem>
            </div>
            
            
            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/inventories/">
            Inventories
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/contacts/">
            Email Marketing
            </MenuItem>
            </div>

            <div  className = "menu-link">
            <MenuItem
            className="menu-link-text"
             component={Link} to="/showcase/">
           Home
            </MenuItem>
            </div>

          </MenuList>
         
    </div>
   </div>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <button className="sidebar_button" onClick={toggleDrawer(anchor, true)}>
                
            <FontAwesomeIcon icon={faHamburger} />
          </button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
