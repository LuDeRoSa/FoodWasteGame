import React from 'react';
import { Link } from 'react-router-dom';

import linksList from '../LinksList';

import { makeStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

function SideMenu({ handleClick, isLoggedIn }) {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (bool) => {
    setIsOpen(bool);
  };

  const list = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={() => toggleDrawer(false)}
    >
      {isLoggedIn ? (
        <>
          {linksList.map((link) => (
            <ListItem key={link.text} button component={Link} to={link.path}>
              <ListItemIcon>{link.icon}</ListItemIcon>
              <ListItemText>{link.text}</ListItemText>
            </ListItem>
          ))}
          <Divider />
          <List>
            <ListItem button onClick={handleClick} component={Link} to={'/#'}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText>Log out</ListItemText>
            </ListItem>
          </List>
        </>
      ) : (
        <List>
          <ListItem button component={Link} to={'/login'}>
            <ListItemText>Log in</ListItemText>
          </ListItem>
          <ListItem button component={Link} to={'/signup'}>
            <ListItemText>Sign up</ListItemText>
          </ListItem>
        </List>
      )}
    </div>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton color="secondary" onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor={'right'}
          open={isOpen}
          onClose={() => toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default SideMenu;
