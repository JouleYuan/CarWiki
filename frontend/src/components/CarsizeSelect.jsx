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
let selectedTime1='全部';
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


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const options = {
  time: ['全部', 'SUV', '中型车', '中型SUV','紧凑型车','中大型车','小型SUV','紧凑型SUV','跑车','微型车','小型车','中大型SUV','大型SUV','紧凑型MPV','微面','皮卡'],
}

class CarsizeSelect extends Component {
  state = {
    selectedTime: 'all',
    // selectedSources: []
  }

  handleTimeChange = (e) => {
    selectedTime1 = e.target.value;
    this.props.changecar_size(e.target.value);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.sider}>
        {/* <Typography variant="subtitle1" component="h2" className={classes.title}>
          条件筛选
        </Typography> */}
        <FormControl className={classes.formControl}>
          <FormLabel component="legend" className={classes.label}> 
            <DateRange /> 车型大小
          </FormLabel>
          <Select
            value={selectedTime1}
            onChange={this.handleTimeChange}
            input={<Input id="select-multiple" />}
            MenuProps={MenuProps}
          >
            {options.time.map(time => (
              <MenuItem key={time} value={time}>
                {time}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      
      </div>
    )
  }
}

export default withStyles(style)(CarsizeSelect);