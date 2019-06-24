import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import logo from "./logo.png";
import {makeStyles, Typography as T} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    backgroundColor: 'black',
  },
  logo :{
    maxHeight: '40px',
  }
}));

const HeaderBar = (props) => {
  const { history } = props
  const classes=useStyles();

  function onClickHome() {
    history.push(`/`)
  }

  return <div className={classes.root}>
    <AppBar position="static" >
      <Toolbar className={classes.toolbar}>
        <div onClick={onClickHome}>
          <img className={classes.logo} src={logo} alt="Logo" />
        </div>
        <T className={classes.title}/>
        <Button color="inherit" onClick={onClickHome}>Logout</Button>
      </Toolbar>
    </AppBar>
  </div>
};

export default HeaderBar