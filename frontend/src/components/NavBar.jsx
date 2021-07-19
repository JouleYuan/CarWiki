import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchBar from './SearchBar';
import logo from '../assets/images/logo-white.png';
import github from '../assets/images/GitHubIcon.png';
import { Link } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import Button from '@material-ui/core/Button';
import TagList from '../components/TagList';
import SwipeableTemporaryDrawer from '../components/SwipeableTemporaryDrawer'
import Findnew from '../components/Findnew';
import ChipsArray from './ChipsArray';
const style = theme => ({
  navBar: {
    backgroundColor: '#2b263a',
    // boxShadow: '0 0 0 0',
    color: '#2D2D2D',
    // paddingTop: '20px'
  },
  toolBar: {
    padding: '0 25px',
    [theme.breakpoints.down("xs")]: {
      padding: "0 2vw"
    }
  },
  navLinks: {
    marginLeft: 'auto',
    marginRight: '30px'
  },
  navSea: {
    marginLeft: 'auto',
    marginRight: '30px',
    width:'30rem'
  },
  linkItem: {
    margin: '0 10px'
  },
  searchBar: {
    padding: '0 50px'
  },
  logo: {
    width: '13rem',
    margin: '5px 45px 5px 15px'
  },
  github: {
    width: '35px'
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" className={classes.navBar}>
        <Toolbar className={classes.toolBar}>
          <Link to='/'>
            <img src={logo} className={classes.logo}/>
          </Link>
          <SearchBar />
          <div className={classes.navSea}>
          <ChipsArray style={{ marginRight:'30px'}}/>
          </div>
          <div className={classes.navLinks}>
            <Tooltip title="二手车咨询" aria-label="query">
             <IconButton aria-label="query" href='https://www.guazi.com/bj/' target='_blank' style={{ color: "white" }}>
                <LocalAtmIcon/>
              </IconButton>
            </Tooltip>
            <Tooltip title="重磅新车" aria-label="hotnewcar">
             <IconButton aria-label="hotnewcar"  style={{ color: "white" }}>
                <Findnew/>
              </IconButton>
            </Tooltip>
            <Tooltip title="热门车型" aria-label="hotsearch">
             <IconButton aria-label="hotsearch"  style={{ color: "white" }}>
               {/*  <WhatshotIcon/> */}<SwipeableTemporaryDrawer/>
              </IconButton>
            </Tooltip>
           
          </div>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(style)(NavBar);