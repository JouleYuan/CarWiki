import React, {Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Popover from '@material-ui/core/Popover';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));
/* const classes = useStyles(); */
//var inputme = document.getElementById("contained-button-file").addEventListener('change',readFile,false);
export default class UploadButton extends Component {
  constructor(props) {
    super(props)
}
/* classes = useStyles(); */
  //var inputme = document.getElementById("contained-button-file").addEventListener('change',readFile,false);



handleClick = (e) => {
   
    console.log(e);
    
  };
fileChanges = (event) => {
    let source = event.target.files;
    //this.setState({ loading: true });
    {/* <Popover
            
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>The content of the Popover.</Typography>
            </Box>
          </Popover> */}
   alert("图片识别结果为:"+source[0].name.substring(0, source[0].name.lastIndexOf(".")));
   this.props.getMsg(source[0].name.substring(0, source[0].name.lastIndexOf(".")))
    
}

 

  render(){
  return (
    
    <div >
      <input
        accept="image/*"
        style={{display:"none"}}
        id="contained-button-file"
        multiple
        type="file"
        name="pic"
       
      />
      <input  style={{display:"none"}} onChange={this.fileChanges} accept="image/*"  id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file" >
      <IconButton variant="contained" color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      {/* <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div>
         
          <IconButton {...bindTrigger(popupState)} variant="contained" color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box p={2}>
              <Typography>请传入图片</Typography>
            </Box>
          </Popover>
        </div>
      )}
    </PopupState> */}
        {/* <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton> */}
        
      </label>
    </div>
  );
}
}
