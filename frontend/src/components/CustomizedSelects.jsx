import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DateRange } from '@material-ui/icons';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
// import Checkbox from '@material-ui/core/Checkbox';
// import Typography from '@material-ui/core/Typography';
var date = new Date().getTime();
let selectedTime1='时间不限';
const style = {
  formControl: {
    minWidth: 200,
    width: '40%',
    margin: '15px 0',
    // flexDirection: 'row',
    // alignItems: 'center'
  },
  sider: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    margin: '10px 0'
  }
}

class CustomizedSelects extends Component {
  state = {
    selectedTime: '时间不限',
    // selectedSources: []
  }

  handleTimeChange = (e) => {
    this.props.changenews_author(e.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sider}>
        <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-with-icon-adornment">搜索作者</InputLabel>
        <Input
          onChange={this.handleTimeChange}
          id="input-with-icon-adornment"
          style={{width:"200px"}}
          startAdornment={
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          }
        />
      </FormControl>
      
      </div>
    )
  }
}

export default withStyles(style)(CustomizedSelects);