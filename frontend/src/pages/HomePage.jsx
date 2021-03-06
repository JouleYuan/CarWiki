import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FindInPage} from '@material-ui/icons';
import SearchBar from '../components/SearchBar';
import logo from '../assets/images/logo-white.png';
import CanvasBack from "../components/CanvasBack/index";
import ButtonBases from '../components/ButtonBases';


const style = theme => ({
  root: {
    height: '100%'
  },
  wrapper: {
    width: '100%',
    height: '100%',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    position: 'fixed'
  },
  title: {
    margin: '15px',
    color: '#ffffff'
  },
  liulan: {
    margin: '10px',
    width: '40%',
    height: '10%',
  },
  search: {
    margin: '0px',
  },
  // iconButton: {
  //   padding: 10,
  // },
  // searchBar: {
    
  // },
  // input: {
  //   paddingLeft: '15px'
  // },
  navLinks: {
    marginLeft: 'auto',
    marginRight: '0'
  },
  linkItem: {
    margin: '0 10px'
  },
  navBar: {
    backgroundColor: 'transparent',
    color: "#ffffff",
    boxShadow: '0 0 0 0',
    padding: '20px 30px'
  },
  content: {
    height: '90%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: '20px'
  },
  loveIcon: {
    fontSize: '1rem',
    padding: '2px 5px'
  }
});

class HomePage extends React.Component {
  state = {
    input: "",
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
         <div className="canvasBox">
                <CanvasBack row={12} col={8} />
            </div>
        <div className={classes.wrapper}>
          <AppBar position="absolute" className={classes.navBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                <FindInPage />
              </IconButton>
              <Typography variant="subtitle1" >
                Wiki?????????????????????
                
              </Typography>
              {/* <div className={classes.navLinks}>
                <Button color="inherit" className={classes.linkItem}> 
                  ???????????? 
                </Button>
                <Button color="inherit" className={classes.linkItem}> 
                  ???????????? 
                </Button>
                <Button color="inherit" className={classes.linkItem}> 
                  ???????????? 
                </Button>
              </div> */}
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            <div className={classes.title}>
              <img src={logo}  style={{width: 750}}/>
            </div>
            <div className={classes.search}>
            <SearchBar/>
            </div>
            <div className={classes.liulan}>
            <ButtonBases/></div>
          </div>
          
          <footer className={classes.footer}> 
            <Typography variant="body2" component="p">
             
              &copy;2021 Created By G09
            </Typography>
          </footer>
        </div>
     </div>
    );
  }
}

export default withStyles(style)(HomePage);